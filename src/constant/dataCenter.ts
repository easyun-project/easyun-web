export interface DefaultDataCenterModel {
    dcParms: DcParams;
    dropDown: DcDropDown
}

interface DcParams {
    dcName: string;
    dcRegion: string;
    dcVPC: DcVPC;
    priSubnet1: Subnet;
    priSubnet2: Subnet;
    pubSubnet1: Subnet;
    pubSubnet2: Subnet;
    securityGroup0: SecurityGroup;
    securityGroup1: SecurityGroup;
    securityGroup2: SecurityGroup;
}

export interface EipInfo{
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

interface DcVPC {
    cidrBlock: string;
}

export interface EipInfoSimple {
    alloId: string
    assoId: string
    isAvailable: boolean
    pubIp: string
    tagName: string
}


export interface DataCenterModel {
    azs: string[],
    create_date: string,
    region_name: string,
    securitygroup: object[],
    subnets: Subnet[]
    vpc_id: string;
}

export interface Subnet {
    azName: string;
    cidrBlock: string;
    gwName: string;
    routeTable: string;
    tagName: string;
}


export interface DataCenterInfo {
createDate: string
createUser: string
dcAccount: string
dcName: string
dcRegion: string
dcUser: string
vpcCidr: string
vpcID: string
}

export interface DataCenterSubnetInfo {
    cidr: string;
    az: string;
    gw: string;
    rtb: string;
}


export interface SecurityGroup {
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

export interface SubnetInfo{
      avlipNum: number
      cidrBlock: string
      isMappubip: boolean
      subnetAz: string
      subnetId: string
      subnetState: string
      subnetType: string
      subnetVpc: string
      tagName: string
}

export interface CSecOptInfo {
    sgId: string
    tagName: string
    sgDes?: string
    sgName: string
}

export interface SecurityGroupDetail{
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
      'ibrulesNum': number
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
      'obrulesNum': number
      'sgDes': string
      'sgId': string
      'sgName': string
      'tagName': string
    }[];

export interface SecurityGroupInfoSimple{
    'sgDes': string
      'sgId': string
      'sgName': string
      'tagName': string}
