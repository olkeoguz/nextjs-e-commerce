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

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RateThisProduct from '../components/UI/RateThisProduct';

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
        backgroundColor:'#f4f4f4',
        color:'black'
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
    details:{
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }
  };
});

const ProductDetail = ({ product }) => {
  const classes = useStyles();
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
            />
            <GridListTileBar
              title={product.title}
              subtitle={<span>{product.category}</span>}
              className={classes.bar}
              actionIcon={
                <IconButton
                  aria-label={`info about product`}
                  className={classes.icon}
                >
                  <FavoriteIcon fontSize='large' />
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
            <RateThisProduct />
            <Typography variant='h3' align='right'>
              ${product.price}
            </Typography>
          </div>
          <div className={classes.btnContainer}>
            <Button variant='outlined' className={classes.btn}>
              Add To Cart
            </Button>
            <Button variant='outlined' className={classes.btn}>
              See the Comments
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;

export const getServerSideProps = async ({ params }) => {
  const { productId } = params;

  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);

  const data = await res.json();

  return {
    props: {
      product: data,
    },
  };
};
