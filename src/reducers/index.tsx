import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import commonReducer from './common_reducer';
import productReducer from './product_reducer';
import errorReducer from './error_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  product: productReducer,
  error: errorReducer
});

export default rootReducer;
