const hostKey = 'host';

export default class appService {
    static getHost(): string {
        // const host = localStorage.getItem(hostKey);
        // return host as string;
        // 这里先偷个懒，直接返回测试服务器，日后再改回来
        return 'http://54.156.105.123:6660';
    }

    static setHost(host: string):void {
        localStorage.setItem(hostKey, host);
    }

}
