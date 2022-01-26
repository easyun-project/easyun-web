import { getHeader, getHost } from '@/utils/api';
import { AddBucket,ListBucket,DeleteBucket } from '@/constant/apiConst';
import { Result } from '@/constant/result';
import axios from 'redaxios';

export default class bucketManage {

    static async addBucket<T>(addBucketInfo:any,token:string): Promise<Result<T>> {
        const url = getHost() + AddBucket;
        const result = await axios.post(url, addBucketInfo,{
            headers: getHeader()
        });
        return result.data as Result<T>;
    }

    static async listBucket<T>():Promise<Result<T>>{
        const url = getHost() + ListBucket;
        const result = await axios.get(url,{
            headers: getHeader()
        });
        return result.data as Result<T>;
    }

    static async deleteBucket<T>(deleteBucketInfo:string,token:string):Promise<Result<T>>{
        const url = getHost() + DeleteBucket;
        const result = await axios.post(url,{ bucketName:deleteBucketInfo },{
            headers: getHeader()
        });
        return result.data as Result<T>;
    }
}