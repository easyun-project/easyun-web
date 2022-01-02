import { CreateDataCenter, DataCenterAll, DataCenterDefault } from '@/constant/apiConst';
import axios from 'redaxios';
import { getHeader, getHost } from '@/utils/api';
import { DataCenterModel, DefaultDataCenterModel } from '@/constant/dataCenter';

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

export default class DataCenterService {
    /**
     * 获取数据中心默认参数
     */
    static async getDefault(token): Promise<DefaultDataCenterModel | undefined> {
        const url = getHost() + DataCenterDefault;
        const result = await axios.get(url, {
            headers: getHeader(token)
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
    static async createDataCenter(token: string, params: CreateDataCenterParams): Promise<boolean> {
        const url = getHost() + CreateDataCenter;
        const result = await axios.post(url, params, {
            headers: getHeader(token)
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return false;
    }

    /**
     * 获取dataCenter
     */
    static async getDataCenter(token): Promise<DataCenterModel | undefined> {
        const url = getHost() + DataCenterAll;
        const result = await axios.get(url, {
            headers: getHeader(token)
        });
        if (result.status == 200) {
            return result.data.detail as DataCenterModel;
        }
        return undefined;
    }
}