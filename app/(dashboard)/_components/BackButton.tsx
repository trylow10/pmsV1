'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function BackButton() {
  const router = useRouter();
  return (
    <Button
      className="rounded-xl my-3"
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
    >
      &#x2190;
    </Button>
  );
}

export default BackButton;
