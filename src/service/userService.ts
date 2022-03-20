import { UserLogin } from '@/constant/apiConst';
// import { fail, Result } from '@/constant/result';
import axios from 'axios';
import { getHost } from '@/utils/api';

export default class userService {
    // xiaomo/xiaomo2019
    static async login<T>(username: string, password: string): Promise<T> {
        const url = getHost() + UserLogin;
        const result = await axios.post(url, {
            username, password
        });
        return result.data.detail as T;
    }
}
