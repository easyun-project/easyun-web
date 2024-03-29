import React from 'react';
import bucketImage from '@/assets/images/resource/stbucket.png';
import { BucketCardInfo } from '../CStorageCard/StBucketCard';
import { getDomain } from '@/views/Resource/StBucket/BucketManage/utils';

export default function BucketCard({ bktDetail }: { bktDetail: BucketCardInfo }) {
    const { bktName, bktRegion, stType } = bktDetail;
    console.log('🚀 ~ file: index.tsx ~ line 8 ~ CBucketCard ~ props', bktDetail);
    return (
        <div className='flex'>
            <div className='flex p-4'>
                <div>
                    <img className='w-20' src={bucketImage} alt="stbucket.png" />
                </div>
                <div className='ml-5'>
                    <div className='text-2xl font-bold'>{bktName}</div>
                    <div className='text-gray-500'>{stType}</div>
                    <div className='text-gray-500'>Domain: {getDomain(bktName, bktRegion, false)}</div>
                </div>
            </div>
            <div>
                {/* TODO 增加S3 Assemble 客户端下载 接口 */}
            </div>
        </div>
    );
}