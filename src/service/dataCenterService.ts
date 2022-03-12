import {
    DataCenterPath,
    DataCenterAdd,
    DataCenterAll,
    DataCenterDefault,
    DcmSubnet,
    DcmSecgroup,
    DcmStaticip,
    DataCenterList
} from '@/constant/apiConst';
import axios from 'redaxios';
import { getHeader, getHost } from '@/utils/api';
import { DataCenterModel, DefaultDataCenterModel,EipInfoSimple,DataCenterInfo,SecGroupDetail } from '@/constant/dataCenter';
import { SubnetInfo } from '@/views/Resource/Server/AddServer/Networking';

// 创建数据中心需要的参数
export interface CreateDataCenterParams {
    keypair?: string,
    private_subnet_1?: string,
    private_subnet_2?: string,
    public_subnet_1?: string,
    public_subnet_2?: string,
    region?: string,
    sgs1_flag?: string,
    sgs2_flag?: string,
    sgs3_flag?: string,
    vpc_cidr?: string
}

export interface DatacenterParams{
    dc:string
}

interface SecGroupInfo{
    sgDes: string
    sgId: string
    sgName: string
    tagName: string
}

export default class DataCenterService {

    /**
     * 获取所有datercenter的信息
     */
    static async getDataCenterInfo(): Promise<DataCenterInfo[]> {
        const url = getHost() + DataCenterPath;
        const result = await axios.get(url, {
            headers: getHeader()
        });
        return result.data.detail;

    }

    /*
     * 获取数据中心列表(概要信息)
     * PS：dashboard中需要通过此接口获取dc列表
     */
    static async getDataCenterList() {
        const url = getHost() + DataCenterList;
        const result = await axios.get(url, {
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }


    /**
     * 获取数据中心默认参数
     */
    static async getDefault(): Promise<DefaultDataCenterModel | undefined> {
        const url = getHost() + DataCenterDefault;
        const result = await axios.get(url, {
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail as DefaultDataCenterModel;
        }
        return undefined;
    }

    /**
     * 创建数据中心
     * @param token
     * @param params
     */
    static async createDataCenter(params: CreateDataCenterParams): Promise<boolean> {
        const url = getHost() + DataCenterAdd;
        const result = await axios.post(url, params, {
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return false;
    }


    /**
     * 获取dataCenter
     */
    static async getDataCenter(): Promise<DataCenterModel | undefined> {
        const url = getHost() + DataCenterAll;
        const result = await axios.get(url, {
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail as DataCenterModel;
        }
        return undefined;
    }

    /**
     * 获取subnet
     */
    static async getSubnet(params:DatacenterParams):Promise<SubnetInfo[]>{
        const url = getHost() + DcmSubnet;
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * 获取secgroup安全组,详细信息
     */
    static async getSecgroup(params:DatacenterParams):Promise<SecGroupDetail[]>{
        const url = getHost() + DcmSecgroup;
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * 添加eip
     */
    static async createEip(dcName:string):Promise<Record<'msg',string>>{
        const url = getHost() + DcmStaticip;
        const result = await axios.post(url, { dcName },{
            headers: getHeader()
        });
        return result.data.detail;

    }

    /**
     * 获取eip基础信息
     */
    static async listEipInfo(dc:string):Promise<EipInfoSimple[]>{
        const url = getHost() + DcmStaticip + '/list';
        const result = await axios.get(url,{
            params:{ dc },
            headers: getHeader()
        });
        return result.data.detail;
    }

}
