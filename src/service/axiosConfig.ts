// Legacy compatibility shim — service files still import from here
// New code should use @/api-client directly
import axios from 'axios';
import { getHostUrl } from '@/utils/api';
import { getHeader } from '@/utils/api';

const request = axios.create({ baseURL: getHostUrl() });

request.interceptors.request.use((config) => {
    const headers = getHeader();
    if (headers) Object.assign(config.headers, headers);
    return config;
});

export default request;
