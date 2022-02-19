import { getHeader, getHost } from '@/utils/api';
import { ServerDetail, ServerList, ServerImages, ServerInstypes, ServerInsfamily, AddServer } from '@/constant/apiConst';
import axios from 'redaxios';
import { ServerModel, SeverDetailModel } from '@/constant/server';
import { amiInfo } from '@/components/Logic/CAmi';
import { InsType } from '@/views/Resource/Server/AddServer/InstanceList';
import { InsTypeFamily } from '@/views/Resource/Server/AddServer';
import { DiskInfo } from '@/views/Resource/Server/AddServer/DiskConfiguration';;

interface insTypeParams {
    os?: 'linux'|'windows'
    arch: 'x86_64'|'arm64'
    family?: string
    dc:string
}

interface imagesParams {
    os: string
    arch: string
    dc:string
}

export interface ServerDetailParams {
    serverId: string
}

interface AddServiceParams {
  'BlockDeviceMappings': DiskInfo[],
  'ImageId': string,
  'InstanceType': string,
  'KeyName': string,
  'SecurityGroupIds': string[],
  'SubnetId': string
  'dcName': string
  'svrNumber': number
  'tagName': string
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
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        return result.data.detail;
    }


    /**
     * 获取可用的instypes family
     */
    static async getServerInsfamily(params:insTypeParams): Promise<InsTypeFamily[]> {
        const url = getHost() + ServerInsfamily;
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * 获取可用的instypes
     */
    static async getServerInstypes(params:insTypeParams): Promise<InsType[]> {
        const url = getHost() + ServerInstypes;
        const result = await axios.get(url, {
            params,
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * 获取可用的instypes
     */
    static async addServer(data:AddServiceParams): Promise<InsType[]> {
        const url = getHost() + AddServer;
        const result = await axios.post(url, data,{
            headers: getHeader()
        });
        return result.data.detail;
    }
}