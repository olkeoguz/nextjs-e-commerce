import { SET_PURCHASER } from '../actions/orders';

const initialState = {
  purchaser: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PURCHASER:   
      return {
        ...state,
        purchaser: { ...action.purchaser },
      };
    
    default: {
      return state;
    }
  }
};

export default orderReducer;
