import {UserLogin} from '@/constant/apiConst';
import {Result} from '@/constant/result';
import axios from "redaxios";
import {getHost} from "@/utils/api";

export default class userService {
    // xiaomo/xiaomo2019
    static async login<T>(username: string, password: string): Promise<Result<T>> {
        let url = getHost() + UserLogin;
        const result = await axios.post(url, {
            username, password
        });
        return result.data as Result<T>;
    }
}
