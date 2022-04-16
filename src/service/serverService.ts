import { ServerDetail, ServerImages, ServerInstypes, ServerInsfamily, ServerAction,SeverEipPath,SeverConfigPath,SeverTagsPath,SeverDiskPath,SeverSecgroupPath, ServerPath, SeverName } from '@/constant/apiConst';
import axios from './axiosConfig';
import { ServerModel, SeverDetailModel } from '@/constant/server';
import { amiInfo } from '@/components/Logic/CAmi';
import { InsType } from '@/views/Resource/Server/AddServer/InstanceList';
import { InsTypeFamily } from '@/views/Resource/Server/AddServer';
import { DiskInfo } from '@/views/Resource/Server/AddServer/DiskConfiguration';import React from 'react';


export interface DcNameQueryParm {
    dc: string
}

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

interface BindServerDiskParams{
  action: 'attach' | 'detach'
  diskPath: string
  svrId: string
  volumeId: string
}
interface BindServerEipParams{
  action: 'attach' | 'detach'
  publicIp: string
  svrId: string
}
interface BindServerSecgroupParams{
  action: 'attach' | 'detach'
  secgroupId: string
  svrId: string
}
interface ChangeServerNameParams{
  svr_ids: string[]
  svr_name: string
}
export default class serverService {
    /**
     * 获取server list
     */
    static async listAllServer(params:DcNameQueryParm): Promise<ServerModel[]> {
        const url =  ServerPath;
        const result = await axios.get(url, { params },);
        if (result.status == 200) {
            return result.data.detail as ServerModel[];
        }
        return [];
    }

    /**
     * 获取server list简易信息
     */
    static async getServerList(params:DcNameQueryParm): Promise<ServerModel[]> {
        const url =  ServerPath + '/list';
        const result = await axios.get(url, { params },);
        if (result.status == 200) {
            return result.data.detail as ServerModel[];
        }
        return [];
    }

    /**
     * 获取server detail
     */
    static async getServerDetail(params: ServerDetailParams): Promise<SeverDetailModel> {
        const url =  ServerDetail + '/' + params.serverId;
        const result = await axios.get(url);
        return result.data.detail as SeverDetailModel;
    }

    /**
     * 获取可用的images
     */
    static async getServerImages(params:imagesParams): Promise<amiInfo[]> {
        const url =  ServerImages;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }


    /**
     * 获取可用的instypes family
     */
    static async getServerInsfamily(params:insTypeParams): Promise<InsTypeFamily[]> {
        const url =  ServerInsfamily;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * 获取可用的instypes
     */
    static async getServerInstypes(params:insTypeParams): Promise<InsType[]> {
        const url =  ServerInstypes;
        const result = await axios.get(url, { params });
        return result.data.detail;
    }

    /**
     * 创建新server
     */
    static async addServer(data:AddServiceParams): Promise<InsType[]> {
        const url =  ServerPath;
        const result = await axios.post(url, data);
        return result.data.detail;
    }

    /**
     * 改变Server的状态，支持start、stop、restart
     */
    static async changeServerState(data): Promise<React.Key[]> {
        const url =  ServerAction;
        const result = await axios.post(url, data);
        return result.data.detail;
    }

    /**
     * 删除server
     */
    static async deleteServerState(data): Promise<DeleteServerInfo[]> {
        const url =  ServerPath;
        const result = await axios.delete(url, { data });
        return result.data.detail;
    }
    /**
     * detach or attach eip
     */
    static async bindServerEip(data:BindServerEipParams): Promise<Record<'msg',string>> {
        const url =  SeverEipPath;
        const result = await axios.put(url,data);
        return result.data.detail;
    }
    /**
     * change server instype config
     */
    static async changeServerConfig(data:ChangeServerConfigParams): Promise<{'new_name': string[],
    'svr_ids': string[]}> {
        const url =  SeverConfigPath;
        const result = await axios.post(url,data);
        return result.data.detail;
    }
    /**
     * update or create new server tag
     */
    static async updateServerTags(data:UpdateServerTagsParams): Promise<{Key: string,Value: string}[]> {
        const url =  SeverTagsPath + data.svrId;
        const result = await axios.put(url,data.tag);
        return result.data.detail;
    }
    /**
     * delete server tag
     */
    static async deleteServerTags(data:UpdateServerTagsParams): Promise<{Key: string,Value: string}[]> {
        const url =  SeverTagsPath + data.svrId;
        const result = await axios.delete(url,
            {
                data:data.tag,
            },
        );
        return result.data.detail;
    }
    /**
     * detach or attach a disk to server
     */
    static async bindServerDisk(data:BindServerDiskParams): Promise<string> {
        const url =  SeverDiskPath;
        const result = await axios.put(url,data
        );
        return result.data.detail;
    }
    /**
     * detach or attach a secgroup to server
     */
    static async bindServerSecgroup(data:BindServerSecgroupParams): Promise<string> {
        const url =  SeverSecgroupPath;
        const result = await axios.put(url,data
        );
        return result.data.detail;
    }
    /**
     * change server name
     */
    static async changeServerName(data:ChangeServerNameParams): Promise<{
      'New_Name': string,
      'Svr_Id': string
    }[]> {
        const url =  SeverName;
        const result = await axios.put(url,data
        );
        return result.data.detail;
    }
}