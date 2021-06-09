export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');

    if (!res.ok) {
      throw new Error('Cannot fetch the products...');
    }

    const resData = await res.json();

    dispatch({
      type: SET_PRODUCTS,
      products: resData,
    });
  } catch (error) {}
};
