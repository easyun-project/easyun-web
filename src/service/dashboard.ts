import { getHeader, getHost } from '@/utils/api';
import {DashBoardDatacenter, DashBoardHealth} from '@/constant/apiConst';
import axios from 'redaxios';

export default class dashboard {
    /**
     * 获取首行数据 DataCenter
     */
    static async getDatacenter(){
        const url = getHost() + DashBoardDatacenter;
        const result = await axios.get(url,{
            headers: getHeader(),
            params:{ dc:'Easyun' }
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }

    /**
     * 获取首行数据 Health
     */
    static async getHealth(){
        const url = getHost() + DashBoardHealth;
        const result = await axios.get(url,{
            headers: getHeader(),
            params:{ dc:'Easyun' }
        });
        if (result.status == 200) {
            return result.data.detail;
        }
        return undefined;
    }
}
