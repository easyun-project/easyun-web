import axios from 'axios';
import { message } from 'antd';
import { getHeader, getHostUrl } from '@/utils/api';
import { UserLogin } from '@/constant/apiConst';


axios.defaults.timeout = 50000;
// Create an instance
const request = axios.create({
    baseURL: getHostUrl()
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 如果不是登录，那么需要获取一个token
    if (config.url !== UserLogin) {
        const headers = getHeader();
        Object.assign(config.headers, headers);
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
        window.location.href = '/login';
        message.error('Please login');
        break;
    case 400:
        if (error.response.data?.status_code !== 2012) {
            message.error(error.response.data.message);
        }
        break;
    case 409:
        // Let caller handle conflict
        break;
    default:
        message.error('Request failed');
        break;
    }
    return Promise.reject(error);
});

export default request;