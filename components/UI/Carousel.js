import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Container, Grid } from '@material-ui/core';
import Image from 'next/image';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
}));

export default function ImageCarousel() {
    const styles = useStyles();
  var items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
      src: 'https://source.unsplash.com/WLUHO9A_xik/700x400',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
      src: 'https://source.unsplash.com/4yta6mU66dE/700x400',
    },
  ];

  return (
    <Container maxWidth='lg' className={styles.container}>
      <Carousel autoPlay timeout={1000} animation='fade' interval={30000}>
        {items.map((item) => (
          <Grid container spacing={1} key={item.name}>
            <Grid item md={4} xs={12} sm={6}>
              <Image
                src={item.src}
                layout='responsive'
                width={500}
                height={300}
              />
            </Grid>
            <Grid item md={4} sm={6}>
              <Image
                src={item.src}
                layout='responsive'
                width={500}
                height={300}
              />
            </Grid>
            <Grid item md={4}>
              <Image
                src={item.src}
                layout='responsive'
                width={500}
                height={300}
              />
            </Grid>
          </Grid>
        ))}
      </Carousel>
    </Container>
  );
}

{
  /* <Container maxWidth='sm'>
      <Carousel autoPlay timeout={500} animation='slide'>
        {items.map((item) => (
          <Paper>
            <Image
              src={item.src}
              layout='responsive'
              width={500}
              height={300}
            />
          </Paper>
        ))}
      </Carousel>
    </Container> */
}
