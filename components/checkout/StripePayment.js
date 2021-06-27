import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  makeStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formGroup: {
    height: '100%',
    marginTop: theme.spacing(5),
  },
  btn: {
    marginTop: theme.spacing(5),
  },
}));

const CheckoutForm = ({ handleNext }) => {
  const { purchaser } = useSelector((state) => state.orders);
  const { cartTotal, cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const classes = useStyles();

  let cartItemsInArrayFormat = [];
  for (let key in cartItems) {
    cartItemsInArrayFormat.push(cartItems[key]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    try {
      // stripe payment
      const { stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setLoading(false);
        setError(stripeError);
        return;
      } else {
        const { id } = paymentMethod;

        await fetch('/api/charge', {
          method: 'POST',
          body: JSON.stringify({
            purchaser,
            cartItems: cartItemsInArrayFormat,
            id,
            amount: (cartTotal * 100).toFixed(0),
          }), //cents
          headers: { 'Content-Type': 'application/json' },
        });
        setLoading(false);
        handleNext();
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <Container maxWidth='sm'>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth className={classes.formGroup}>
          <CardElement style={{ backgroundColor: 'lightblue' }} />
          <Typography variant='body2' align='center' color='error'>
            For test purposes please fill 4242 4242 all the way !
          </Typography>
          <Typography>{error}</Typography>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress size={30} color='secondary' />
            </div>
          ) : (
            <Button
              type='submit'
              variant='contained'
              disabled={!stripe}
              color='secondary'
              fullWidth
              className={classes.btn}
            >
              Pay
            </Button>
          )}
        </FormControl>
      </form>
    </Container>
  );
};
const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

const StripeTest = ({ handleNext }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm handleNext={handleNext} />
    </Elements>
  );
};

export default StripeTest;
