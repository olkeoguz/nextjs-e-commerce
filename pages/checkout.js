import { Container, Grid, Paper } from '@material-ui/core';
import { getSession } from 'next-auth/client';
import CartItems from '../components/cart/CartItems';
import Purchase from '../components/checkout/Purchase';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import StripePayment from '../components/checkout/StripePayment';
import ContactPhoneOutlinedIcon from '@material-ui/icons/ContactPhoneOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import OrderSuccessful from '../components/checkout/OrderSuccessful';
import { useDispatch } from 'react-redux';
import * as cartActions from '../store/actions/cart';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  title: {
    color: theme.palette.secondary.light,
  },
  stepper: {
    maxWidth: 400,
    flexGrow: 1,
    margin: '0 auto',
  },
}));

const Checkout = ({ session }) => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart);

  const { cartTotal } = cart;

  const dispatch = useDispatch();

  const classes = useStyles();

  const router = useRouter();

  useEffect(() => {
    if (cartTotal === 0) {
      router.replace('/cart');
    }
  }, [cartTotal]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  let component;
  switch (activeStep) {
    case 0:
      component = <Purchase session={session} handleNext={handleNext} />;
      break;
    case 1:
      component = <StripePayment handleNext={handleNext} />;
      break;
    case 2:
      component = <OrderSuccessful />;
  }

  useEffect(() => {
    return () => {
      dispatch(cartActions.emptyCart());
    };
  }, []);

  return (
    <Container className={classes.container}>
      <Typography
        variant='h3'
        gutterBottom
        align='center'
        className={classes.title}
      >
        Total Cost : $ {cartTotal.toFixed(2)}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h5' gutterBottom className={classes.title}>
            Cart Summary
          </Typography>
          <CartItems />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MobileStepper
            variant='progress'
            steps={3}
            position='static'
            activeStep={activeStep}
            className={classes.stepper}
            nextButton={
              <LocalAtmOutlinedIcon color='secondary' fontSize='large' />
            }
            backButton={
              <ContactPhoneOutlinedIcon color='secondary' fontSize='large' />
            }
          />
          {component}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
