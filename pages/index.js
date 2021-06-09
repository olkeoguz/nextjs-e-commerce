import { Typography } from '@material-ui/core';
import Head from 'next/head';
import ImageCarousel from '../components/UI/Carousel';
import { makeStyles } from '@material-ui/core';
import ProductList from '../components/products/ProductList';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
    },
  },
}));

export default function Home({ products }) {
  const classes = useStyles();

  return (
    <div>
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
      <ProductList products={products} />
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { category } = query;

  let data;
  if (!category) {
    const res = await fetch('https://fakestoreapi.com/products');
    data = await res.json();
  } else {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    data = await res.json();
  }

  return {
    props: {
      products: data,
    },
  };
};
