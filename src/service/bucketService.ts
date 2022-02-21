import { StorageGetBucket } from "@/constant/apiConst";
import { getHeader } from "@/utils/api";
import axios from "redaxios";

export default class bucketService {
    static async getBucket(bktId) {
        const url = StorageGetBucket + bktId
        const headers = getHeader()
        const result = await axios.get(url, { headers })
        return result.data
    }
};
