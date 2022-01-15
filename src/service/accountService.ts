import { AwsInfo,GetSSHKeys } from '@/constant/apiConst';
import axios from 'redaxios';
import { AwsInfoModel } from '@/constant/awsInfo';
import { Result } from '@/constant/result';
import { getHeader, getHost } from '@/utils/api';
import { KeyInfo } from '@/views/Home/Server/AddServer/SSHkeys';

export default class AccountService {
    static async getAwsInfo(): Promise<Result<AwsInfoModel>> {
        const url = getHost() + AwsInfo;
        const header = getHeader();
        const result = await axios.get(url, { headers: header });
        return result.data;
    }
    static async getSSHKeys(): Promise<KeyInfo[]> {
        const url = getHost() + GetSSHKeys;
        const headers = getHeader();
        const result = await axios.get(url, { headers: headers });
        return result.data.detail;
    }
}
