import { config } from '@/auth.config';
import NextAuth from 'next-auth/next';

const handler = NextAuth(config);

export { handler as GET, handler as POST };
