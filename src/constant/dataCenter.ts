export interface DcNameQueryParm {
    dc: string
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

export interface QueryNewDcParm {
    dc: string
    region?: string
}

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

// DataCenter workload resource summary
export interface ResourceSummary {
    bucketNum: number,
    efsNum: number,
    efsbackupNum: number,
    elbNum: number,
    elbtgNum: number,
    rdsNum: number,
    rdsbackupNum: number,
    serverNum: number,
    volbackupNum: number,
    volumeNum: number
}

// DataCenter workload Cost&Usage summary
export interface CostUsageItem {
    metric?: string
    unit: string
    value: string
}

export interface TimePeriodItem {
    Start: string
    End: string
}

export interface GroupCostUsage {
    service: string
    cost: CostUsageItem
    usage: CostUsageItem
}

export interface PeriodMonthlyCost {
    timePeriod: TimePeriodItem
    groupCost: GroupCostUsage[]
    totalCost: CostUsageItem
}

export interface PeriodTotalCost {
    timePeriod: TimePeriodItem
    totalCost: CostUsageItem
}

export interface CostSummary {
    currMonthTotal: PeriodTotalCost
    lastMonthTotal: PeriodTotalCost
    forecastTotal?: PeriodTotalCost
    latestWeekCost: PeriodTotalCost[]
    currMonthCost: PeriodMonthlyCost
}

// DataCenter Management
export interface DeleteDcParm {
    dcName: string;
    isForceDel?: boolean
}

export interface DataCenterModel {
    createDate: string
    createUser: string
    accountId: string
    dcName: string
    regionCode: string
    cidrBlock: string
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


export interface StaticIpInfo {
    eipId: string
    associationId: string
    isAvailable: boolean
    publicIp: string
    tagName: string
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
    targetId: string
}

// interface DataCenterTagSpec {
//     ResourceType: string;
//     Tag: Tag[]}



export interface IntGatewayInfo {
    igwId: string,
    state: string,
    vpcId: string,
    tagName: string
}

interface NatGWNetwork {
    allocationId: string,
    eniId: string,
    privateIp: string,
    publicIp: string
}

export interface NatGatewayInfo {
    natgwId: string,
    state: string,
    vpcId: string,
    tagName: string,
    createTime: string,
    connectType: string,
    subnetId: string,
    network: NatGWNetwork
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

export interface RouteTableInfo {
    rtbId: string,
    vpcId: string,
    tagName: string,
    routes: {
        'DestinationCidrBlock': string,
        'GatewayId': string,
        'Origin': string,
        'State': string,
      }[],
      associations: {
        'AssociationState': Record<'State', string>,
        'Main': boolean,
        'RouteTableAssociationId': string,
        'RouteTableId': string,
        'SubnetId': string
      }[],
      propagateVgws: Record<string, unknown>[]
}

export interface RouteTableBasic {
    rtbId: string,
    vpcId: string,
    tagName: string
}

export interface SecurityGroupInfo {
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

export interface SecurityGroupBasic {
    'sgDesc': string
    'sgId': string
    'sgName': string
    'tagName': string
}

export interface StaticIpBasic {
    eipId: string
    associationId: string
    isAvailable: boolean
    publicIp: string
    tagName: string
}
