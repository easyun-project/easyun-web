import axios from './axiosConfig';
import { DcmSubnet } from '@/constant/apiConst';
import {
    DcNameQueryParm,
    SubnetInfo,
} from '@/constant/dataCenter';


export interface SubnetPathParam {
    subnetId: string,
    dc?: string
}

export interface SubnetDetail {
    availableIpNum: number
    cidrBlock: string
    isMapPublicIp: boolean
    subnetAz: string
    subnetId: string
    subnetState: string
    subnetType: string
    vpcId: string
    tagName: string
}

interface CreateSubnetParams {
    subnetId: string
    dcName: string
}

interface DeleteSubnetParams {
    subnetId: string
    dcName: string
}


export default class SubnetService {

    /**
     * 获取Subnet列表(详细信息)
     */
    static async listAll(params: DcNameQueryParm): Promise<SubnetInfo[]> {
        const url = DcmSubnet;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * Get specified Subnet Detail
     */
    static async getDetail(params: SubnetPathParam): Promise<SubnetDetail> {
        const url = DcmSubnet + '/' + params.subnetId;
        const result = await axios.get(url);
        return result.data.detail;
    }

    /**
     * Create new Subnet
     */
    static async create(params: CreateSubnetParams): Promise<Record<'msg', string>> {
        const url = DcmSubnet;
        const result = await axios.post(
            url,
            { data: params }
        );
        return result.data.detail;
    }

    /**
     * delete a Subnet
     */
    static async delete(params: DeleteSubnetParams): Promise<Record<'msg', string>> {
        const url = DcmSubnet;
        const result = await axios.delete(
            url,
            { data: params }
        );
        return result.data.detail;
    }
}
