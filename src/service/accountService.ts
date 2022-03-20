import { AwsInfo, SSHKeys, FreeTier } from '@/constant/apiConst';
import axios from 'axios';
import { AwsInfoModel, freeTierGET, freeTierPUT, IsshkeyItem } from '@/constant/awsInfo';
import { Result } from '@/constant/result';
import { getHeader, getHost } from '@/utils/api';


export default class AccountService {
    static async getAwsInfo(): Promise<Result<AwsInfoModel>> {
        const url = getHost() + AwsInfo;
        //const result = await axios.get(url, {headers: getHeader(),});
        const header = getHeader();
        const result = await axios.get(url, { headers: header });
        return result.data;
    }
    static async getSSHKeys(): Promise<IsshkeyItem[]> {
        const url = getHost() + SSHKeys;
        const headers = getHeader();
        const result = await axios.get(url, { headers: headers });
        return result.data.detail;
    }
    static async getFreeTier(): Promise<freeTierGET> {
        const headers = getHeader();
        const url = getHost() + FreeTier;
        const result = await axios.get(url, { headers: headers });
        return result.data.detail;
    }
    static async putFreeTire(obj: freeTierPUT): Promise<freeTierGET> {
        const headers = getHeader();
        const url = getHost() + FreeTier;
        const result = await axios.put(url, obj, { headers: headers });
        return result.data.detail;
    }
    static downSSHKeyItemUrl(id:string):string{
        const url = getHost() + SSHKeys + '/' + id;
        return url;
    }
    static async deleteSSHKeyItem(id:string){
        const url = getHost() + SSHKeys + '/' + id;
        const headers = getHeader();
        const result = await axios.delete(url, { headers: headers });
        return result.data;
    }
}