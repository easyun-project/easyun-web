import axios from 'axios';
import { message } from 'antd';
import { getHeader,getHost } from '@/utils/api';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const request = axios.create({
    baseURL:getHost()
});

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = getHeader();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status === 401){
        history.replace('/login');
        history.go(0);
        message.error('Please login');
        return Promise.reject(error);
    }
    message.error('Request failed');

    return Promise.reject(error);
});

export default request;