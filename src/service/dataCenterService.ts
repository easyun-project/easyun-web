import { DataCenterPath, DataCenterDefault, DataCenterSum } from '@/constant/apiConst';
import axios from './axiosConfig';
import { getHeader } from '@/utils/api';
import {
    DcNameQueryParm,
    QueryNewDcParm,
    DefaultDataCenterParms,
    DataCenterParams,
    DeleteDcParm,
    DataCenterModel,
    DataCenterSummary,
    RegionItem,
    TaskInfo,
    TaskDetail
} from '@/constant/dataCenter';


export default class DataCenterService {

    /**
     * 获取所有daterCenter列表
     */
    static async listDataCenter(): Promise<DataCenterModel[]> {
        const url = DataCenterPath;
        const result = await axios.get(url);
        return result.data.detail;
    }

    /*
     * 获取数据中心列表(概要信息)
     * PS：dashboard中需要通过此接口获取dc列表
     */
    static async getDataCenterList() {
        const url = DataCenterPath + '/list';
        const result = await axios.get(url);
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }

    // 获取可用的region列表
    static async getRegionList(): Promise<RegionItem[] | undefined> {
        const url = DataCenterPath + '/region';
        const result = await axios.get(url, {
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail as RegionItem[];
        }
        return undefined;
    }

    /**
     * 获取创建数据中心默认参数
     */
    static async getDefaultDcParams(params: QueryNewDcParm): Promise<DefaultDataCenterParms | undefined> {
        const url = DataCenterDefault;
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail as DefaultDataCenterParms;
        }
        return undefined;
    }

    /**
     * 创建数据中心
     * @param token
     * @param params
     */
    static async createDataCenter(params: DataCenterParams): Promise<TaskInfo | undefined> {
        const url = DataCenterPath;
        const result = await axios.post(url, params, {
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.task;
        }
        return undefined;
    }

    /**
     * 删除datacenter
     */
    static async deleteDataCenter(params: DeleteDcParm) {
        const url = DataCenterPath;
        const result = await axios.delete(url, {
            data: params,
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.task;
        }
        return result.data.message;
    }


    /**
     * 获取异步任务执行结果
     */
    static async getTaskResult(id: string): Promise<TaskDetail | undefined> {
        const url = DataCenterPath + '/task';
        const replacedId = id.replaceAll('-', '_');
        const result = await axios.get(url, {
            params: {
                id: replacedId
            },
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.task as TaskDetail;
        } else if (result.status == 400) {
            return result.data.message;
        }
        return undefined;
    }

    /*
     * 获取指定数据中心(VPC)基础服务汇总信息( for overview page)
     */
    static async getDataCenterVpc(params: DcNameQueryParm): Promise<DataCenterSummary | undefined> {
        const url = DataCenterSum + '/basic';
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail as DataCenterSummary;
        }
        return undefined;
    }
}