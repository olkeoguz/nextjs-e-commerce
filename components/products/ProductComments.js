import {
  Container,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import RateThisProduct from './RateThisProduct';
import { useStyles } from './productCommentStyles';
import AddComment from './AddComment';
import Link from 'next/link';

const ProductComments = ({ prodId, session }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [comments, setComments] = useState([]);

  const divRef = useRef(null);

  const classes = useStyles();

  const fetchComments = useCallback(async () => {
    setError();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/comments/${prodId}`);

      const data = await res.json();

      setComments(data.comments);

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [prodId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  let addComment = (
    <div>
      <Typography variant='h6' align='center'>
        You need to be signed in to make comments !
      </Typography>
      <Typography  variant='body1' align='center'>
        <Link href='/auth'>Sign in Now</Link>
      </Typography>
    </div>
  );

  if (session) {
    addComment = <AddComment prodId={prodId} fetchComments={fetchComments} />;
  }

  if (isLoading) {
    return (
      <Container maxWidth='md' className={classes.container}>
        <div className={classes.spinnerBig} style={{ marginTop: '20px' }}>
          <CircularProgress
            size={40}
            color='secondary'
            className={classes.spinnerBig}
          />
          <div ref={divRef} />
        </div>
      </Container>
    );
  }

  if (!isLoading && comments.length === 0) {
    return (
      <Container maxWidth='md' className={classes.container}>
        <Typography variant='h6' align='center'>
          No Comments for this product yet...
        </Typography>
        <Typography variant='body1' align='center'>
          Be the first to comment and rate this product
        </Typography>
        {addComment}
        <div ref={divRef} />
      </Container>
    );
  }

  return (
    <Container maxWidth='md' className={classes.container}>
      {comments.map((comment) => (
        <div key={comment._id} className={classes.comment}>
          <Typography variant='body2'>{comment.text}</Typography>
          <RateThisProduct rating={comment.rating} />
          <Typography variant='body2' align='right'>
            {comment.user.name}
          </Typography>
          <Divider />
        </div>
      ))}
      {addComment}
      <div ref={divRef} />
    </Container>
  );
};

export default ProductComments;
