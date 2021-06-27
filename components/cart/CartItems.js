import {
  Grid,
  IconButton,
  Paper,
  Typography,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const useStyles = makeStyles((theme) => ({
  priceControl: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function CartItems({ controlCart }) {
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const dispatch = useDispatch();

  let updatedCartItems = [];

  for (let key in cartItems) {
    updatedCartItems.push(cartItems[key]);
  }

  return (
    <div>
      {updatedCartItems.map((item) => (
        <Paper key={item.id} elevation={3} className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Image
                src={item.image}
                objectFit='contain'
                layout='responsive'
                width={500}
                height={300}
                unoptimized={true}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body1' gutterBottom>
                {item.title}
              </Typography>
              <Typography variant='body2' gutterBottom>
               Item Total : $ {item.itemTotal.toFixed(2)}
              </Typography>
              <div className={classes.priceControl}>
                <Typography variant='h5' gutterBottom>
                  x {item.quantity}
                </Typography>

                {controlCart && (
                  <div>
                    <Tooltip title='Add'>
                      <IconButton
                        aria-label='add'
                        onClick={() => {
                          dispatch(cartActions.addToCart(item));
                        }}
                      >
                        <AddIcon color='primary' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Clear'>
                      <IconButton
                        aria-label='clear'
                        onClick={() => {
                          dispatch(cartActions.removeFromCart(item.id));
                        }}
                      >
                        <ClearIcon color='error' />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
}
