import React, { useEffect, useState } from 'react';
import { CheckOutlined, CloseOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Spin, Empty, Switch } from 'antd';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


export default function Properties() {
    //hooks
    const { t } = useTranslation();
    //redux state
    const { currentBucket } = useSelector((state:RootState)=>state.storage);
    const initEncryption = (typeof currentBucket === 'string' ? undefined : currentBucket.bucketProperty.isEncryption);
    const initVersioning = (typeof currentBucket === 'string' ? undefined : currentBucket.bucketProperty.isVersioning);
    //component state
    const [isEncryption, setIsEncryption] = useState(initEncryption);
    const [isVersioning, setIsVersioning] = useState(initVersioning);
    //life cycle
    useEffect(()=>{
        console.log('🚀 ~ file: Properties.tsx ~ line 7 ~ handleSwtichChange ~ key');
        console.log('🚀 ~ file: Properties.tsx ~ line 8 ~ return ~ checked');
    }, [isEncryption, isVersioning]);
    return (
        <Spin spinning={currentBucket === 'loading'}>
            <div className='flex'>
                <div className='w-5/12'>
                    <p className='my-2 text-2xl'>{t('bucketManageProperties.encryptionTitle')}</p>
                    <p className='font-semibold text-gray-500'>Server-side encryption</p>
                    <p className='font-bold'>Amazon S3 master-key(SSE-S3)</p>
                    {currentBucket === 'failed'
                        ? <Empty/>
                        : <div className='flex items-center my-3'>
                            <div>
                                <Switch
                                    checked={isEncryption}
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    onChange={()=>setIsEncryption(!isEncryption)}
                                />
                            </div>
                            <div className='ml-2'>
                                <p className='font-bold'>{isEncryption ? t('bucketManageProperties.encryptionOnTitle') : t('bucketManageProperties.encryptionOffTitle')}</p>
                                <p className='text-gray-500'>{isEncryption ? t('bucketManageProperties.encryptionOnTip') : t('bucketManageProperties.encryptionOffTip')}</p>
                            </div>
                        </div>}
                </div>
                <div className='w-7/12'>
                    <p className='my-2 text-2xl'>{t('bucketManageProperties.versioningTtile')}</p>
                    <p className='font-semibold text-gray-500'>{t('bucketManageProperties.versioningTip')}</p>

                    <a className='text-blue-500' href="https://aws.amazon.com/cn/s3/?nc2=type_a" target="_blank" rel="noreferrer">
                        {t('bucketManageProperties.versioningHref')}
                        <Icon fr={undefined}
                            icon="akar-icons:link-out"
                            className='inline-block mx-1 text-blue-500'
                            width="15"
                            height="15"
                        />
                    </a>
                    {currentBucket === 'failed'
                        ? <Empty/>
                        : <div className='flex items-center my-3'>
                            <div>
                                <Switch
                                    checked={isVersioning}
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    onChange={()=>setIsVersioning(!isVersioning)}
                                />
                            </div>
                            <div className='ml-2'>
                                <p className='font-bold'>{isVersioning ? t('bucketManageProperties.versioningOnTitle') : t('bucketManageProperties.versioningOffTitle')}</p>
                                <p className='text-gray-500'>{isVersioning ? t('bucketManageProperties.versioningOnTip') : t('bucketManageProperties.versioningOffTip')}</p>
                            </div>
                        </div>}

                    <div className='flex items-center'>
                        <div>
                            <InfoCircleOutlined className='text-3xl text-green-700' />
                        </div>
                        <div className='ml-2'>
                            <p className='text-gray-500'>{t('bucketManageProperties.versioningInfoTitle')}</p>
                            <p className='text-gray-500'>{t('bucketManageProperties.versioningInfoTip')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
}
