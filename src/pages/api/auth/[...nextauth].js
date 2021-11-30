import { TramRounded } from '@material-ui/icons';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import FacebookProvider from 'next-auth/providers/facebook';

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    // ...add more providers here
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
  ],
  secret: process.env.JWT_SECRET,

  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  site: process.env.SITE || 'http://localhost:3000',

  database: process.env.MONGODB_URI,
};

export default (req, res) => NextAuth(req, res, options);