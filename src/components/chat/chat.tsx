'use client';

import { Geo } from '@vercel/edge';
import { generateId } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useActions, useUIState } from '@/hooks/use-ai';
import { UIState } from '@/lib/chat/types';

export function Chat() {
  const [messages, setMessages] = useUIState();
  const { continueConversation } = useActions();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = async (input: string) => {
    const value = input.trim();
    if (!value) return;

    // Add user message to the state
    const newMessages: UIState = [...messages, { id: generateId(), display: value, role: 'user' }];
    setMessages(newMessages);
    setIsLoading(true);

    // Add a placeholder assistant message
    const assistantMessageId = generateId();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        display: 'Thinking...',
        role: 'assistant',
      },
    ]);

    try {
      // Get the assistant's response
      const result = await continueConversation(value, {} as Geo);

      let textContent = '';

      for await (const delta of readStreamableValue(result)) {
        textContent = `${textContent}${delta}`;

        setMessages([
          ...newMessages,
          { id: assistantMessageId, role: 'assistant', display: textContent },
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          id: assistantMessageId,
          role: 'error',
          display:
            (error as Error).message === 'Rate limit exceeded'
              ? 'Rate limit exceeded. Please wait a moment before trying again.'
              : 'Something went wrong. Please try again.',
        },
      ]);
    }

    setIsLoading(false);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage(input);
  };

  return (
    <div className='flex flex-col h-full max-w-4xl mx-auto'>
      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.length === 0 ? (
          <div className='text-center text-muted-foreground py-8'>
            <Bot className='mx-auto h-12 w-12 mb-4 opacity-50' />
            <h3 className='text-lg font-semibold mb-2'>Hi, I&apos;m Jackson!</h3>
            <p className='text-sm'>
              Ask me anything about my background, skills, projects, or experience.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3 p-4 rounded-lg',
                message.role === 'user' ? 'bg-primary/10 ml-12' : 'bg-muted mr-12'
              )}
            >
              <div className='flex-shrink-0'>
                {message.role === 'user' ? (
                  <User className='h-6 w-6 text-primary' />
                ) : (
                  <Bot className='h-6 w-6 text-primary' />
                )}
              </div>
              <div className='flex-1'>
                <p className='text-sm whitespace-pre-wrap'>{message.display}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Form */}
      <div className='border-t p-4'>
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask me anything...'
            disabled={isLoading}
            className='flex-1'
          />
          <Button type='submit' disabled={isLoading || !input.trim()}>
            <Send className='h-4 w-4' />
          </Button>
        </form>
      </div>
    </div>
  );
}
