export interface ServerModel {
    key?:string
    azName: string
    ebsSize: number
    insType: string
    osName: string
    pubIp: string
    ramSize: number
    svrId: string
    svrName: string
    svrState: string
    vpuNumb: number
}


export interface SeverDetailModel {
    IamInstanceProfile: string,
    ImageId: string
    ImageName: string
    ImagePath: string
    ServerState: string
    InstanceId: string
    InstanceType: string
    KeyName: string
    LaunchTime: string
    Memory: string
    Monitoring: string
    PlatformDetails: string
    PrivateDnsName: string,
    IpName: string,
    PrivateIpAddress: string,
    PublicIpAddress: string,
    PublicDnsName: string
    UsageOperation: string
    VCpu: number,
    VirtualizationType: string
}

