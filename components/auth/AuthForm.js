import { useState } from 'react';
import { Formik } from 'formik';
import {
  Button,
  CircularProgress,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { reviewSchema, reviewSchemaForLogin } from '../../helpers/validation';
import { useSignIn } from '../../helpers/signUsersIn';

import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formRoot: {
    maxWidth: 800,
    margin: 'auto',
    backgroundColor: '#f4f4f4',
    padding: theme.spacing(1),
  },
  formContainer: {
    textAlign: 'center',
  },
  input: {
    margin: theme.spacing(1, 0),
  },
  authError: {
    color: 'red',
  },
  choice: {
    margin: theme.spacing(1, 0),
    fontSize: theme.spacing(2),
  },
}));

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState();
  const { continuedToCheckout } = useSelector((state) => state.cart);

  const classes = useStyles();

  const router = useRouter();

  const submitFormHandler = async (formData) => {
    try {
      setLoading(true);
      await useSignIn(isLogin, formData);

      if (continuedToCheckout) {
        router.replace('/checkout');
      } else {
        router.replace('/');
      }
    } catch (err) {
      setAuthError(err.message);
      setLoading(false);
    }
  };


  return (
    <Paper elevation={6} className={classes.formRoot}>
      <Container maxWidth='sm'>
        <Typography variant='h4' align='center' gutterBottom>
          {isLogin ? 'Log in' : 'Sign Up'}
        </Typography>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={isLogin ? reviewSchemaForLogin : reviewSchema}
          onSubmit={(values, actions) => {
            submitFormHandler(values);
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
            <div className={classes.formContainer}>
              {!isLogin && (
                <TextField
                  required
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={touched.name && !!errors.name}
                  label='Name'
                  helperText={errors.name}
                  variant='filled'
                  fullWidth
                  read-only
                  className={classes.input}
                />
              )}
              <TextField
                required
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && !!errors.email}
                label='E-mail'
                helperText={errors.email}
                variant='filled'
                fullWidth
                className={classes.input}
              />
              <TextField
                required
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && !!errors.password}
                label='Password'
                helperText={errors.password}
                variant='filled'
                fullWidth
                type='password'
                className={classes.input}
              />
              {!isLogin && (
                <TextField
                  required
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  value={values.passwordConfirm}
                  error={touched.passwordConfirm && !!errors.passwordConfirm}
                  label='Repeat Password'
                  helperText={errors.passwordConfirm}
                  variant='filled'
                  fullWidth
                  type='password'
                  className={classes.input}
                />
              )}
              {authError && (
                <Typography
                  variant='body1'
                  align='center'
                  className={classes.authError}
                >
                  {authError}
                </Typography>
              )}
              {loading ? (
                <CircularProgress size={30} />
              ) : (
                <Button
                  onClick={handleSubmit}
                  color='primary'
                  variant='contained'
                >
                  {isLogin ? 'Log In' : 'Sign Up'}
                </Button>
              )}  
              <Typography variant='body1'>
                {isLogin
                  ? `Don't have an account ?`
                  : 'Already have an account?'}

                <Button
                  onClick={() => {
                    setIsLogin(!isLogin);
                  }}
                  color='primary'
                  variant='text'
                >
                  {isLogin ? 'Sign Up' : 'Log in'}
                </Button>
              </Typography>
            </div>
          )}
        </Formik>
      </Container>
    </Paper>
  );
};

export default AuthForm;
