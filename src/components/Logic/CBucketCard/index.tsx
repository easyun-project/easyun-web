import React from 'react';
import bucketImage from '@/assets/images/stbucket.png';
import { getDomain } from '@/views/Resource/StBucket/BucketManage/utils';
import { StBucketModel } from '@/constant/storage';

export default function CBucketCard(props: StBucketModel) {
    const { bucketId, bucketRegion, bucketAccess } = props;
    return (
        <div className='flex'>
            <div className='flex p-4'>
                <div>
                    <img className='w-20' src={bucketImage} alt="stbucket.png" />
                </div>
                <div className='ml-5'>
                    <div className='text-2xl font-bold'>{bucketId}</div>
                    <div className='text-gray-500'>{bucketAccess.status}</div>
                    <div className='text-gray-500'>Domain: {getDomain(bucketId, bucketRegion, false)}</div>
                </div>
            </div>
            <div>
                {/* TODO 增加S3 Assemble 客户端下载 接口 */}
            </div>
        </div>
    );
}
