import axios from 'axios';
import { message } from 'antd';
import { getHeader, getHostUrl } from '@/utils/api';
import { createBrowserHistory } from 'history';
import { UserLogin } from '@/constant/apiConst';


axios.defaults.timeout = 50000;
const history = createBrowserHistory();
// Create an instance
const request = axios.create({
    baseURL: getHostUrl()
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 如果不是登录，那么需要获取一个token
    if (config.url !== UserLogin) {
        config.headers = getHeader();
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    switch (error.response.status) {
    case 401:
        history.replace('/login');
        history.go(0);
        message.error('Please login');
        break;
    case 400:
        message.error(error.response.data.message);
        break;
    default:
        message.error('Request failed');
        break;
    }
    return Promise.reject(error);
});

export default request;