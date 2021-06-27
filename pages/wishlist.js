import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ProductList from '../components/products/ProductList';

const WishList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const wishListProducts = JSON.parse(localStorage.getItem('storedItems'));
    setProducts(wishListProducts);
  }, []);

  if (products.length === 0) {
    return (
      <Typography variant='h5' align='center'>
        You haven't add any products to your wishlist yet...
      </Typography>
    );
  }

  return <ProductList products={products} wishlist />;
};
export default WishList;
