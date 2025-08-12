import 'server-only';

import { GoogleGenAI } from '@google/genai';
import { Geo } from '@vercel/edge';
import { generateId } from 'ai';
import { createAI, createStreamableValue, getMutableAIState, StreamableValue } from 'ai/rsc';
import { headers } from 'next/headers';
import { systemPrompt } from './prompt';
import { AIActions, AIState, ServerMessage, UIState } from './types';
import { rateLimit } from '../rate-limit';

export async function continueConversation(
  input: string,
  location: Geo
): Promise<StreamableValue<any, any>> {
  'use server';

  // Implement rate limit based on the request's IP
  const header = await headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.2').split(',')[0];

  const { success } = await rateLimit.limit(ip);
  if (!success) {
    throw new Error('Rate limit exceeded');
  }

  const history = getMutableAIState<typeof AI>('messages');

  // Update the AI state with the new user message.
  history.update([...(history.get() as ServerMessage[]), { role: 'user', content: input }]);

  const stream = createStreamableValue();

  try {
    (async () => {
      // Initialize the new Google GenAI client
      const ai = new GoogleGenAI({});

      // Get the messages from history
      const messages = history.get() as ServerMessage[];

      // Create the conversation content
      const contents = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      // Add the system prompt as the first message
      const systemMessage = {
        role: 'user',
        parts: [{ text: systemPrompt(location) }],
      };

      const allContents = [systemMessage, ...contents];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: allContents,
        config: {
          temperature: 0.7,
          thinkingConfig: {
            thinkingBudget: 0, // Disable thinking for faster responses
          },
        },
      });

      // Extract text from the response
      const text =
        response.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I could not generate a response.';

      // Update the AI state with the assistant's response
      history.done([...messages, { role: 'assistant', content: text }]);

      // Stream the response character by character for a typing effect
      for (let i = 0; i < text.length; i++) {
        stream.update(text[i]);
        await new Promise((resolve) => setTimeout(resolve, 10)); // 10ms delay between characters
      }

      stream.done();
    })();

    return stream.value;
  } catch (error) {
    stream.done();
    console.error('Error in continueConversation:', error);
    throw new Error('Failed to send message');
  }
}

// Create the AI provider with the initial states and allowed actions
export const AI = createAI<AIState, UIState, AIActions>({
  initialAIState: { messages: [], id: generateId(), location: {} },
  initialUIState: [],
  actions: {
    continueConversation,
  },
});
