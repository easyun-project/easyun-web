const hostKey = 'host';

export default class appService {
    static getHost(): string {
        const host = localStorage.getItem(hostKey);
        return host as string;
    }

    static setHost(host: string) {
        localStorage.setItem(hostKey, host);
    }

}
