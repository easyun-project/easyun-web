import React from 'react';
import bucketImage from '@/assets/images/resource/stbucket.png';
import { getDomain } from '@/views/Resource/StBucket/BucketManage/utils';
import { StBucketDetailModel } from '@/constant/storage';

export default function CBucketCard(props: StBucketDetailModel) {
    const { bucketBasic, bucketPermission } = props;
    return (
        <div className='flex'>
            <div className='flex p-4'>
                <div>
                    <img className='w-20' src={bucketImage} alt="stbucket.png" />
                </div>
                <div className='ml-5'>
                    <div className='text-2xl font-bold'>{bucketBasic.bucketId}</div>
                    <div className='text-gray-500'>{bucketPermission.status}</div>
                    <div className='text-gray-500'>Domain: {getDomain(bucketBasic.bucketId, bucketBasic.bucketRegion, false)}</div>
                </div>
            </div>
            <div>
                {/* TODO 增加S3 Assemble 客户端下载 接口 */}
            </div>
        </div>
    );
}
