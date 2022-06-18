import axios from './axiosConfig';
import { DcmStaticip } from '@/constant/apiConst';
import {
    StaticIpInfo,
    StaticIpBasic
} from '@/constant/dataCenter';


export interface EipPathParam {
    eipId: string,
    dc?: string
}

export interface EipDetail {
    eipId: string,
    dc?: string
}

interface CreateEipParams {
    dcName: string
}

interface DeleteEipParams {
    eipId: string
    dcName: string
    publicIp: string
}

export default class StaticIPService {

    /**
     * 获取eip列表(详细信息)
     */
    static async listAll(params: { dc: string }): Promise<StaticIpInfo[]> {
        const url = DcmStaticip;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * 获取eip列表(基础信息)
     */
    static async getList(dc: string): Promise<StaticIpBasic[]> {
        const url = DcmStaticip + '/list';
        const result = await axios.get(url, { params: { dc }, });
        return result.data.detail;
    }

    /**
     * Get specified StaticIP Detail
     */
    static async getDetail(params: EipPathParam): Promise<EipDetail> {
        const url = DcmStaticip + '/' + params.eipId;
        const result = await axios.get(url);
        return result.data.detail;
    }

    /**
     * Create new StaticIP
     */
    static async create(params: CreateEipParams): Promise<Record<'msg', string>> {
        const url = DcmStaticip;
        const result = await axios.post(
            url,
            { data: params }
        );
        return result.data.detail;
    }

    /**
     * delete a StaticIP
     */
    static async delete(params: DeleteEipParams): Promise<Record<'msg', string>> {
        const url = DcmStaticip;
        const result = await axios.delete(
            url,
            { data: params }
        );
        return result.data.detail;
    }

}