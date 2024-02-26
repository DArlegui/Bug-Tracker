import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { API_URL } from '@/environment';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('inside credentials authorize');
        const res = await axios.post(
          `${API_URL}/log-in`,
          {
            username: credentials?.username,
            password: credentials?.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const { user, jwt } = res.data;
        console.log('user', user);

        if (user) {
          console.log('success');
          return user;
        } else {
          console.log('failure');
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign_in',
    newUser: '/new_user',
  },
};

export default authOptions;
