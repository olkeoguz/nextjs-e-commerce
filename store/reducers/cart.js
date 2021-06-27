import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  CONTINUED_TO_CHECKOUT,
} from '../actions/cart';

const initialState = {
  cartItems: {},
  cartTotal: 0,
  numOfCartItems: 0,
  continuedToCheckout: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price } = action.product;

      //Item is in the cart
      if (state.cartItems[id]) {
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [id]: {
              ...action.product,
              quantity: state.cartItems[id].quantity + 1,
              itemTotal: state.cartItems[id].itemTotal + action.product.price,
            },
          },
          cartTotal: state.cartTotal + price,
          numOfCartItems: state.numOfCartItems + 1,
        };
      } else {
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [id]: {
              ...action.product,
              quantity: +1,
              itemTotal: action.product.price,
            },
          },
          cartTotal: state.cartTotal + price,
          numOfCartItems: state.numOfCartItems + 1,
        };
      }

    case REMOVE_FROM_CART:
      const prodId = action.id;

      if (state.cartItems[prodId].quantity > 1) {
        return {
          ...state,
          cartItems: {
            ...state.cartItems,
            [prodId]: {
              ...state.cartItems[prodId],
              quantity: state.cartItems[prodId].quantity - 1,
              itemTotal:
                state.cartItems[prodId].itemTotal -
                state.cartItems[prodId].price,
            },
          },
          cartTotal: state.cartTotal - state.cartItems[prodId].price,
          numOfCartItems: state.numOfCartItems - 1,
        };
      } else {
        let updatedCartItems = { ...state.cartItems };
        delete updatedCartItems[prodId];
        return {
          ...state,
          cartTotal: state.cartTotal - state.cartItems[prodId].price,
          itemTotal: 0,
          cartItems: updatedCartItems,
          numOfCartItems: state.numOfCartItems - 1,
        };
      }

    case EMPTY_CART: {
      return {
        ...initialState,
      };
    }

    case CONTINUED_TO_CHECKOUT: {
      return {
        ...state,
        continuedToCheckout: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
