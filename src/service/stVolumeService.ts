import axios from './axiosConfig';
import { StVolumePath, StVolumeList } from '@/constant/apiConst';
import { StVolumeModel, AddVolumeParams, VolumeInfo, VolumeInfoSimple } from '@/constant/storage';


export interface DcNameQueryParm {
    dcName: string
}

export default class volumeService {

    static async listAllVolume(params:DcNameQueryParm): Promise<VolumeInfo[]> {
        // TODO temp static
        const url =  StVolumePath;
        const result = await axios.get(url, { params:{ dc:params.dcName } });
        return result.data.detail as VolumeInfo[];
    }

    /**
     * list all simple volume info
     */
    static async getVolumeList(params:DcNameQueryParm):Promise<VolumeInfoSimple[]>{
        const url =  StVolumeList;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * get volume detail
     */
    static async getStVolumeModel(params:{
        volumeId:string,
        dc:string
    }):Promise<StVolumeModel>{
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
}
