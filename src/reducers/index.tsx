import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import commonReducer from './common_reducer';
import productReducer from './product_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  product: productReducer,
});

export default rootReducer;
