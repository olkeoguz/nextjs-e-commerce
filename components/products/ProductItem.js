import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { IconButton } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';


import { useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    position: 'relative',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  btn: {
    color: 'black',
  },
});

export default function ProductItem({ product }) {
  const classes = useStyles();
  const router = useRouter();

  const dispatch = useDispatch();

  const reviewProduct = () => {
    router.push(`/${product.id}`);
  };

  const addProductToCart = () => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={reviewProduct}>
        <CardMedia>
          <Image
            src={product.image}
            layout='responsive'
            width={500}
            height={300}
            objectFit='contain'
          />
        </CardMedia>
        <CardContent>
          <Typography variant='body1' component='h2' noWrap>
            {product.title}
          </Typography>
          <Typography variant='subtitle1' align='center'>
            $ {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.btnContainer}>
        <Button
          className={classes.btn}
          size='medium'
          color='primary'
          onClick={reviewProduct}
          endIcon={<ZoomInIcon />}
        >
          View
        </Button>
        <IconButton
          aria-label='add to shopping cart'
          onClick={addProductToCart}
        >
          <AddShoppingCartIcon className={classes.btn} fontSize='small' />
        </IconButton>
      </CardActions>
    </Card>
  );
}
