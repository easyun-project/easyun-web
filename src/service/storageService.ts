import axios from './axiosConfig';
import { StoragePath, StBucketPath, StBucketIdValidate, StVolumePath, StVolumeList } from '@/constant/apiConst';
import { StBucketCreateParms, StBucketInfo, StBucketDetail, StVolumeDetail, AddVolumeParams, StVolumeInfo, VolumeBasic } from '@/constant/storage';
import { RegionItem } from '@/constant/dataCenter';

export interface DcNameQueryParm {
    dc: string
}

export interface BucketPathParams extends DcNameQueryParm{
    bucket_id:string
}

export interface VolumePathParams extends DcNameQueryParm{
    volume_id:string
}

export default class storageService {

    /**
     * get available regions for S3
     */
    static async getS3Region(): Promise<RegionItem[] | undefined> {
        // TODO temp static
        const url =  StoragePath;
        const result = await axios.get(url);
        if (result.status == 200) {
            return result.data.detail as RegionItem[];
        }
    }

    static async getBucketList(params:DcNameQueryParm) {
        // TODO temp static
        const url =  StBucketPath + '/list';
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    static async getBucketDetail(params:BucketPathParams):Promise<StBucketDetail> {
        const url = StBucketPath + '/' + params.bucket_id;
        const result = await axios.get(url, {
            params:{ dc:params.dc }
        });
        return result.data.detail;
    }

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
     * validate bucket_id
     */
    static async validateBucketId(params: BucketPathParams): Promise<boolean> {
        const url =  StBucketIdValidate;
        const result = await axios.get(url, { params });
        return result.data.detail.isAvailable;
    }

    /**
     * list all volume info
     */
    static async listAllVolume(params:DcNameQueryParm): Promise<StVolumeInfo[]> {
        // TODO temp static
        const url =  StVolumePath;
        const result = await axios.get(url, { params });
        return result.data.detail as StVolumeInfo[];
    }

    static async getVolumeList(params:DcNameQueryParm):Promise<VolumeBasic[]>{
        const url =  StVolumeList;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * get volume detail
     */
    static async getVolumeDetail(params:{
        volumeId:string,
        dc:string
    }):Promise<StVolumeDetail>{
        const url =  StVolumePath + '/' + params.volumeId;
        const result = await axios.get(url, {
            params: { dc:params.dc }
        });
        return result.data.detail;
    }
    /**
     * create a new volume
     */
    static async addVolume(params:AddVolumeParams):Promise<
    {'State': string,
    'VolumeId': string}>{
        const url =  StVolumePath;
        const result = await axios.post(url, params);
        return result.data.detail;
    }

    /**
     * delete a volume
     */
    static async deleteVolume(data:{dcName: string, volumeIds: string[]}):Promise<{'msg': string}>{
        const url =  StVolumePath;
        const result = await axios.delete(url, { data });
        return result.data.detail;
    }
};
