import { AwsInfo, SSHKeys, FreeTier } from '@/constant/apiConst';
import axios from './axiosConfig';
import { AwsInfoModel, freeTierGET, freeTierPUT, IsshkeyItem } from '@/constant/awsInfo';
import { Result } from '@/constant/result';


export default class AccountService {
    static async getAwsInfo(): Promise<Result<AwsInfoModel>> {
        const url =  AwsInfo;
        //const result = await axios.get(url, {headers: getHeader(),});
        const result = await axios.get(url);
        return result.data;
    }
    static async getSSHKeys(): Promise<IsshkeyItem[]> {
        const url =  SSHKeys;
        const result = await axios.get(url);
        return result.data.detail;
    }
    static async getFreeTier(): Promise<freeTierGET> {
        const url =  FreeTier;
        const result = await axios.get(url);
        return result.data.detail;
    }
    static async putFreeTire(obj: freeTierPUT): Promise<freeTierGET> {
        const url =  FreeTier;
        const result = await axios.put(url, obj);
        return result.data.detail;
    }
    static downSSHKeyItemUrl(id:string):string{
        const url =  SSHKeys + '/' + id;
        return url;
    }
    static async deleteSSHKeyItem(id:string){
        const url =  SSHKeys + '/' + id;
        const result = await axios.delete(url);
        return result.data;
    }
}