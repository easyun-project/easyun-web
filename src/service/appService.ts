import axios from 'redaxios';

export default class appService {
    static async getHost(): Promise<string> {
        const result = await axios.get("http://localhost:8088/config")
        return result.data
    }
}
