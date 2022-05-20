import axios from './axiosConfig';
import { Result } from '@/constant/result';
import { StBucketPath } from '@/constant/apiConst';
import { StBucketParms, StBucketModel,StBucketDetailModel } from '@/constant/storage';


export interface DcNameQueryParm {
    dc: string
}

export interface GetBucketDetailParams extends DcNameQueryParm{
    bucketId:string
}

export default class bucketService {

    static async listAllBucket(params:DcNameQueryParm): Promise<StBucketModel[]> {
        // TODO temp static
        const url =  StBucketPath;
        const result = await axios.get(url, { params });
        return result.data.detail as StBucketModel[];
    }

    static async getBucketList(params:DcNameQueryParm) {
        // TODO temp static
        const url =  StBucketPath + '/list';
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    static async getBucketDetail(params:GetBucketDetailParams):Promise<StBucketDetailModel> {
        const url = StBucketPath + '/' + params.bucketId;
        const result = await axios.get(url,{
            params:{ dc:params.dc }
        });
        return result.data.detail;
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
