import { motion } from 'motion/react';
import { Question } from '@/lib/questions/types';
import { ExampleQuestions } from './example-questions';
import Lightning from './ui/lightning';
import { IconJacksonsAI } from './ui/icons';

type EmptyConversationProps = {
  questions: Question[];
  addMessage: (input: string) => Promise<void>;
};

export function EmptyConversation({ questions, addMessage }: EmptyConversationProps) {
  return (
    <motion.div
      className='flex h-full flex-col items-center justify-center gap-1 px-2'
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.3 }}
    >
      {/* Group icon + text under one lightning-hover parent */}
      <div className='lightning-hover flex flex-col items-center gap-1 cursor-pointer'>
        <IconJacksonsAI className='size-12 lightning-icon' />
        <Lightning text="Jackson's AI" />
      </div>
      <ExampleQuestions questions={questions} addMessage={addMessage} />
    </motion.div>
  );
}
