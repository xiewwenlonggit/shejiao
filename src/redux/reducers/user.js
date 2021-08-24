import {SETUSERINFO} from '../constant';
const initState = {};
const userReducer = (preState = initState, action) => {
  const {type, data} = action;
  if (type === SETUSERINFO) {
    return {...data};
  }
  return preState;
};
export default userReducer;
