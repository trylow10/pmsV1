'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function BackButton() {
  const router = useRouter();
  return (
    <Button
      className="rounded-xl my-3"
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
    >
      <ArrowLeft size={20} />
    </Button>
  );
}

export default BackButton;
