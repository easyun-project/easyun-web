import axios from './axiosConfig';
import { LoadbalancerPath, LoadbalancerList } from '@/constant/apiConst';
import { ElbBasic, ElbModel, ElbDetail } from '@/constant/loadbalancer';


export interface DcNameQueryParm {
    dc: string
}

export interface ElbQueryParam {
    elb_id: string,
    dc?: string
}


export default class LoadbalancerService {

    /**
     * 获取 Load balancer (ELB),详细信息
     */
    static async listAll(params: DcNameQueryParm): Promise<ElbModel[]> {
        const url = LoadbalancerPath;
        const result = await axios.get(url, { params, });
        return result.data.detail;
    }

    /**
     * 获取 Load balancer (ELB),概要信息
     */
    static async getList(params: DcNameQueryParm): Promise<ElbBasic[]> {
        const url = LoadbalancerList;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }


    /**
     * Get specified Load balancer Detail
     */
    static async getDetail(params: ElbQueryParam): Promise<ElbDetail> {
        const url = LoadbalancerPath + '/' + params.elb_id;
        const result = await axios.get(url);
        return result.data.detail;
    }
}