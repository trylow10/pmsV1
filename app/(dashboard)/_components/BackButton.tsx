'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function BackButton() {
  const router = useRouter();
  return (
    <Button className="rounded-xl" onClick={() => router.back()}>
      &#x2190;
    </Button>
  );
}

export default BackButton;
