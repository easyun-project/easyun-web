
import { AwsInfo } from '@/constant/apiConst';
import { Result, AwsInfoModel } from '@/constant/result';
import axios from 'redaxios';
import { getHost } from '@/utils/api';
import { UserModel } from '@/constant/user';

export default class userService {
    static async getAwsInfo(): Promise<Result<AwsInfoModel>> {
        const url = getHost() + AwsInfo;
        const result = await axios.get(url);
        return result.data;
    }
}
