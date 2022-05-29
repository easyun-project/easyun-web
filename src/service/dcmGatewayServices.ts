import axios from './axiosConfig';
import { DcmIntGW, DcmNatGW } from '@/constant/apiConst';
import {
    DcNameQueryParm,
    IntGatewayInfo,
    NatGatewayInfo
} from '@/constant/dataCenter';


export interface IntGWPathParam {
    igwId: string,
    dc?: string
}

export interface IntGatewayDetail {
    igwId: string,
    dc?: string
}

interface CreateIntGWParams {
    dcName: string
}

interface DeleteIntGWParams {
    igwId: string
    dcName: string
    publicIp: string
}

export class IntGatewayService {

    /**
     * 获取Internet Gateway列表(详细信息)
     */
    static async listAll(params: DcNameQueryParm): Promise<IntGatewayInfo[]> {
        const url = DcmIntGW;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * 获取Internet Gateway列表(基础信息)
     */
    // static async getList(dc: string): Promise<IntGatewayInfo[]> {
    //     const url = DcmIntGW + '/list';
    //     const result = await axios.get(url, { params: { dc }, });
    //     return result.data.detail;
    // }

    /**
     * Get specified Internet Gateway Detail
     */
    static async getDetail(params: IntGWPathParam): Promise<IntGatewayDetail> {
        const url = DcmIntGW + '/' + params.igwId;
        const result = await axios.get(url);
        return result.data.detail;
    }

    /**
     * Create new Internet Gateway
     */
    static async create(params: CreateIntGWParams): Promise<Record<'msg', string>> {
        const url = DcmIntGW;
        const result = await axios.post(
            url,
            { data: params }
        );
        return result.data.detail;
    }

    /**
     * delete a Internet Gateway
     */
    static async delete(params: DeleteIntGWParams): Promise<Record<'msg', string>> {
        const url = DcmIntGW;
        const result = await axios.delete(
            url,
            { data: params }
        );
        return result.data.detail;
    }
}


export interface NatGWPathParam {
    natgwId: string,
    dc?: string
}

export interface NatGatewayDetail {
    natgwId: string,
    dc?: string
}

interface CreateNatGWParams {
    dcName: string
}

interface DeleteNatGWParams {
    natgwId: string
    dcName: string
    publicIp: string
}

export class NatGatewayService {

    /**
     * 获取NAT Gateway列表(详细信息)
     */
    static async listAll(params: DcNameQueryParm): Promise<NatGatewayInfo[]> {
        const url = DcmNatGW;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * 获取NAT Gateway列表(基础信息)
     */
    // static async getList(dc: string): Promise<NatGatewayBasic[]> {
    //     const url = DcmNatGW + '/list';
    //     const result = await axios.get(url, { params: { dc }, });
    //     return result.data.detail;
    // }

    /**
     * Get specified NAT Gateway Detail
     */
    static async getDetail(params: NatGatewayDetail): Promise<NatGatewayDetail> {
        const url = DcmNatGW + '/' + params.natgwId;
        const result = await axios.get(url);
        return result.data.detail;
    }

    /**
     * Create new NAT Gateway
     */
    static async create(params: CreateNatGWParams): Promise<Record<'msg', string>> {
        const url = DcmNatGW;
        const result = await axios.post(
            url,
            { data: params }
        );
        return result.data.detail;
    }

    /**
     * delete a NAT Gateway
     */
    static async delete(params: DeleteNatGWParams): Promise<Record<'msg', string>> {
        const url = DcmNatGW;
        const result = await axios.delete(
            url,
            { data: params }
        );
        return result.data.detail;
    }
}