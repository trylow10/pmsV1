import NextAuth, { getServerSession, type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';

import otherConfig from '@/auth';
import { getUserById } from '@/data/user';

import { db } from '@/lib/db';

export const config = {
  pages: {
    signIn: '/login',
    error: '/error',
  },
  adapter: PrismaAdapter(db) as any,
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  session: { strategy: 'jwt' },
  ...otherConfig,
} satisfies NextAuthOptions;

export default NextAuth(config);

// get in server context
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
