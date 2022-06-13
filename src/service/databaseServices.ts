import axios from './axiosConfig';
import { DatabasePath } from '@/constant/apiConst';
import { DbiBasic, DbiModel, DbiDetail } from '@/constant/database';


export interface DcNameQueryParm {
    dc: string
}

export interface DbiQueryParam {
    rds_id: string,
    dc?: string
}


export default class DatabaseService {

    /**
     * 获取 Database (RDS数据库),详细信息
     */
    static async listAll(params: DcNameQueryParm): Promise<DbiModel[]> {
        const url = DatabasePath;
        const result = await axios.get(url, { params, });
        return result.data.detail;
    }

    /**
     * 获取 Database (RDS数据库),概要信息
     */
    static async getList(params: DcNameQueryParm): Promise<DbiBasic[]> {
        const url = DatabasePath + '/list';
        const result = await axios.get(url, { params });
        return result.data.detail;
    }


    /**
     * Get specified Database Detail
     */
    static async getDetail(params: DbiQueryParam): Promise<DbiDetail> {
        const url = DatabasePath + '/' + params.rds_id;
        const result = await axios.get(url);
        return result.data.detail;
    }
}