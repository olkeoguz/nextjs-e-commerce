import { SET_PRODUCTS } from '../actions/products';

const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    default: {
      return state;
    }
  }
};

export default productsReducer;

// {
//     id: 1,
//     title: 'Red shirt',
//     price: '30',
//     category: 'Clothes',
//     description: 'A beautiful red shirt',
//     image: '...',
//   },
//   {
//     id: 2,
//     title: 'Casio Watch',
//     price: '150',
//     category: 'Accessories',
//     description: 'A Water Proven Casio Watch',
//     image: '...',
//   },
