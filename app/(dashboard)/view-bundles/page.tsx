import Link from 'next/link';
import { Button } from '@/components/ui/button';

function page() {
  return (
    <div className="flex flex-col">
      <Button className="self-end">
        <Link href="/create-bundle">Create Bundle</Link>
      </Button>

      <div>view bundle table</div>
    </div>
  );
}

export default page;
