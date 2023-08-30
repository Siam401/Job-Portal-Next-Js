import { NextAuthOptions } from "next-auth";
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import { AuthApi } from "@/app/api/auth/auth";
import Configs from '@/config/settings.json';

const MINUTE = 60;
const HOUR = 60 * MINUTE;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: Configs.socialAuth.GOOGLE_CLIENT_ID as string,
      clientSecret: Configs.socialAuth.GOOGLE_CLIENT_SECRET as string
    }),
    LinkedInProvider({
      clientId: Configs.socialAuth.LINKEDIN_CLIENT_ID as string,
      clientSecret: Configs.socialAuth.LINKEDIN_CLIENT_SECRET as string
    }),
    FacebookProvider({
      clientId: Configs.socialAuth.FACEBOOK_CLIENT_ID as string,
      clientSecret: Configs.socialAuth.FACEBOOK_CLIENT_SECRET as string
    }),
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'user@example.com',
        },
        password: { label: 'Password', type: 'password' },
        remember_me: { label: 'Remember Me', type: 'checkbox' },
        applicant_id: { label: 'Applicant ID', type: 'number' },
        login_type: { label: 'Login Type', type: 'text' },
      },
      authorize: async (credentials, req) => {
        if (
          credentials?.login_type === 'auto' &&
          Number(credentials?.applicant_id) > 0
        ) {
          const data: any = await AuthApi.login({
            email: 'test1@gmail.com',
            password: '123456',
          });

          if (data && data.token) {
            const user = {
              id: '1',
              name: 'J Smith',
              token: data.token,
              role: 'applicant', // Add the user role here
            };

            return user as any;
          } else {
            console.log('Login failed');
          }

          return null;
        } else {
          const data: any = await AuthApi.login(credentials);

          if (data && data.data.token) {
            const user = data.data;

            return user as any;
          } else {
            console.log('Login failed');
            return null;
          }

        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  session: {
    maxAge: 8 * HOUR, // 8 hours
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update") {
        return { ...token, ...session };
      }
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.token = token.token;
      session.user_type = token.user_type;
      session.user = token.user;
      // console.log(token)
      return session;
    },
    async signIn(data: any) {
      if (data.account.provider != "credentials") {
        const name = data.user.name;
        const names = name.split(' ')
        const requestData = {
          social_id: data.user.id,
          type: data.account.provider,
          email: data.user.email,
          first_name: names[0] ?? name,
          last_name: names[1] ?? null,
          photo_url: data.user.image,
          meta: data.profile
        }

        const response: any = await AuthApi.socialLogin(requestData);

        if (response.success) {
          data.user.token = response.data.token
          data.user.user_type = response.data.user_type
          data.user.user = response.data.user
        }
        // console.log(requestData)
        // console.log(response)
        return true
      }

      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
};