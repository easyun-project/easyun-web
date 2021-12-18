import { AwsInfo } from "@/constant/apiConst";
import { Result, User } from "@/constant/result";
import axios from "redaxios";
import { getHost } from "@/utils/api";

export default class userService {
  static async getUserInfo(): Promise<Result<User>> {
    let url = getHost() + AwsInfo;
    const result = await axios.get(url);
    return result.data;
  }
}
