import { getSession } from 'next-auth/client';
import { MongoClient } from 'mongodb';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import OrderItem from '../components/order/OrderItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MyOrders = ({ orders, noPreOrder, noUser }) => {
  if (noPreOrder || noUser) {
    return <Typography align='center'>You have no orders...</Typography>;
  }

  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <div className={classes.root}>
        <Typography variant='h4' align='center' gutterBottom>
          Your Orders
        </Typography>
        {orders.map((order) => (
          <OrderItem order={order} key={order._id} />
        ))}
      </div>
    </Container>
  );
};

export default MyOrders;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      props: {
        noUser: true,
      },
    };
  }

  const client = await MongoClient.connect(
    `mongodb+srv://ozi:${process.env.mongo_db_password}@cluster0.2axyj.mongodb.net/orders?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  );

  const orderCollection = client.db().collection(`${session.user.email}`);

  const data = await orderCollection.find().sort({ date: -1 }).toArray();

  if (!data.length) {
    return {
      props: {
        noPreOrder: true,
      },
    };
  }

  const orders = JSON.parse(JSON.stringify(data));

  return {
    props: {
      orders,
    },
  };
};
