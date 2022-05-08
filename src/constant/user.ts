export interface UserModel {
    username: string;
    accountId: string;
    accountType: string;
    token: string;
    deployRegion: string;
    role: string;
    loginTime?: number;
}
