export interface Result<T> {
    stats_code: number,
    message: string,
    detail: T
}

export const fail = async (): Promise<undefined> => {
    return undefined
}


export interface UserModel {
    account_id: string;
    account_type: string;
    type: string;
    token: string;
}

export interface DefaultDataCenterModel {
    az: string;
    key: string;
    pri_subnet1: string;
    pri_subnet2: string;
    pub_subnet1: string;
    pub_subnet2: string;
    region: string;
    secure_group1: string,
    secure_group2: string,
    secure_group3: string,
    tag_spec: DataCenterTagSpec;
    vpc_cidr: string;
}

interface DataCenterTagSpec {
    ResourceType: string;
    Tag: Tag[]
}

interface Tag {
    Key: string;
    Value: string;
}


// {
//         "create_date": "2021-12-18 11:05:39.606044",
//         "keypair": [
//         "{'Keypair filename', 'key-easyun-user.pem'}"
//     ],
//         "region_name": "us-east-1",
// },

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
}

interface Keypair{

}