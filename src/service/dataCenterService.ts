import {
    DataCenterPath,
    DataCenterDefault,
    DcmSubnet,
    DcmSecgroup,
    DcmStaticip, DcmRegion,
    // DataCenterList
} from '@/constant/apiConst';
import axios from './axiosConfig';
// import { getHost } from '@/utils/api';
import {
    DefaultDataCenterParms,
    DataCenterParms,
    EipInfoSimple,
    DataCenterModel,
    DataCenterSummary,
    EipInfo,
    SubnetInfo,
    SecurityGroupDetail,
    SecurityGroupInfoSimple, RegionItem,
} from '@/constant/dataCenter';



export interface DcNameQueryParm {
    dc: string
}


interface DeleteEipParams{
  alloId: string
  dcName: string
  pubIp: string
}


export default class DataCenterService {

    /**
     * 获取所有daterCenter列表
     */
    static async listDataCenter(): Promise<DataCenterModel[]> {
        const url =  DataCenterPath;
        const result = await axios.get(url);
        return result.data.detail;

    }

    /*
     * 获取数据中心列表(概要信息)
     * PS：dashboard中需要通过此接口获取dc列表
     */
    static async getDataCenterList() {
        const url =  DataCenterPath + '/list';
        const result = await axios.get(url);
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }


    /**
     * 获取创建数据中心默认参数
     */
    static async getDefaultDcParms(dcName = 'easyun'): Promise<DefaultDataCenterParms | undefined> {
        const url =  DataCenterDefault;
        const result = await axios.get(url + `?dc=${dcName}`);
        if (result.status == 200) {
            return result.data.detail as DefaultDataCenterParms;
        }
        return undefined;
    }


    static async getDatacenterRegion(): Promise<RegionItem[] | undefined> {
        const url =  DcmRegion;
        const result = await axios.get(url);
        if (result.status == 200) {
            return result.data.detail as RegionItem[];
        }
        return undefined;
    }

    /**
     * 创建数据中心
     * @param token
     * @param params
     */
    static async createDataCenter(params: DataCenterParms): Promise<boolean> {
        const url =  DataCenterPath;
        const result = await axios.post(url, params);
        if (result.status == 200) {
            return result.data.detail;
        }
        return false;
    }

    /*
     * 获取指定数据中心(VPC)相关信息( for overview page)
     */
    static async getDataCenterVpc(params: DcNameQueryParm): Promise<DataCenterSummary | undefined> {
        const url =  DataCenterPath + '/vpc';
        const result = await axios.get(url, { params });
        if (result.status == 200) {
            return result.data.detail as DataCenterSummary;
        }
        return undefined;
    }

    /**
     * 获取subnet
     */
    static async getSubnet(params: DcNameQueryParm): Promise<SubnetInfo[]> {
        const url =  DcmSubnet;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * 获取secgroup安全组,详细信息
     */
    static async getSecgroup(params: DcNameQueryParm): Promise<SecurityGroupDetail[]> {
        const url =  DcmSecgroup;
        const result = await axios.get(url, { params, });
        return result.data.detail;
    }

    /**
     * 获取secgroup安全组,概要信息
     */
    static async listSecgroup(params: DcNameQueryParm): Promise<SecurityGroupInfoSimple[]> {
        const url =  DcmSecgroup + '/list';
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * 添加eip
     */
    static async createEip(dcName: string): Promise<Record<'msg', string>> {
        const url =  DcmStaticip;
        const result = await axios.post(url, { dcName });
        return result.data.detail;

    }

    /**
     * delete an eip
     */
    static async deleteEip(params: DeleteEipParams): Promise<Record<'msg', string>> {
        const url =  DcmStaticip;
        const result = await axios.delete(url,  { data : params });
        return result.data.detail;

    }

    /**
     * 获取eip基础信息
     */
    static async listEipInfo(dc: string): Promise<EipInfoSimple[]> {
        const url =  DcmStaticip + '/list';
        const result = await axios.get(url, { params: { dc }, });
        return result.data.detail;
    }

    /**
     * 获取eip详细信息
     */
    static async getEipInfo(params:{dc:string}):Promise<EipInfo[]>{
        const url =  DcmStaticip;
        const result = await axios.get(url,{ params });
        return result.data.detail;
    }


    /**
     * 删除datacenter
     */
    static async deleteDataCenter(dcName: string): Promise<EipInfo[]> {
        const url =  DataCenterPath;
        const result = await axios.delete(url, { data: { dcName } });
        return result.data.detail;
    }
}
