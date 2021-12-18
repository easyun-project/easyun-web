const hostKey = 'host';

export default class appService {
    static getHost(): string {
        let host = localStorage.getItem(hostKey);
        return host as string;
    }

    static setHost(host: string): string {
        localStorage.setItem(hostKey, host);
        return host
    }

}
