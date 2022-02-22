export interface BucketInfo {
    bucketName: string;
    versioningConfiguration: string;
    bucketEncryption: string;
    region: string;
}

export interface VolumeDetail{
    'volAttach': {
      'attachPath': string
      'attachSvr': string
      'diskType': string
    },
    'volBasic': {
      'attachPath': string
      'createTime': string
      'tagName': string
      'volumeAz': string
      'volumeId': string
      'volumeState': string
    },
    'volConfig': {
      'isEncrypted': boolean
      'volumeIops': number
      'volumeSize': number
      'volumeThruput': number
      'volumeType': string
    },
    'volTags': Record<'Key'|'Value',string>[]
  }