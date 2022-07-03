import axios from './axiosConfig';
import { DcmSecgroup } from '@/constant/apiConst';
import {
    DcNameQueryParm,
    SecurityGroupInfo,
    SecurityGroupBasic,
} from '@/constant/dataCenter';


export interface SecgroupPathParam {
    sg_id: string,
    dc?: string
}

export interface SecgroupDetail {
    availableIpNum: number
    cidrBlock: string
    isMapPublicIp: boolean
    SecgroupAz: string
    sgId: string
    SecgroupState: string
    SecgroupType: string
    vpcId: string
    tagName: string
}

interface CreateSecgroupParams {
    sgId: string
    dcName: string
}

interface DeleteSecgroupParams {
    sgId: string
    dcName: string
}


export default class SecgroupService {

    /**
     * 获取secgroup安全组,详细信息
     */
    static async listAll(params: DcNameQueryParm): Promise<SecurityGroupInfo[]> {
        const url = DcmSecgroup;
        const result = await axios.get(url, { params, });
        return result.data.detail;
    }

    /**
     * 获取secgroup安全组,概要信息
     */
    static async getList(params: DcNameQueryParm): Promise<SecurityGroupBasic[]> {
        const url = DcmSecgroup + '/list';
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * Get specified Secgroup Detail
     */
    static async getDetail(params: SecgroupPathParam): Promise<SecgroupDetail> {
        const url = DcmSecgroup + '/' + params.sg_id;
        const result = await axios.get(url);
        return result.data.detail;
    }

    /**
     * Create new Secgroup
     */
    static async create(params: CreateSecgroupParams): Promise<Record<'msg', string>> {
        const url = DcmSecgroup;
        const result = await axios.post(
            url,
            { data: params }
        );
        return result.data.detail;
    }

    /**
     * delete a Secgroup
     */
    static async delete(params: DeleteSecgroupParams): Promise<Record<'msg', string>> {
        const url = DcmSecgroup;
        const result = await axios.delete(
            url,
            { data: params }
        );
        return result.data.detail;
    }
}