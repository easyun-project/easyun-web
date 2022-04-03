import { getHeader, getHost } from '@/utils/api';
import { StBucketPath, StVolumeList,VolumeOperate } from '@/constant/apiConst';
import { Result } from '@/constant/result';
import axios from 'axios';
import { BucketInfo,VolumeDetail,AddVolumeParams,VolumeInfoSimple } from '@/constant/storage';
import store from '@/redux/store';

export default class storageService {

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

    /**
     * delete a bucket
     */
    static async deleteBucket<T>(deleteBucketInfo: string): Promise<Result<T>> {
        const url = getHost() + StBucketPath;
        const result = await axios.post(url, { bucketName: deleteBucketInfo }, {
            headers: getHeader()
        });
        return result.data as Result<T>;
    }

    /**
     * get volume detail
     */
    static async getVolumeDetail(volumeId:string):Promise<VolumeDetail>{
        const url = getHost() + VolumeOperate + '/' + volumeId;
        const result = await axios.get(url,{
            params: { dc:'Easyun' },
            headers: getHeader()
        });
        return result.data.detail;
    }
    /**
     * create a new volume
     */
    static async addVolume(params:AddVolumeParams):Promise<
    {'State': string,
    'VolumeId': string}>{
        const url = getHost() + VolumeOperate;
        const result = await axios.post(url,params,{
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * delete a volume
     */
    static async deleteVolume(data:{dcName: string,volumeIds: string[]}):Promise<{'msg': string}>{
        const url = getHost() + VolumeOperate;
        const result = await axios.delete(url,{
            data,
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * list all simple volume info
     */
    static async listVolume():Promise<VolumeInfoSimple[]>{
        const url = getHost() + StVolumeList;
        const result = await axios.get(url,{
            params:{
                dc:store.getState().dataCenter.currentDC.basicInfo!.dcName
            },
            headers: getHeader()
        });
        return result.data.detail;
    }
}
