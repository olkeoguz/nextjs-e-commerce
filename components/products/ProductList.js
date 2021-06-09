import { Container, Grid, Typography } from '@material-ui/core';
import ProductItem from './ProductItem';
import {useRouter} from 'next/router';

const ProductList = ({ products }) => {

  const router = useRouter();
  let title = "ALL PRODUCTS"
  if(router.query.category) {
    title = `All Products in the category of: ${router.query.category.toUpperCase()}`
  }

  return (
    <Container maxWidth='xl' align='center'>
      <Typography variant='h4' gutterBottom style={{margin:'32px'}}>{title}</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
     </Container>
  );
};

export default ProductList;
