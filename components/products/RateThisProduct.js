import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default function RateThisProduct({ rating, value, setValue }) {
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  if (rating) {
    return (
      <Box
        component='fieldset'
        mb={1}
        borderColor='transparent'
        className={classes.box}
      >
        <Rating name='read-only' precision={0.5} value={rating} readOnly />
        <Typography variant='caption'>
          {labels[hover !== -1 ? hover : value]}
        </Typography>
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <Rating
        name='hover-feedback'
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        size='large'
      />

      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
}
