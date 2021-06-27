import { makeStyles } from '@material-ui/core';

 export const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  btn: {
    marginLeft: 'auto',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: '#f4f4f4',
      color: 'black',
    },
  },
  textField: {
    backgroundColor: '#f4f4f4',
    margin: '20px 0',
  },
  container: {
    marginTop: theme.spacing(6),
  },
  comment: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: 'red',
  },
  spinnerContainer: {
    position: 'relative',
  },
  spinner: {
    marginLeft: '25%',
    left: -20,
  },
  spinnerBig: {
    marginLeft: '30%',
    left: -20,
  },
}));
