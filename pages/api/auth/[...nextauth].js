import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase('auth');

        const usersCollection = client.db().collection('users');
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('User Not Found!');
        }

        const passwordsMatched = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!passwordsMatched) {
          client.close();
          throw new Error('Invalid Password...');
        }

        client.close();

        //return an object inside authorize => let NextAuth know that authorization succeeded.
        return {
          name: user.name,
          email: user.email, // this will be stored in the session
        };
      },
    }),
    Providers.Google({
      clientId:
        '1005467670009-qbaj8dh2ggffuf9rh1hqhesheblep2hd.apps.googleusercontent.com',
      clientSecret: '5P9S32-qM1s45rthcCQ-CjrL',
    }),
  ],

  database:`mongodb+srv://ozi:${process.env.mongo_db_password}@cluster0.2axyj.mongodb.net/auth?retryWrites=true&w=majority`,

});
