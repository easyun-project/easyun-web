import React from 'react';
import bucketImage from '@/assets/images/stbucket.png';
import { StorageCardInfo } from '../CStorageCard';
import { getDomain } from '@/views/Resource/Storage/BucketManage/utils';

export default function BucketCard({ bktDetail }: { bktDetail: StorageCardInfo }) {
    const { bktName, bktRegion, stType } = bktDetail;
    console.log('🚀 ~ file: index.tsx ~ line 8 ~ CBucketCard ~ props', bktDetail);
    return (
        <div className='flex'>
            <div className='flex p-4'>
                <div>
                    <img className='w-20' src={bucketImage} alt="stbucket.png" />
                </div>
                <div className='ml-5'>
                    <div className='font-bold text-2xl'>{bktName}</div>
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