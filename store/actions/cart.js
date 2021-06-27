export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const CONTINUED_TO_CHECKOUT = 'CONTINUED_TO_CHECKOUT';

export const addToCart = (product) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART, product });
};

export const removeFromCart = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, id });
};

export const emptyCart = () => {
  return { type: EMPTY_CART };
};

export const continuedToCheckout = () => {
  return { type: CONTINUED_TO_CHECKOUT };
};
