import * as yup from 'yup';

export const reviewSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup
    .string()
    .required('This field is required.')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords need to be the same'),
    }),
});


export const reviewSchemaForLogin = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const reviewSchemaForPurchase = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
  address: yup.string().required('Address is required'),
});

