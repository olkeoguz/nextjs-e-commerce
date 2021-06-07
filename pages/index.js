import { Typography } from '@material-ui/core';
import Head from 'next/head';
import ImageCarousel from '../components/UI/Carousel';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
    },
  }
}))

export default function Home() {
  const classes= useStyles();
  return (
    <div>
      <Head>
        <title>E-Commerce</title>
        <meta name='description' content='E Commerce Shop for development' />
        <link rel='icon' href='/baseline_store_white_24dp.png' />
      </Head>
      <Typography variant='h2' gutterBottom align="center" className={classes.title}>Welcome To E-Commerce</Typography>
      <ImageCarousel />
      
    </div>
  );
}

export const getServerSideProps =  async () => {

}
