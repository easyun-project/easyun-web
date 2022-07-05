import axios from './axiosConfig';
import { StBucketPath, StBucketIdValidate } from '@/constant/apiConst';
import { StBucketCreateParms, StBucketModel, StBucketDetailModel, StBucketObjectModel } from '@/constant/storage';


export interface DcNameQueryParm {
    dcName: string
}

export interface GetBucketDetailParams extends DcNameQueryParm{
    bucketId:string
}

export default class bucketService {

    static async listAllBucket(params:DcNameQueryParm): Promise<StBucketModel[]> {
        // TODO temp static
        const url =  StBucketPath;
        const result = await axios.get(url, { params:{ dc:params.dcName } });
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
        const result = await axios.get(url, {
            params:{ dc:params.dcName }
        });
        return result.data.detail;
    }

    /**
     * add a bucket
     */
    static async addBucket(params: StBucketCreateParms): Promise<string> {
        const url =  StBucketPath;
        const result = await axios.post(url, params);
        return result.data;
    }
    /**
     * delete a bucket
     */
    static async deleteBucket(data: {dcName:string, bucketId:string}): Promise<string> {
        const url =  StBucketPath;
        const result = await axios.delete(url, { data });
        return result.data.message;
    }
    /**
     * validate bucketId
     */
    static async validateBucketId(params: GetBucketDetailParams): Promise<boolean> {
        const url =  StBucketIdValidate;
        const result = await axios.get(url, { params });
        return result.data.detail.isAvailable;
    }
    /**
     * get S3 bucket objects list
     */
    static async getBucketObjects(params: GetBucketDetailParams):Promise<StBucketObjectModel[]>{
        const url = StBucketPath + '/' + params.bucketId + '/object';
        const result = await axios.get(url, { params:{ dc : params.dcName } });
        return result.data.detail;
    }
};
