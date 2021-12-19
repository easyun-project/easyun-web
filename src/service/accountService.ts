import { AwsInfo } from "@/constant/apiConst";
import {Result, AwsInfoModel} from "@/constant/result";
import axios from "redaxios";
import { getHost } from "@/utils/api";

export default class userService {
  static async getAwsInfo(): Promise<Result<AwsInfoModel>> {
    let url = getHost() + AwsInfo;
    const result = await axios.get(url);
    return result.data;
  }
}
