import {AwsInfo} from "@/constant/apiConst";
import {Result} from "@/constant/result";
import axios from "redaxios";
import {getHost} from "@/utils/api";
import {UserModel} from "@/constant/user";

export default class userService {
    static async getUserInfo(): Promise<Result<UserModel>> {
        let url = getHost() + AwsInfo;
        const result = await axios.get(url);
        return result.data;
    }
}
