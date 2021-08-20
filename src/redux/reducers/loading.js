import { SETLOAING } from "../constant";

const initState = false; //初始化状态
export default function loadingReducer(preState = initState, action) {
    // console.log(preState);
    //从action对象中获取：type、data
    const { type, data } = action;
    //根据type决定如何加工数据
    if (type === SETLOAING) return data;
    return preState;
}
