import { getHeader, getHost } from '@/utils/api';
import { ServerDetail, ServerList, ServerImages, ServerInstypes, ServerInsfamily, AddServer,ServerAction,SeverEipPath,SeverConfigPath,SeverTagsPath } from '@/constant/apiConst';
import axios from 'redaxios';
import { ServerModel, SeverDetailModel } from '@/constant/server';
import { amiInfo } from '@/components/Logic/CAmi';
import { InsType } from '@/views/Resource/Server/AddServer/InstanceList';
import { InsTypeFamily } from '@/views/Resource/Server/AddServer';
import { DiskInfo } from '@/views/Resource/Server/AddServer/DiskConfiguration';import React from 'react';
import store from '@/redux/store';

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

interface DeleteServerInfo{
      currState: string
      preState: string
      svrId: string
}
interface ChangeServerConfigParams{
  ins_type: string,
  svr_ids: string[]
}

interface UpdateServerTagsParams{
    svrId:string,
    tag:{
        Key: string,
        Value: string
    }
}
export default class serverService {
    /**
     * 获取server list
     */
    static async getServerList(): Promise<ServerModel[]> {
        const url = getHost() + ServerList;
        const result = await axios.get(url, {
            headers: getHeader(),
            params:{ dc:store.getState().dataCenter.currentDc.basicInfo!.dcName }
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
     * 创建新server
     */
    static async addServer(data:AddServiceParams): Promise<InsType[]> {
        const url = getHost() + AddServer;
        const result = await axios.post(url, data,{
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * 改变Server的状态，支持start、stop、restart
     */
    static async changeServerState(data): Promise<React.Key[]> {
        const url = getHost() + ServerAction;
        const result = await axios.post(url, data,{
            headers: getHeader()
        });
        return result.data.detail;
    }

    /**
     * 删除server
     */
    static async deleteServerState(data): Promise<DeleteServerInfo[]> {
        const url = getHost() + AddServer;
        const result = await axios.delete(url, {
            data,
            headers: getHeader()
        });
        return result.data.detail;
    }
    /**
     * attach eip
     */
    static async attachEip(data): Promise<Record<'msg',string>> {
        const url = getHost() + SeverEipPath;
        const result = await axios.put(url, data,
            {
                headers: getHeader()
            });
        return result.data.detail;
    }
    /**
     * detach eip
     */
    static async detachEip(publicIp): Promise<Record<'msg',string>> {
        const url = getHost() + SeverEipPath;
        const result = await axios.put(url,
            {
                publicIp
            },
            {
                headers: getHeader()
            },
        );
        return result.data.detail;
    }
    /**
     * change server instype config
     */
    static async changeServerConfig(data:ChangeServerConfigParams): Promise<{'new_name': string[],
    'svr_ids': string[]}> {
        const url = getHost() + SeverConfigPath;
        const result = await axios.post(url,data,
            {
                headers: getHeader()
            },
        );
        return result.data.detail;
    }
    /**
     * update or create new server tag
     */
    static async updateServerTags(data:UpdateServerTagsParams): Promise<{Key: string,Value: string}[]> {
        const url = getHost() + SeverTagsPath + data.svrId;
        const result = await axios.put(url,data.tag,
            {
                headers: getHeader()
            },
        );
        return result.data.detail;
    }
    /**
     * delete server tag
     */
    static async deleteServerTags(data:UpdateServerTagsParams): Promise<{Key: string,Value: string}[]> {
        const url = getHost() + SeverTagsPath + data.svrId;
        const result = await axios.delete(url,
            {
                data:data.tag,
                headers: getHeader()
            },
        );
        return result.data.detail;
    }

}