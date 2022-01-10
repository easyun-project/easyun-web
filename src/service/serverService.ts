import { getHeader, getHost } from '@/utils/api';
import { ServerDetail, ServerList, ServerImages, ServerInstypes } from '@/constant/apiConst';
import axios from 'redaxios';
import { ServerModel, SeverDetailModel } from '@/constant/server';
import { Result } from '@/constant/result';

interface params {
    'dcRegion': string;
    'imgCode': 'linux'|'windows';
    'insArch': 'x86_64'|'arm64';
    'insFamily': string;
};

export interface ServerDetailParams {
    token: string;
    serverId: string;
}

export default class serverService {
    /**
     * 获取server list
     */
    static async getServerList(): Promise<ServerModel[]> {
        const url = getHost() + ServerList;
        const result = await axios.get(url, {
            headers: getHeader()
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
            headers: getHeader()
        });
        if (result.status == 200) {
            return result.data.detail as SeverDetailModel;
        }
        return undefined;
    }

    /**
     * 获取server detail
     */
    static async getServerImages<T>(params:params): Promise<Result<T>> {
        const url = getHost() + ServerImages;
        const result = await axios.post(url, params,{
            headers: getHeader()
        });
        return result.data.detail;
    }
}