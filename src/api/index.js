import axios from "axios";
import { BASE_URI } from "./pathMap";
// import Toast from "./Toast";
import Store from '../redux/store'
import { setLoading } from '../redux/actions/loading'
// 配置请求头
axios.defaults.headers["Content-Type"] = "application/json";
// 响应时间
axios.defaults.timeout = 10000;
axios.defaults.baseURL = BASE_URI;
//请求拦截器
axios.interceptors.request.use(
    (config) => {
        Store.dispatch(setLoading(true))
        // if (user) {
        //   // 设置统一的请求header
        //   config.headers.authorization = user.token; //授权(每次请求把token带给后台)
        // }
        // config.headers.platform = user ? user.platform : 8; //后台需要的参数
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        Store.dispatch(setLoading(false));
        console.log(response.data)
        return response.data;
    },
    (error) => {
        return Promise.resolve(error);
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url, params, options = {}) {
    const header = options.headers;
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params: { ...params } }, {
                ...options,
                headers: {
                    ...header
                }
            })
            .then((response) => {
                resolve(response)
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url, params, options = {}) {
    try {
        const headers = options.headers || {};
        return new Promise((resolve, reject) => {
            axios
                .post(`${url}`, params, {
                    ...options, headers: {
                        ...headers
                    }
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err);
                });
        });
    } catch (error) {
        throw new Error(error)
    }

}


// 对外暴露
export { post, get };



