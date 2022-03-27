export interface ServerModel {
    key?:string
    azName: string
    insType: string
    osName: string
    pubIp: string
    ramSize: number
    svrId: string
    svrState: string
    priIp:string
    tagName:string
    volumeSize:number
    vpuNum:number
}


// export interface SeverDetailModel {

//     'svrNetworking': {
//       'privateIp': string,
//       'publicIp': string
//     },
//     'svrConfig': Record<string,string>,
//     'svrConnect': {
//       'publicIp': string,
//       'userName': string[]
//     },
//     'svrDisk': {
//       'volumeIds': string[]
//     },
//     'svrProperty': {
//       'amiId': string,
//       'amiName': string,
//       'amiPath': string,
//       'iamRole': string,
//       'instanceId': string,
//       'instanceType': string,
//       'keyPairName': string,
//       'launchTime': string,
//       'memory': number,
//       'monitoring': string,
//       'platformDetails': string,
//       'privateIp': string,
//       'privateIpv4Dns': string,
//       'publicIp': string,
//       'publicIpv4Dns': string,
//       'status': string,
//       'tenancy': string,
//       'terminationProtection': string,
//       'usageOperation': string,
//       'vCpu': number,
//       'virtualization': string,
//     },
//     'svrSecurity': Record<'sgId'|'sgName',string>[],
//     'svrTags': {'Key': string,
//           'Value': string}[]
// }
export interface SeverDetailModel{
      svrConfig: {
        arch: string,
        os: string
      },
      svrConnect: {
        publicIp: string,
        userName: string[]
      },
      svrDisk: {
        volumeIds: string[]
      },
      svrNetworking: {
        privateIp: string,
        publicIp: string
      },
      svrProperty: {
        amiId: string,
        amiName: string,
        amiPath: string,
        iamRole: string,
        instanceId: string,
        instanceName: string,
        instanceType: string,
        keyPairName: string,
        launchTime: string,
        memory: number,
        monitoring: string,
        platformDetails: string,
        privateIp: string,
        privateIpv4Dns: string,
        publicIp: string,
        publicIpv4Dns: string,
        status: string,
        tenancy: string,
        terminationProtection: string,
        usageOperation: string,
        vCpu: number,
        virtualization: string,
      },
      svrSecurity:{'sgId': string,
          'sgName': string}[],
      svrTags: {'Key': string,
          'Value': string}[]
    }

