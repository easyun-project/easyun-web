import axios from 'axios';
import { getHeader, getHost } from '@/utils/api';
import { StVolumePath, StVolumeList } from '@/constant/apiConst';
import { StVolumeModel,AddVolumeParams,VolumeInfo,VolumeInfoSimple } from '@/constant/storage';


export interface DcNameQueryParm {
    dc: string
}

export default class volumeService {

    static async listAllVolume(params:DcNameQueryParm): Promise<VolumeInfo[] | undefined> {
        // TODO temp static
        const url = getHost() + StVolumePath;
        const result = await axios.get(url, {
            params,
            headers: getHeader(),
        });
        if (result.status == 200) { return result.data.detail as VolumeInfo[]; }
        return undefined;
    }

    /**
     * list all simple volume info
     */
    static async getVolumeList(params:DcNameQueryParm):Promise<VolumeInfoSimple[]>{
        const url = getHost() + StVolumeList;
        const result = await axios.get(url,{
            params,
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * get volume detail
     */
    static async getStVolumeModel(volumeId:string):Promise<StVolumeModel>{
        const url = getHost() + StVolumePath + '/' + volumeId;
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
        const url = getHost() + StVolumePath;
        const result = await axios.post(url,params,{
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * delete a volume
     */
    static async deleteVolume(data:{dcName: string,volumeIds: string[]}):Promise<{'msg': string}>{
        const url = getHost() + StVolumePath;
        const result = await axios.delete(url,{
            data,
            headers: getHeader()
        });
        return result.data.detail;
    }
}
