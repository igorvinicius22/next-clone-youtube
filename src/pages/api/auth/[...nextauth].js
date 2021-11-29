import { TramRounded } from '@material-ui/icons';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

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
  ],

  session: {
    jwt: true
  },
  jwt: {
    secret: provess.env.JWT_SECRET,
  },

  database: process.env.MONGODB_URI,
};

export default (req, res) => NextAuth(req, res, options);