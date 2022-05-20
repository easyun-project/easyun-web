import React from 'react';
import { CheckOutlined, CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { Icon } from '@iconify/react';


export default function Properties(bucketData) {
    const handleSwtichChange = (key) => {
        return (checked) => {
            console.log('🚀 ~ file: Properties.tsx ~ line 7 ~ handleSwtichChange ~ key', key);
            console.log('🚀 ~ file: Properties.tsx ~ line 8 ~ return ~ checked', checked);
        };
    };
    return (
        <div>
            <div className='flex'>
                <div className='w-5/12'>
                    <p className='my-2 text-2xl'>Default encryption</p>
                    <p className='font-semibold text-gray-500'>Server-side encryption</p>
                    <p className='font-bold'>Amazon S3 master-key(SSE-S3)</p>
                    <div className='flex items-center my-3'>
                        <div>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleSwtichChange('aaa')}
                            />
                        </div>
                        <div className='ml-2'>
                            <p className='font-bold'>Encryption is enabled</p>
                            <p className='text-gray-500'>Automatically encrypt new objects stored in this bucket.</p>
                        </div>
                    </div>
                </div>
                <div className='w-7/12'>
                    <p className='my-2 text-2xl'>Object versioning</p>
                    <p className='font-semibold text-gray-500'>Enable versioning to store ervery change to your object as a version.Versioning can help you recover objects from accidental deletion or overwrite.</p>
                    <p className='mt-2 mb-1 font-semibold text-blue-500 cursor-pointer' onClick={() => { window.open('https://aws.amazon.com/cn/s3/?nc2=type_a'); }}>Learn more ablout versioning <Icon className='inline' icon="ri:share-box-fill" fr={undefined} /></p>
                    <div className='flex items-center my-3'>
                        <div>
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                onChange={handleSwtichChange('bbb')}
                            />
                        </div>
                        <div className='ml-2'>
                            <p className='font-bold'>Versioning is disabled</p>
                            <p className='text-gray-500'>Changed versions of your objects are not being stored.</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div>
                            <InfoCircleOutlined className='text-3xl text-green-700' />
                        </div>
                        <div className='ml-2'>
                            <p className='text-gray-500'>Each time an object is changed,it is saved as a version.</p>
                            <p className='text-gray-500'>Versions are stored in your bucket and consume your storage space.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
