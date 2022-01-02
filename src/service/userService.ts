import { UserLogin } from '@/constant/apiConst';
import { fail, Result } from '@/constant/result';
import axios from 'redaxios';
import { getHost } from '@/utils/api';

export default class userService {
    // xiaomo/xiaomo2019
    static async login<T>(username: string, password: string): Promise<T | undefined> {
        const url = getHost() + UserLogin;
        const result = await axios.post(url, {
            username, password
        });

        if (result.status == 200) {
            return result.data.detail as T;
        }
        return fail();
    }
}
