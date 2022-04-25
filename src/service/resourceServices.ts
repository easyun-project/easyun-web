import axios from 'axios';
import { getHeader, getHost } from '@/utils/api';
import {
    DataCenterPath, DataCenterSum
} from '@/constant/apiConst';
import {
    ResourceSummary,
    CostSummary,
} from '@/constant/resource';



export interface DcNameQueryParm {
    dc: string
}

export default class DcResourceService {

    /*
     * 获取指定数据中心云资源（resource）概要( for overview page)
     */
    static async getResourceSummary(params: DcNameQueryParm): Promise<ResourceSummary | undefined> {
        const url = getHost() + DataCenterSum + '/resource';
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail as ResourceSummary;
        }
        return undefined;
    }

    /*
     * 获取指定数据中心成本（cost&usage）概要( for overview page)
     */
    static async getCostSummary(params: DcNameQueryParm): Promise<CostSummary | undefined> {
        const url = getHost() + DataCenterSum + '/cost';
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail as CostSummary;
        }
        return undefined;
    }

}