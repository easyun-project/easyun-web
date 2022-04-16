import axios from './axiosConfig';
import { Result } from '@/constant/result';
import { StBucketPath } from '@/constant/apiConst';
import { StBucketParms, StBucketModel } from '@/constant/storage';


export interface DcNameQueryParm {
    dc: string
}

export default class bucketService {

    static async listAllBucket(params:DcNameQueryParm): Promise<StBucketModel[] | undefined> {
        // TODO temp static
        const url =  StBucketPath;
        const result = await axios.get(url, { params });
        if (result.status == 200) { return result.data.detail as StBucketModel[]; }
        return undefined;
    }

    static async getBucketList(params:DcNameQueryParm) {
        // TODO temp static
        const url =  StBucketPath + '/list';
        const result = await axios.get(url, { params });
        if (result.status == 200) { return result.data.detail; }
        return undefined;
    }

    static async getBucketDetail(bucketId:string) {
        const url = StBucketPath + bucketId;
        const result = await axios.get(url);
        return result.data;
    }


    static async addBucket<T>(params: StBucketParms): Promise<Result<T>> {
        const url =  StBucketPath;
        const result = await axios.post(url, params);
        return result.data as Result<T>;
    }


    /**
     * delete a bucket
     */
    static async deleteBucket<T>(params: string): Promise<Result<T>> {
        const url =  StBucketPath;
        const result = await axios.post(url, { bucketName: params });
        return result.data as Result<T>;
    }



};
