import { AwsInfo } from '@/constant/apiConst';
import axios from 'redaxios';
import { AwsInfoModel } from '@/constant/awsInfo';
import { Result } from '@/constant/result';
import { getHeader, getHost } from '@/utils/api';

export default class userService {
    static async getAwsInfo(token: string): Promise<Result<AwsInfoModel>> {
        const url = getHost() + AwsInfo;
        const header = getHeader(token);
        const result = await axios.get(url, { headers: header });
        return result.data;
    }
}
