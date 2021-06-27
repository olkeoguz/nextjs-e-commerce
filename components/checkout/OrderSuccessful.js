import { Button, Typography, makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { useRouter } from 'next/dist/client/router';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '75px',
  },
  success: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
}));

const OrderSuccessful = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Container>
      <div className={classes.success}>
        <CheckCircleOutlinedIcon className={classes.icon} color='secondary' />
      </div>
      <Typography variant='h5' align='center' gutterBottom>
        We have successfully received your order...
      </Typography>
      <Button variant='contained' color='secondary' fullWidth onClick={() => {
        router.push('/my-orders');
      }}>
        Click to see your orders
      </Button>
    </Container>
  );
};

export default OrderSuccessful;
