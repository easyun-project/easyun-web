import {DataCenterDefault, UserLogin} from '@/constant/apiConst';
import {Result} from '@/constant/result';
import axios from "redaxios";
import {getHost} from "@/utils/api";

export default class DataCenterService {
    static async getDefault<T>(): Promise<T> {
        let url = getHost() + DataCenterDefault;
        const result = await axios.get(url);
        return result.data as T;
    }
}
