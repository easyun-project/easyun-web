import { getHeader, getHost } from '@/utils/api';
import { ServerDetail, ServerList, ServerImages, ServerInstypes,AddServer } from '@/constant/apiConst';
import axios from 'redaxios';
import { ServerModel, SeverDetailModel } from '@/constant/server';
import { amiInfo } from '@/components/Logic/CAmi';
import { InsType } from '@/views/Home/Server/AddServer/InstanceList';

interface insTypeParams {
    dcRegion: string;
    imgCode: 'linux'|'windows';
    insArch: 'x86_64'|'arm64';
    insFamily: string;
}

interface imagesParams {
    dcRegion: string;
    imgArch: string;
    imgPlatform: string;
}

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
            headers: getHeader(),
            params:{ dc:'Easyun' }
        },);
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
     * 获取可用的images
     */
    static async getServerImages(params:imagesParams): Promise<amiInfo[]> {
        const url = getHost() + ServerImages;
        const result = await axios.post(url, params,{
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * 获取可用的instypes
     */
    static async getServerInstypes(params:insTypeParams): Promise<InsType[]> {
        const url = getHost() + ServerInstypes;
        const result = await axios.post(url, params,{
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * 获取可用的instypes
     */
    static async addServer(params:any): Promise<InsType[]> {
        const url = getHost() + AddServer;
        const result = await axios.post(url, params,{
            headers: getHeader()
        });
        return result.data.detail;
    }
}