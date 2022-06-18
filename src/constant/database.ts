export interface DcNameQueryParm {
    dc: string
}

export interface DbiBasic {
    dbiId: string,
    dbiEngine: string,
    dbiSize: string,
    dbiAz: string,
    dbiStatus: string,
}

export interface DbiModel {
    dbiId: string,
    dbiEngine: string,
    engineVer: string,
    dbiSize: string,
    ramSize: number,
    vcpuNum: number,
    volumeSize: number,
    dbiAz: string,
    dbiStatus: string,
    multiAz: boolean,
    dbiEndpoint:string,
}

export interface DbiDetail {
    dbiBasic: DbiBasic,
    dbiConfig: {
        ramSize: number,
        vcpuNum: number,
        volumeSize: number
    },
    dbiProperty: {
        engineVer: string,
        multiAz: boolean,
        dbiEndpoint:string,
    },
    userTags: Record<'Key'|'Value', string>[]
}
