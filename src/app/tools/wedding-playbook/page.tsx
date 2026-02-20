import { Metadata } from 'next';
import PlaybookView from '@/components/tools/PlaybookView';

export const metadata: Metadata = {
  title: 'Wedding Playbook — Grin Weddings',
  description: 'Curated collection of 300+ wedding quotes, marriage advice, and planning intelligence.',
};

export default function PlaybookPage() {
  return (
    <div className="min-h-screen bg-base pt-20">
      <PlaybookView />
    </div>
  );
}
