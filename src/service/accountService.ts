import { AwsInfo } from "@/constant/apiConst";
import {Result, User, UserModel} from "@/constant/result";
import axios from "redaxios";
import { getHost } from "@/utils/api";

export default class userService {
  static async getUserInfo(): Promise<Result<UserModel>> {
    let url = getHost() + AwsInfo;
    const result = await axios.get(url);
    return result.data;
  }
}
