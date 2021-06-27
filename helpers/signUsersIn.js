import { signIn } from 'next-auth/client';

const createUser = async ({ name, email, password }) => {

  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || 'Something went wrong... Cannot create the user!'
    );
  }
  return data;
};

export const useSignIn = async (isLogin, formData) => {
  const { name, email, password } = formData;
  if (isLogin) {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      throw error;
    }
  } else {
    try {
      await createUser(formData);
      await signIn('credentials', {
        redirect: false,
        name,
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }
};
