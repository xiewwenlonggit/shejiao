import loading from './loading';
import user from './user';
import customer from './customer';
import {combineReducers} from 'redux';
export default combineReducers({
  loading,
  user,
  customer,
});
