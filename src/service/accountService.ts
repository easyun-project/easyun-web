import { AwsInfo } from '@/constant/apiConst';
import axios from 'redaxios';
import { getHost } from '@/utils/api';
import { AwsInfoModel } from '@/constant/awsInfo';
import { Result } from '@/constant/result';

export default class userService {
    static async getAwsInfo(): Promise<Result<AwsInfoModel>> {
        const url = getHost() + AwsInfo;
        const result = await axios.get(url);
        return result.data;
    }
}
