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

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default function ProductItem({ product }) {
  const classes = useStyles();

  const router = useRouter();

  const handleClick = () => {
    router.push(`/${product.id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
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
          <Typography gutterBottom variant='body1' component='h2' noWrap>
            {product.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.btnContainer}>
        <Button size='small' color='primary' onClick={handleClick}>
          View
        </Button>
        <Button size='small' color='primary'>
          To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
