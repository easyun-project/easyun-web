import { getHeader, getHost } from '@/utils/api';
import {
    DashBoardDatacenter,
    DashBoardGraphical,
    DashBoardHealth,
    DashBoardInventory,
} from '@/constant/apiConst';
import axios from 'redaxios';

type dcParams = {
    dcName: string,
    type?: string
}

export default class dashboard {
    /**
     * 获取首行数据 DataCenter
     */
    static async getDatacenter({ dcName }: dcParams) {
        const url = getHost() + DashBoardDatacenter;
        const result = await axios.get(url, {
            headers: getHeader(),
            params: { dc: dcName }
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }

    /**
     * 获取首行数据 Health
     */
    static async getHealth({ dcName }: dcParams) {
        const url = getHost() + DashBoardHealth;
        const result = await axios.get(url, {
            headers: getHeader(),
            params: { dc: dcName }
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }

    /**
     * 获取全部资源Graphical看板 Summary
     */
    static async getGraphical({ dcName }: dcParams) {
        const url = getHost() + DashBoardGraphical;
        const result = await axios.get(url, {
            headers: getHeader(),
            params: { dc: dcName }
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }

    /**
     * 获取Inventory清单
     * @param type 获取类型-默认 获取全部 all
     */
    static async getInventory({ dcName, type = 'all' }: dcParams) {
        const url = getHost() + DashBoardInventory + `/${type}`;
        const result = await axios.get(url, {
            headers: getHeader(),
            params: { dc: dcName }
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }
}
