import { Github, Globe, InfoIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ThemeCustomizer } from './theme/theme-customizer';

export default function InfoDialog({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger
        aria-label='Open dialog'
        className={cn(
          'flex items-center gap-1 place-self-end text-xs text-muted-foreground',
          className
        )}
      >
        <InfoIcon className='size-4 sm:size-3' />
        <span className='hidden sm:flex'>Jackson&apos;s AI</span>
      </DialogTrigger>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Jackson&apos;s AI</DialogTitle>
          <DialogDescription>Welcome to my AI portfolio!</DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Links</h3>
            <div className='grid grid-cols-2 gap-2'>
              <Link
                href='https://github.com/JackJUson'
                className='flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
                target='_blank'
              >
                <Github className='size-4' />
                GitHub Profile
              </Link>
              <Link
                href='https://jacksonwjung.com'
                className='flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
                target='_blank'
              >
                <Globe className='size-4' />
                Portfolio
              </Link>
            </div>
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>Privacy</h3>
            <p className='text-sm text-muted-foreground'>
              Your conversations are not stored or saved. Each chat session is private and
              temporary.
            </p>
          </div>
          <div className='space-y-2'>
            <h3 className='text-lg font-semibold'>How Jackson&apos;s AI Works</h3>
            <p className='text-sm text-muted-foreground'>
              I trained an AI model with information about my career, skills, and experiences. It
              answers questions as if it were me, but please don&apos;t trust everything it says
              completely.
            </p>
          </div>
          <ThemeCustomizer />
        </div>
      </DialogContent>
    </Dialog>
  );
}
