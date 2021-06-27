import { getSession } from 'next-auth/client';
import AuthForm from '../components/auth/AuthForm';

const Auth = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default Auth;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
