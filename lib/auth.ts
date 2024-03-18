import { auth } from '@/auth.config';

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
