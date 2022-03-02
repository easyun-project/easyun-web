import { getHeader, getHost } from '@/utils/api';
import { AddBucket, DeleteBucket, ListBucket,VolumeOperate } from '@/constant/apiConst';
import { Result } from '@/constant/result';
import axios from 'redaxios';
import { BucketInfo,VolumeDetail } from '@/constant/storage';

export default class storageService {

    static async addBucket<T>(addBucketInfo:BucketInfo): Promise<Result<T>> {
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

    static async deleteBucket<T>(deleteBucketInfo:string):Promise<Result<T>>{
        const url = getHost() + DeleteBucket;
        const result = await axios.post(url,{ bucketName:deleteBucketInfo },{
            headers: getHeader()
        });
        return result.data as Result<T>;
    }

    /**
     * 获取可用的volume的detail信息
     */
    static async getVolumeDetail(volumeId:string):Promise<VolumeDetail>{
        const url = getHost() + VolumeOperate + '/' + volumeId;
        const result = await axios.get(url,{
            params: { dc:'Easyun' },
            headers: getHeader()
        });
        return result.data.detail;
    }
}
