import {CreateDataCenter, DataCenterDefault, UserLogin} from '@/constant/apiConst';
import {DefaultDataCenterModel, Result} from '@/constant/result';
import axios from "redaxios";
import {getHeader, getHost} from "@/utils/api";

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
    static async getDefault(): Promise<DefaultDataCenterModel> {
        let url = getHost() + DataCenterDefault;
        const result = await axios.get(url);
        return result.data as DefaultDataCenterModel;
    }

    /**
     * 创建数据中心
     * @param token
     * @param params
     */
    static async createDataCenter(token: string, params: CreateDataCenterParams): Promise<boolean> {
        let url = getHost() + CreateDataCenter;

        let result = await axios.post(url, params, {
            headers: getHeader(token)
        });
        return result.status == 200;
}
