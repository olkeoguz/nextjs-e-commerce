import CartItems from '../components/cart/CartItems';

import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../store/actions/cart';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core';
import Link from 'next/link';
import { Box } from '@material-ui/core';
import router from 'next/router';

const useStyles = makeStyles((theme) => ({
  startShopping: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  cartTotal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  btnContainer: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  btn: {
    margin: theme.spacing(1),
  },
}));

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { cartTotal, numOfCartItems } = cart;

  const classes = useStyles();

  const { cartItems } = cart;

  const updatedCartItems = [];

  for (let key in cartItems) {
    updatedCartItems.push(cartItems[key]);
  }

  if (!updatedCartItems.length) {
    return (
      <Box>
        <Typography variant='h4' align='center' gutterBottom>
          Your Cart Is Empty
        </Typography>
        <Link href={'/'}>
          <div className={classes.startShopping}>
            <Typography
              variant='h5'
              align='center'
              color='primary'
              gutterBottom
            >
              Start Shopping Now
            </Typography>
            <ShoppingCartIcon fontSize='large' color='primary' />
          </div>
        </Link>
      </Box>
    );
  }

  const continueToCheckout = () => {
    dispatch(cartActions.continuedToCheckout());
    router.push('/checkout');
  };

  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item sm={12} md={7}>
          <CartItems controlCart />
        </Grid>
        <Grid item sm={12} md={5} className={classes.cartTotal}>
          <Typography
            variant='h3'
            align='center'
            gutterBottom
            color='secondary'
          >
            {numOfCartItems} Items In Cart
          </Typography>
          <Typography variant='h4' align='center' gutterBottom>
            Your Cart Total
          </Typography>
          <Typography variant='h4' align='center' gutterBottom>
            $ {cartTotal.toFixed(2)}
          </Typography>
          <div className={classes.btnContainer}>
            <Button
              className={classes.btn}
              variant='contained'
              fullWidth
              color='secondary'
              onClick={continueToCheckout}
            >
              Continue to Checkout
            </Button>
            <Button
              className={classes.btn}
              variant='contained'
              fullWidth
              onClick={() => {
                dispatch(cartActions.emptyCart());
              }}
            >
              Empty yout Cart
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
