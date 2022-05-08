import { StBucketPath } from '@/constant/apiConst';
import { Result } from '@/constant/result';
import axios from './axiosConfig';
import { StBucketParms } from '@/constant/storage';

export default class bucketManage {

    static async addBucket<T>(params: StBucketParms): Promise<Result<T>> {
        const url =  StBucketPath;
        const result = await axios.post(url, params);
        return result.data as Result<T>;
    }

    static async listBucket<T>(): Promise<Result<T>> {
        // TODO temp static
        const url =  StBucketPath + '?dc=Easyun';
        const result = await axios.get(url);
        return result.data as Result<T>;
    }

    static async deleteBucket<T>(params: string): Promise<Result<T>> {
        const url =  StBucketPath;
        const result = await axios.post(url, { bucketName: params });
        return result.data as Result<T>;
    }
}
