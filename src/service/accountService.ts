
import { AwsInfo } from '@/constant/apiConst';
import { Result, AwsInfoModel } from '@/constant/result';
import axios from 'redaxios';
import { getHost, getHeader } from '@/utils/api';

export default class userService {
    static async getAwsInfo(): Promise<Result<AwsInfoModel>> {
        const url = getHost() + AwsInfo;
        const result = await axios.get(url, {
            headers: getHeader(),
        });
        return result.data;
    }
}
