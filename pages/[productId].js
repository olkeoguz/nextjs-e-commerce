import {
  Button,
  Container,
  Grid,
  GridListTileBar,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import RateThisProduct from '../components/products/RateThisProduct';

import { useDispatch } from 'react-redux';
import * as cartActions from '../store/actions/cart';
import ProductComments from '../components/products/ProductComments';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';

const useStyles = makeStyles((theme) => {
  return {
    icon: {
      color: 'red',
    },
    bar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    imageContainer: {
      position: 'relative',
    },
    btn: {
      backgroundColor: 'black',
      color: 'white',
      margin: theme.spacing(1),
      '&:hover': {
        backgroundColor: '#f4f4f4',
        color: 'black',
      },
    },
    ratePrice: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
      },
      margin: theme.spacing(4, 0),
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  };
});

const ProductDetail = ({ product, session }) => {
  const [showComments, setShowComments] = useState(false);
  const [isOnWishList, setIsOnWishList] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('storedItems'));
    if (storedItems && storedItems.some((item) => item.id === product.id)) {
      setIsOnWishList(true);
    }
  }, []);

  const toggleWishlist = () => {
    const storedItems = JSON.parse(localStorage.getItem('storedItems'));
    let updatedStoredItems = [...storedItems];
    if (isOnWishList) {
      updatedStoredItems = storedItems.filter((item) => item.id !== product.id);
      localStorage.setItem('storedItems', JSON.stringify(updatedStoredItems));
      setIsOnWishList(false);
    } else {
      updatedStoredItems = updatedStoredItems.concat(product);
      localStorage.setItem('storedItems', JSON.stringify(updatedStoredItems));
      setIsOnWishList(true);
    }
  };

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.imageContainer}>
            <Image
              src={product.image}
              width={550}
              height={721}
              objectFit='contain'
              unoptimized={true}
            />
            <GridListTileBar
              title={product.title}
              subtitle={<span>{product.category}</span>}
              className={classes.bar}
              actionIcon={
                <IconButton
                  aria-label={`info about product`}
                  className={classes.icon}
                  onClick={toggleWishlist}
                >
                  {isOnWishList ? (
                    <FavoriteIcon fontSize='large' />
                  ) : (
                    <FavoriteBorderIcon fontSize='large' />
                  )}
                </IconButton>
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={8} className={classes.details}>
          <Typography variant='h5' align='right' gutterBottom>
            {product.category.toUpperCase()}
          </Typography>
          <Typography variant='h4' align='center' gutterBottom>
            {product.title}
          </Typography>
          <Typography variant='subtitle1'>{product.description}</Typography>
          <div className={classes.ratePrice}>
            <RateThisProduct rating={5} />
            <Typography variant='h3' align='right'>
              ${product.price}
            </Typography>
          </div>
          <div className={classes.btnContainer}>
            <Button
              variant='outlined'
              className={classes.btn}
              onClick={() => dispatch(cartActions.addToCart(product))}
            >
              Add To Cart
            </Button>
            <Button
              variant='outlined'
              className={classes.btn}
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              {showComments ? 'Hide Comments' : '  See the Comments'}
            </Button>
          </div>
        </Grid>
      </Grid>
      {showComments && (
        <ProductComments prodId={product.id} session={session} />
      )}
    </Container>
  );
};

export default ProductDetail;

export const getServerSideProps = async ({ params, req }) => {
  const { productId } = params;

  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);

  const data = await res.json();

  const session = await getSession({ req });

  return {
    props: {
      product: data,
      session,
    },
  };
};
