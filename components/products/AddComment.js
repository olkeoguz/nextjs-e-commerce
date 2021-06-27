import {
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useRef, useState } from 'react';
import RateThisProduct from './RateThisProduct';
import { useStyles } from './productCommentStyles';

const AddComment = ({ prodId, fetchComments }) => {
  const [ratingValue, setRatingValue] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const classes = useStyles();

  const commentRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (commentRef.current.value.trim() === '' || ratingValue === 0) {
      setError('Please provide a comment text and a rating !');
      return;
    }
    try {
      setError(null);
      setLoading(true);

      await fetch(`/api/comments/${prodId}`, {
        method: 'POST',
        body: JSON.stringify({
          text: commentRef.current.value,
          rating: ratingValue,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      setLoading(false);
      fetchComments();
      commentRef.current.value = '';
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
    setRatingValue(0);
  };

  return (
    <Container maxWidth='md' className={classes.container}>
      <form onSubmit={handleFormSubmit}>
        {error && <Typography className={classes.error}>{error}</Typography>}
        <TextField
          className={classes.textField}
          id='standard-basic'
          label='Your Comment'
          fullWidth
          multiline
          color='secondary'
          rowsMax={3}
          inputRef={commentRef}
          error={error && true}
        />

        {loading ? (
          <div className={classes.spinner}>
            <CircularProgress
              size={30}
              color='secondary'
              className={classes.spinner}
            />
          </div>
        ) : (
          <div className={classes.btnContainer}>
            <RateThisProduct value={ratingValue} setValue={setRatingValue} />
            <Button type='submit' className={classes.btn}>
              Send
            </Button>
          </div>
        )}
      </form>
    </Container>
  );
};

export default AddComment;
