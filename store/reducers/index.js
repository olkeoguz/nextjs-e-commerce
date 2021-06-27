import { combineReducers } from 'redux';
import cart from './cart';
import orders from './orders';

// COMBINED REDUCERS
const reducers = {
  cart,
  orders,
};

export default combineReducers(reducers);
