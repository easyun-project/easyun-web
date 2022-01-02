
import { AwsInfo } from '@/constant/apiConst';
import { Result, AwsInfoModel } from '@/constant/result';
import axios from 'redaxios';
import { getHeader, getHost } from '@/utils/api';
import { UserModel } from '@/constant/user';

export default class userService {
    static async getAwsInfo(token: string): Promise<Result<AwsInfoModel>> {
        const url = getHost() + AwsInfo;
        const header = getHeader(token);
        const result = await axios.get(url, { headers: header });
        return result.data;
    }
}
