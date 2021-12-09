import axios from 'redaxios';

export default class appService {
    static async getHost(): Promise<string> {
        const result = await axios.get(`${window.location.href}/config`)
        return result.data
    }
}
