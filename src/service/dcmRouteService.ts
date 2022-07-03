import axios from './axiosConfig';
import { DcmRoute } from '@/constant/apiConst';
import {
    DcNameQueryParm,
    RouteTableInfo,
    RouteTableBasic,
} from '@/constant/dataCenter';


export interface RoutetabPathParam {
    rtb_id: string,
    dc?: string
}

export interface RouteTableDetail {
    rtbId: number,
    vpcId: string,
    tagName: string,
    routes: {
        'DestinationCidrBlock': string,
        'GatewayId': string,
        'Origin': string,
        'State': string,
      }[],
      associations: {
        'AssociationState': Record<'State', string>,
        'Main': boolean,
        'RouteTableAssociationId': string,
        'RouteTableId': string,
        'SubnetId': string
      }[],
      propagateVgws: Record<string, unknown>[]
}

interface CreateRoutetabParams {
    rtbId: string
    dcName: string
}

interface DeleteRoutetabParams {
    rtbId: string
    dcName: string
}

export default class RouteService {

    /**
     * 获取RouteTable路由表,详细信息
     */
    static async listAll(params: DcNameQueryParm): Promise<RouteTableInfo[]> {
        const url = DcmRoute;
        const result = await axios.get(url, { params, });
        return result.data.detail;
    }

    /**
     * 获取RouteTable路由表,概要信息
     */
    static async getList(params: DcNameQueryParm): Promise<RouteTableBasic[]> {
        const url = DcmRoute + '/list';
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * Get specified Routetable Detail
     */
    static async getDetail(params: RoutetabPathParam): Promise<RouteTableDetail> {
        const url = DcmRoute + '/' + params.rtb_id;
        const result = await axios.get(url);
        return result.data.detail;
    }

    /**
     * Create new Routetable
     */
    static async create(params: CreateRoutetabParams): Promise<Record<'msg', string>> {
        const url = DcmRoute;
        const result = await axios.post(
            url,
            { data: params }
        );
        return result.data.detail;
    }

    /**
     * delete a Routetable
     */
    static async delete(params: DeleteRoutetabParams): Promise<Record<'msg', string>> {
        const url = DcmRoute;
        const result = await axios.delete(
            url,
            { data: params }
        );
        return result.data.detail;
    }
}