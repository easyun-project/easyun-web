export interface DefaultDataCenterParms {
    dcParms: DataCenterParams;
    dropDown: DcDropDown
}

export interface DataCenterParams {
    dcName: string;
    dcRegion: string;
    dcVPC: DcVpcParm;
    priSubnet1: SubnetParms;
    priSubnet2: SubnetParms;
    pubSubnet1: SubnetParms;
    pubSubnet2: SubnetParms;
    securityGroup0: SecurityGroupParms;
    securityGroup1: SecurityGroupParms;
    securityGroup2: SecurityGroupParms;
    keypair?: string
}

interface DcVpcParm {
    cidrBlock: string;
    cidrBlock6?: string
}

export interface SubnetParms {
    azName: string;
    cidrBlock: string;
    gwName?: string;
    routeTable: string;
    tagName: string;
}

export interface SecurityGroupParms {
    enablePing: boolean;
    enableRDP: boolean;
    enableSSH: boolean;
    tagName: string;
}

export interface DcDropDown {
    azList: string[];
    gwList: string[];
    rtbList: string[];
}

export interface DeleteDcParm {
    dcName: string;
    isForceDel?: boolean
}

export interface DataCenterModel {
    createDate: string
    createUser: string
    dcAccount: string
    dcName: string
    dcRegion: string
    vpcCidr: string
    vpcID: string
}


export interface DataCenterSummary {
    azSummary: AzSummary[]
    // dcBasic : DataCenterModel
    vpcSummary: VpcSummary
}

export interface AzSummary {
    azName: string
    subnetNum: number
}

export interface VpcSummary {
    aclNum: number
    eipNum: number
    igwNum: number
    natNum: number
    priNum: number
    pubNum: number
    rtbNum: number
    sgNum: number
}


export interface EipInfo {
    alloId: string
    assoId: string
    assoTarget: {
        eniId: string
        eniType: string
        svrId: string
        tagName: string
    },
    boarderGroup: string
    eipDomain: string
    eniId: string
    ipv4Pool: string
    pubIp: string
    tagName: string
    targetId: string
}

// interface DataCenterTagSpec {
//     ResourceType: string;
//     Tag: Tag[]}


export interface EipInfoSimple {
    alloId: string
    assoId: string
    isAvailable: boolean
    pubIp: string
    tagName: string
}

export interface SubnetInfo {
    availableIpNum: number
    cidrBlock: string
    isMapPublicIp: boolean
    subnetAz: string
    subnetId: string
    subnetState: string
    subnetType: string
    vpcId: string
    tagName: string
}

export interface CSecOptInfo {
    sgId: string
    tagName: string
    sgDesc?: string
    sgName: string
}

export interface RegionItem {
    regionCode: string;
    countryCode: string;
    regionName: string;
}

export interface SecurityGroupDetail {
    'ibPermissions':
        {
            'FromPort': number
            'IpProtocol': string
            'IpRanges': [
                {
                    'CidrIp': string
                }
            ],
            'Ipv6Ranges': string[],
            'PrefixListIds': string[],
            'ToPort': number
            'UserIdGroupPairs': string[]
        }[]
    'ibRulesNum': number
    'obPermissions':
        {
            'IpProtocol': string
            'IpRanges': [
                {
                    'CidrIp': string
                }
            ],
            'Ipv6Ranges': string[],
            'PrefixListIds': string[],
            'UserIdGroupPairs': string[]
        }[]
    'obRulesNum': number
    'sgDesc': string
    'sgId': string
    'sgName': string
    'tagName': string
}

[];

export interface SecurityGroupInfoSimple {
    'sgDesc': string
    'sgId': string
    'sgName': string
    'tagName': string
}


export interface TaskInfo {
    description: string
    taskId: string
}


export interface TaskDetail {
    current: number,
    total: number,
    description: string
    taskId: string
}

export interface DCProgressInfo {
    current: number,
    description: string
}