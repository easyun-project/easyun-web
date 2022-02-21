export interface Result<T> {
    stats_code: number,
    message: string,
    detail: T
}

export const fail = async (): Promise<undefined> => {
    return undefined;
};

export interface DataCenterModel {
    azs: string[],
    create_date: string,
    region_name: string,
    securitygroup: object[],
    subnets: Subnet[]
    vpc_id: string;
}

interface Subnet {
    SubnetId: string;
    CidrBlock: string;
    AvailableIpAddressCount: string;
    keypair: Keypair
}

interface Keypair {
    filename: string
}
export interface keyItem {
  keyName: string;
  pemUrl: string;
}

export interface AwsInfoModel {
  awsInfo: {
    accountID: string;
    accountType: string;
    role: string;
  };
  freeTier: {
    atvDate: string;
    enRemind: boolean;
    icoStatus: string;
  };
  keyList: never[];
}

export interface EventLogListModel{

}
