import { getHeader, getHost } from '@/utils/api';
import { ServerDetail, ServerList } from '@/constant/apiConst';
import axios from 'redaxios';
import { ServerModel, SeverDetailModel } from '@/constant/server';


export interface ServerDetailParams {
    token: string;
    serverId: string;
}

export default class serverService {
    /**
     * 获取server list
     */
    static async getServerList(token): Promise<ServerModel[]> {
        const url = getHost() + ServerList;
        const result = await axios.get(url, {
            headers: getHeader(token)
        });
        if (result.status == 200) {
            return result.data.detail as ServerModel[];
        }
        return [];
    }

    /**
     * 获取server detail
     */
    static async getServerDetail(params: ServerDetailParams): Promise<SeverDetailModel | undefined> {
        const url = getHost() + ServerDetail + params.serverId;
        const result = await axios.get(url, {
            headers: getHeader(params.token)
        });
        if (result.status == 200) {
            return result.data.detail as SeverDetailModel;
        }
        return undefined;
    }
}