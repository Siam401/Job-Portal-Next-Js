import NextAuth, { NextAuthOptions } from 'next-auth';
import { authOptions } from '@/app/[locale]/(client)/(auth)/utils/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions};
