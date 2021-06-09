import { combineReducers } from 'redux'
import products from "./products";


// COMBINED REDUCERS
const reducers = {
    products
}

export default combineReducers(reducers)