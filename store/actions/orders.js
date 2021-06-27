export const SET_PURCHASER = 'SET_PURCHASER';

export const setPurchaser = (purchaser) => dispatch => {
  dispatch ({ type: SET_PURCHASER, purchaser });
};
