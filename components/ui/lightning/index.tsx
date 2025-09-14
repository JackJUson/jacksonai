import './style.css';

export default function Lightning({ text }: { text: string }) {
  return (
    <div className='lightning fluid font-display font-semibold'>
      {/* Main text with shadow effect */}
      <p className='lightning-text-shadow'>{text}</p>

      {/* Main text with hover effect */}
      <p className='lightning-text'>{text}</p>
    </div>
  );
}
