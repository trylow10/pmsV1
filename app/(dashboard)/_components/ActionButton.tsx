import { Button } from '@/components/ui/button';

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      className="flex items-center gap-3 w-full"
      variant="ghost"
      size="sm"
    >
      {children}
    </Button>
  );
}

export default ActionButton;
