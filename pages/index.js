import { Button, Typography } from '@material-ui/core';
import Head from 'next/head';
import ImageCarousel from '../components/UI/Carousel';
import { makeStyles } from '@material-ui/core';
import ProductList from '../components/products/ProductList';
import { getSession, signin } from 'next-auth/client';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  authBtn: {
    top: '10%',
    left: '40%',
    [theme.breakpoints.down('xs')]: {
      left: '15%',
    },
    position: 'sticky',
    zIndex: 10,
  },
}));

export default function Home({ products, session, error }) {
  const classes = useStyles();

  const googleAuthHandler = async () => {
    await signin('google', {
      callbackUrl: 'http://localhost:3000',
    });
  };

  return (
    <div>
      {!session && (
        <Button
          variant='contained'
          color='secondary'
          onClick={googleAuthHandler}
          className={classes.authBtn}
        >
          Sign In With Google Right Now
        </Button>
      )}
      <Head>
        <title>E-Commerce</title>
        <meta name='description' content='E Commerce Shop for development' />
        <link rel='icon' href='/baseline_store_white_24dp.png' />
      </Head>
      <Typography
        variant='h2'
        gutterBottom
        align='center'
        className={classes.title}
      >
        Welcome To E-Commerce
      </Typography>

      <ImageCarousel />
      {error && <Alert severity='error'>{error}</Alert>}

      {products && <ProductList products={products} />}
    </div>
  );
}

export const getServerSideProps = async ({ req, query }) => {
  const { category } = query;
  const session = await getSession({ req });

  let data;
  try {
    if (!category) {
      const response = await fetch('https://fakestoreapi.com/products');

      data = await response.json();
    } else {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      data = await response.json();
    }
  } catch (error) {
    return {
      props: {
        session,
        error:
          'An API error occured. Cannot load the products for now ! Please try again in a few minutes.',
      },
    };
  }

  return {
    props: {
      products: data,
      session,
    },
  };
};
