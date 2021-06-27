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
  var lists = [
    {
      id: 1,
      items: [
        {
          name: 'Random Name #1',
          description: 'Shopping Cart',
          src: '/shopping.jpg',
        },
        {
          name: 'Random Name #2',
          description: 'Open Shop',
          src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        },
        {
          name: 'Random Name #3',
          description: 'Women Shopping',
          src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        },
      ],
    },
    {
      id: '2',
      items: [
        {
          name: 'Random Name #4',
          description: 'Mens Fashion',
          src: 'https://images.unsplash.com/photo-1543322748-33df6d3db806?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
        },
        {
          name: 'Random Name #5',
          description: 'Electronic Devices',
          src: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=622&q=80',
        },
        {
          name: 'Random Name #6',
          description: 'Jewelry',
          src: 'https://images.unsplash.com/photo-1584377334016-464803e03b80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        },
      ],
    },
  ];

  return (
    <Container maxWidth='lg' className={styles.container}>
      <Carousel autoPlay timeout={1000} animation='fade' interval={30000}>
        {lists.map((list) => (
          <Grid container spacing={1} key={list.id}>
            {list.items.map((item) => (
              <Grid item xs={4} key={item.name}>
                <Image
                  src={item.src}
                  layout='responsive'
                  width={500}
                  height={300}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Carousel>
    </Container>
  );
}
