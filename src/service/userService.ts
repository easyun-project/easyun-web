import { UserLogin } from '@/constant/apiConst';
// import { fail, Result } from '@/constant/result';
import axios from './axiosConfig';


export default class userService {
    // xiaomo/xiaomo2019
    static async login<T>(username: string, password: string): Promise<T> {
        const url = UserLogin;
        const result = await axios.post(url, {
            username, password
        });
        if (result.status == 200) {
            return result.data.detail as T;
        }
        return result.data.message;
    }
}
