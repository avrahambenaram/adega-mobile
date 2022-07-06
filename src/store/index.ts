import { createStore, combineReducers } from 'redux';

import productReducer from './reducers/product';
import entranceReducer from './reducers/entrance';
import saleReducer from './reducers/sale';
import gainReducer from './reducers/gain';
import awaitingSaleReducer from './reducers/awaitingSale';
import pixReducer from './reducers/pix';

const reducers = combineReducers({
    product: productReducer,
    entrance: entranceReducer,
    sale: saleReducer,
    gain: gainReducer,
    awaitingSale: awaitingSaleReducer,
    pix: pixReducer
})

const store = createStore(reducers);

export default store;