import {SETCUSTOMERINFOS} from '../constant';
const initState = {};
const customerReducer = (preState = initState, action) => {
  const {type, data} = action;
  if (type === SETCUSTOMERINFOS) {
    return {...data};
  }
  return preState;
};
export default customerReducer;
