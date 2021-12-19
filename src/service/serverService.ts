import {getHeader, getHost} from "@/utils/api";
import {DataCenterAll, ServerList} from "@/constant/apiConst";
import axios from "redaxios";
import {ServerModel} from "@/constant/server";

export default class serverService {
    /**
     * 获取server list
     */
    static async getServerList(token): Promise<ServerModel[]> {
        let url = getHost() + ServerList;
        let result = await axios.get(url, {
            headers: getHeader(token)
        });
        if (result.status == 200) {
            return result.data.detail as ServerModel[];
        }
        return []
    }
}