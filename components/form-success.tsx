import { toast } from 'sonner';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return toast.error(message);
};
