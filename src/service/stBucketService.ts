import axios from './axiosConfig';
import { StBucketPath, StBucketIdValidate } from '@/constant/apiConst';
import { StBucketCreateParms, StBucketObjectModel, StBucketInfo, StBucketDetail } from '@/constant/storage';
import { DcNameQueryParm } from '@/constant/dataCenter';


export interface BucketPathParam extends DcNameQueryParm{
    bucketId:string
}

export default class BucketService {

    static async listAllBucket(params:DcNameQueryParm): Promise<StBucketInfo[]> {
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

    static async getBucketDetail(parms:BucketPathParam):Promise<StBucketDetail> {
        const url = StBucketPath + '/' + parms.bucketId;
        const result = await axios.get(url, {
            params:{ dc:parms.dc }
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
    static async validateBucketId(params: BucketPathParam): Promise<boolean> {
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
