import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { formatDistance } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  orderItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
     flexDirection: 'column',
    },
  },
  totalAmount: {
    color: theme.palette.secondary.main,
    marginLeft: 'auto',
  },
  imageContainer: {
    width: '100%',
  },
  details: {
    width: '100%',
  },
}));

const OrderItem = ({ order }) => {
  const classes = useStyles();

  const router = useRouter();

  return (
    <Accordion key={order._id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className={classes.heading}>
          {formatDistance(new Date(order.date), new Date(Date.now()), {
            addSuffix: true,
          })}
        </Typography>
        <Typography className={classes.totalAmount}>
          {' '}
          Total Amount : $ {order.amount / 100}
        </Typography>
      </AccordionSummary>
      {order.items.map((item) => (
        <AccordionDetails
          key={item.id}
          className={classes.orderItems}
          onClick={() => {
            router.push(`/${item.id}`);
          }}
        >
          <div className={classes.imageContainer}>
            <Image src={item.image} width={100} height={100} object='cover' unoptimized={true} />
          </div>
          <div className={classes.details}>
            <Typography variant='h6'>
              {item.title}
            </Typography>
            <Typography>Item Total :  $ {item.itemTotal.toFixed(2)}</Typography>
            <Typography variant='caption' gutterBottom>
              Quantity : {item.quantity}
            </Typography>
          </div>
        </AccordionDetails>
      ))}
    </Accordion>
  );
};

export default OrderItem;
