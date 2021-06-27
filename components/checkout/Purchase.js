import { Box, Button, Paper, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { reviewSchemaForPurchase } from '../../helpers/validation';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as orderActions from '../../store/actions/orders';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1, 0),
  },
  paper: {
    padding: '16px',
  },
}));

const PurchaseForm = ({ session,handleNext }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: session.user.email,
        address: '',
        phone: '',
      }}
      validationSchema={reviewSchemaForPurchase}
      onSubmit={(values, actions) => {
        dispatch(orderActions.setPurchaser(values));
        handleNext();
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        values,
        touched,
      }) => (
        <Paper elevation={2} className={classes.paper}>
          <TextField
            required
            // onChange={handleChange('email')}
            value={session.user.email}
            label='email'
            variant='filled'
            fullWidth
            className={classes.input}
            readOnly
          />
          <TextField
            required
            onChange={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
            error={touched.phone && !!errors.phone}
            label='phone'
            helperText={errors.phone}
            variant='filled'
            fullWidth
            className={classes.input}
          />
          <TextField
            required
            multiline
            rows={2}
            onChange={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
            error={touched.address && !!errors.address}
            label='address'
            helperText={errors.address}
            variant='filled'
            fullWidth
            className={classes.input}
          />
          <Button
            variant='contained'
            color='secondary'
            onClick={handleSubmit}
            fullWidth
          >
            NEXT
          </Button>
        </Paper>
      )}
    </Formik>
  );
};

export default PurchaseForm;
