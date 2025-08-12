import { AI } from '@/lib/chat/actions';
import { Chat } from '@/components/chat/chat';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      <div className='flex-1 flex flex-col'>
        <AI>
          <Chat />
        </AI>
      </div>
    </main>
  );
}
