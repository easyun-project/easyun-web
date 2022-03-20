export interface DefaultDataCenterModel {
    az: string;
    key: string;
    pri_subnet1: string;
    pri_subnet2: string;
    pub_subnet1: string;
    pub_subnet2: string;
    region: string;
    secure_group1: string | undefined,
    secure_group2: string | undefined,
    secure_group3: string | undefined,
    tag_spec: DataCenterTagSpec;
    vpc_cidr: string;
}

export interface EipInfoSimple{
      alloId: string
      assoId: string
      isAvailable: boolean
      pubIp: string
      tagName: string
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

interface DataCenterTagSpec {
    ResourceType: string;
    Tag: Tag[]
}

interface Tag {
    Key: string;
    Value: string;
}

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

export interface DataCenterInfo {
    createDate: string
    createUser: string
    dcAccount: string
    dcName: string
    dcRegion: string
    dcUser: string
    vpcCidr: string
    vpcID:string
}

export interface SecGroupDetail{
      'ibPermissions':
        {
          'FromPort': number
          'IpProtocol': string
          'IpRanges': Record<string,string>[],
          'Ipv6Ranges': string[],
          'PrefixListIds': string[],
          'ToPort': number
          'UserIdGroupPairs': string[]
        }[],
      'ibrulesNum': number
      'obPermissions':
        {
          'IpProtocol': string
          'IpRanges': Record<string,string>[]
          'Ipv6Ranges': string[]
          'PrefixListIds': string[]
          'UserIdGroupPairs': string[]
        }[],
      'obrulesNum': number
      'sgDes': string
      'sgId': string
      'sgName': string
      'tagName': string
    }