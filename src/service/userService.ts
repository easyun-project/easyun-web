import { UserLogin } from '@/constant/apiConst';
// import { fail, Result } from '@/constant/result';
import { UserModel } from '@/constant/user';
import axios from './axiosConfig';


export default class userService {
    // xiaomo/xiaomo2019
    static async login(username: string, password: string): Promise<UserModel> {
        const url = UserLogin;
        const result = await axios.post(url, {
            username, password
        });
        if (result.status == 200) {
            return result.data.detail as UserModel;
        }
        return result.data.message;
    }
}
