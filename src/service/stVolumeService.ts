import axios from './axiosConfig';
import { StVolumePath, StVolumeList } from '@/constant/apiConst';
import { StVolumeModel,AddVolumeParams,VolumeInfo,VolumeInfoSimple } from '@/constant/storage';


export interface DcNameQueryParm {
    dc: string
}

export default class volumeService {

    static async listAllVolume(params:DcNameQueryParm): Promise<VolumeInfo[] | undefined> {
        // TODO temp static
        const url =  StVolumePath;
        const result = await axios.get(url, { params });
        if (result.status == 200) { return result.data.detail as VolumeInfo[]; }
        return undefined;
    }

    /**
     * list all simple volume info
     */
    static async getVolumeList(params:DcNameQueryParm):Promise<VolumeInfoSimple[]>{
        const url =  StVolumeList;
        const result = await axios.get(url,{ params });
        return result.data.detail;
    }

    /**
     * get volume detail
     */
    static async getStVolumeModel(volumeId:string):Promise<StVolumeModel>{
        const url =  StVolumePath + '/' + volumeId;
        const result = await axios.get(url,{
            params: { dc:'Easyun' }
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
        const result = await axios.post(url,params);
        return result.data.detail;
    }

    /**
     * delete a volume
     */
    static async deleteVolume(data:{dcName: string,volumeIds: string[]}):Promise<{'msg': string}>{
        const url =  StVolumePath;
        const result = await axios.delete(url,{ data });
        return result.data.detail;
    }
}
