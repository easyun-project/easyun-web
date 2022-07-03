export interface DcNameQueryParm {
    dc: string
}

export interface ElbBasic {
    elbId: string,
    elbType: string,
    elbState: string,
    elbZones: string[]
}

export interface ElbModel {
    elbId: string,
    elbType: string,
    elbState: string,
    elbZones: string[],
    dnsName: string,
    createTime: string
}

interface listenerAction {
    action: string,
    config: {
        aaa: number,
        bbb: number,
        ccc: string
    }
}

export interface ElbListener {
    listenerId: string,
    protocol: string,
    port: number,
    secPolicy: string,
    sslCertificate: string,
    rules: listenerAction
}


export interface ElbDetail {
    elbBasic: ElbBasic,
    elbConfig: {
        ramSize: number,
        vcpuNum: number,
        volumeSize: number
    },
    elbListeners: ElbListener[],
    elbProperty: {
        engineVer: string,
        multiAz: boolean,
        elbEndpoint:string,
    },
    userTags: Record<'Key'|'Value', string>[]
}
