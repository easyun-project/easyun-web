import axios from 'axios';
import { Result } from '@/constant/result';
import { getHeader, getHost } from '@/utils/api';
import { StBucketPath } from '@/constant/apiConst';
import { StBucketParms, StBucketModel } from '@/constant/storage';


export interface DcNameQueryParm {
    dc: string
}

export default class bucketService {

    static async listBucket<T>(params:DcNameQueryParm): Promise<StBucketModel[] | undefined> {
        // TODO temp static
        const url = getHost() + StBucketPath;
        const result = await axios.get(url, {
            params,
         // params:{ dc:store.getState().dataCenter.currentDC.basicInfo!.dcName }            
            headers: getHeader(),
        });
        if (result.status == 200) { return result.data.detail as StBucketModel[]; }
        return undefined;
    }

    static async getBucketList<T>(params:DcNameQueryParm) {
        // TODO temp static
        const url = getHost() + StBucketPath + '/list';
        const result = await axios.get(url, {
            params,
         // params:{ dc:store.getState().dataCenter.currentDC.basicInfo!.dcName }            
            headers: getHeader(),
        });
        if (result.status == 200) { return result.data.detail }
        return undefined;
    }

    static async getBucketDetail(bucketId:string) {
        const url = StBucketPath + bucketId;
        const headers = getHeader();
        const result = await axios.get(url, { headers });
        return result.data;
    }


    static async addBucket<T>(params: StBucketParms): Promise<Result<T>> {
        const url = getHost() + StBucketPath;
        const result = await axios.post(url, params, {
            headers: getHeader()
        });
        return result.data as Result<T>;
    }


    /**
     * delete a bucket
     */
     static async deleteBucket<T>(params: string): Promise<Result<T>> {
        const url = getHost() + StBucketPath;
        const result = await axios.post(url, { bucketName: params }, {
            headers: getHeader()
        });
        return result.data as Result<T>;
    }



};
