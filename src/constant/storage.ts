export interface StBucketCreateParms {
    bucketCreateParm: {
    bucketACL: string
    isEncryption: boolean
    isVersioning: boolean
    pubBlockConfig: {
    BlockPublicAcls: boolean
    BlockPublicPolicy: boolean
    IgnorePublicAcls: boolean
    RestrictPublicBuckets: boolean
    },
    regionCode: string
  },
  bucketId: string
  dcName: string
}

export interface StBucketModel {
    bucketAccess: {
      description: string
      status: string
    },
    bucketId: string
    bucketRegion: string
    bucketSize: {
      unit: string
      value: number
    },
    bucketUrl: string
    createTime: string
}

export interface StBucketDetailModel {
    bucketBasic: {
      bucketId: string
      bucketRegion: string
      bucketUrl: string
      createTime: string
    },
    bucketPermission: {
      bucketACL: string
      description: string
      pubBlockConfig: {
        BlockPublicAcls: boolean,
        BlockPublicPolicy: boolean
        IgnorePublicAcls: boolean
        RestrictPublicBuckets: boolean
      },
      status: string
    },
    bucketProperty: {
      isEncryption: boolean
      isVersioning: boolean
    },
    userTags: Record<'Key'|'Value', string>[]
}

export interface VolumeBasic {
    createTime: string
    tagName: string
    volumeAz: string
    volumeId: string
    volumeState: string
  }

export interface StVolumeModel{
    volumeAttach: {
        attachPath: string
        attachTime: string
        diskType: string
        svrId: string
        tagName: string
      }[],
    volumeBasic: VolumeBasic,
    volumeConfig: {
      isEncrypted: boolean
      volumeIops: number
      volumeSize: number
      volumeThruput: number
      volumeType: string
    },
    userTags: Record<'Key'|'Value', string>[]
  }

export interface VolumeInfo{
    volumeAttach: {
        attachPath: string
        svrId: string
        attachTime: string
        diskType: string
        tagName:string
      }[]
    createTime:string
    isEncrypted:boolean
    tagName:string
    volumeAz:string
    volumeId:string
    volumeIops:number
    volumeSize:number
    volumeState:string
    volumeThruput?:number
    volumeType:string
  }

export interface SelectedVolumeTypeInfo{
    typeDesc:string,
    volumeSize:number[],
    volumeIops: null|number[],    //固定为{volumeSize}*100,
    volumeThruput: null|number[],
    isMultiattach: boolean,
    isBootvolume: boolean
}

export const VolumeTypeInfo:Record<'gp2'|'gp3'|'io1'|'io2'|'st1'|'sc1'|'standard', SelectedVolumeTypeInfo> = {
    gp2: {
        typeDesc:'General Purpose SSD (gp2)',
        volumeSize:[ 1, 16384 ],
        volumeIops: null,    //固定为{volumeSize}*100,
        volumeThruput: null,
        isMultiattach: false,
        isBootvolume: true
    },
    gp3: {
        typeDesc:'General Purpose SSD (gp3)',
        volumeSize:[ 1, 16384 ],
        volumeIops:[ 3000, 16000 ],
        volumeThruput:[ 1, 1000 ],
        isMultiattach: false,
        isBootvolume: true
    },
    io1: {
        typeDesc:'Provisioned IOPS SSD (io1)',
        volumeSize:[ 4, 16384 ],
        volumeIops:[ 100, 64000 ],
        volumeThruput: null,
        isMultiattach: true,
        isBootvolume: true
    },
    io2: {
        typeDesc:'Provisioned IOPS SSD (io2)',
        volumeSize:[ 8, 16384 ],
        volumeIops:[ 100, 256000 ],
        volumeThruput: null,
        isMultiattach: true,
        isBootvolume: true
    },
    st1:{
        typeDesc:'Throughput Optimized HDD (st1)',
        volumeSize:[ 125, 16384 ],
        volumeIops: null,
        volumeThruput: null,
        isMultiattach: false,
        isBootvolume: false
    },
    sc1:{
        typeDesc:'Cold HDD (sc1)',
        volumeSize:[ 125, 16384 ],
        volumeIops: null,
        volumeThruput: null,
        isMultiattach: false,
        isBootvolume: false
    },
    standard:{
        typeDesc:'Magnetic (standard)',
        volumeSize:[ 1, 1024 ],
        volumeIops: null,
        volumeThruput: null,
        isMultiattach: false,
        isBootvolume: true
    }
};

export interface AddVolumeParams{
  attachPath: string
  azName: string
  dcName: string
  isEncrypted: boolean
  svrId: string
  tagName: string
  volumeIops?: number
  volumeSize: number
  volumeThruput?: number
  volumeType: string
}

export interface VolumeInfoSimple{
    isAvailable: boolean
    tagName: string
    volumeAz: string
    volumeId: string
    volumeSize: number
    volumeState: string
    volumeType: string
}

export interface StBucketObjectModel{
    key: string
    modifiedTime: string
    size: number,
    storageClass: string
    type: string
}