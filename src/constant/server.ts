export interface ServerModel {
    ebs: number,
    ins_type: string,
    os: string,
    pub_ip: string,
    ram: number,
    rg_az: string,
    svr_id: string,
    svr_name: string,
    svr_state: string,
    vcpu: number,
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

