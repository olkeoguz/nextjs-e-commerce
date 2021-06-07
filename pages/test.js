import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Container, Grid } from '@material-ui/core';
import Image from 'next/image';

export default function Example(props) {
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
    <Container maxWidth='md'>
      <Carousel autoPlay timeout={500} animation='fade'>
        {items.map((item) => (
          <Grid container spacing={1} key={item.name}>
            <Grid item md={6} xs={12}>
              <Image
                src={item.src}
                layout='responsive'
                width={500}
                height={300}
              />
            </Grid>
            <Grid item md={6}>
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



/* <ThemeProvider theme={theme}>
<CssBaseline />
<Layout>
  <Component {...pageProps} />
</Layout>
</ThemeProvider> */