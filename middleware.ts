import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ token }) {
      const isLoggedIn = !!token;
      if (isLoggedIn) return true;
      return false; // Redirect unauthenticated users to login page
    },
  },
});

export const config = { matcher: ['/', '/inventory'] };
