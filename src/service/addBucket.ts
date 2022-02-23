import { getHeader, getHost } from '@/utils/api';
import { StBucketPath, StBucketList } from '@/constant/apiConst';
import { Result } from '@/constant/result';
import axios from 'redaxios';
import { BucketInfo } from '@/constant/bucketInfo';

export default class bucketManage {

    static async addBucket<T>(addBucketInfo: BucketInfo): Promise<Result<T>> {
        const url = getHost() + StBucketPath;
        const result = await axios.post(url, addBucketInfo, {
            headers: getHeader()
        });
        return result.data as Result<T>;
    }

    static async listBucket<T>(): Promise<Result<T>> {
        // TODO temp static
        const url = getHost() + StBucketPath + '?dc=Easyun';
        const result = await axios.get(url, {
            headers: getHeader()
        });
        return result.data as Result<T>;
    }

    static async deleteBucket<T>(deleteBucketInfo: string): Promise<Result<T>> {
        const url = getHost() + StBucketPath;
        const result = await axios.post(url, { bucketName: deleteBucketInfo }, {
            headers: getHeader()
        });
        return result.data as Result<T>;
    }
}
