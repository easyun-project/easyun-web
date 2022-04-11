import * as React from 'react';
import { RootState } from '@/redux/store';
import CStorageCard from '@/components/Logic/CStorageCard/StBucketCard';
import { CButton } from '@/components/Common/CButton';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Divider, Badge, Card, Statistic, Spin, Space } from 'antd';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateStorage, listAllBucket } from '@/redux/storageSlice';
import bucketService from '@/service/stBucketService';
// import { UserModel } from '@/constant/user';

import stbucket from '@@/src/assets/images/stbucket.png';
import stdisk from '@@/src/assets/images/stdisk.png';

const WithoutStorage = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className={classnames('flex', 'flex-col', 'justify-center', 'items-center', 'm-10')}>
            <div className={classnames('text-3xl')}> Store your data on Cloud.</div>
            <div className={classnames('text-gray-700', 'my-2')}>
                Storage resource allow you to increase the amount of data storage availiable to your AWS
                Cloud resources.
            </div>
            <div className={classnames('flex', 'flex-row')}>
                <div
                    className={classnames(
                        'flex',
                        'flex-row',
                        'mx-5',
                        'max-w-lg',
                        'rounded-lg',
                        'border-2',
                        'border-gray-500',
                        'border-dotted'
                    )}
                >
                    <img src={stbucket} alt="stbucket.png" className={classnames('w-40', 'h-40')} />                    
                    <div>
                        <div className={classnames('font-bold')}>Bucket</div>
                        <div>
                            A bucket is a cloud storage resource availiable in the Amazon Lightsail object storage
                            service. Buckets are used to store objects, which consist of data and its descriptive
                            metadata.
                        </div>
                        <div className={classnames('text-blue-500')}>
                            <a href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                                Learn more about buckets
                                <Icon
                                    className={classnames('inline-block', 'mx-1', 'text-blue-500')}
                                    icon="akar-icons:link-out"
                                    width="20"
                                    height="20"
                                    fr={undefined}
                                />
                            </a>
                        </div>
                        <CButton
                            click={() => {
                                navigate('/resource/bucket/add');
                            }}
                            classes={classnames(
                                'bg-yellow-550',
                                'text-white',
                                'rounded-3xl',
                                'h-10',
                                'w-32',
                                'px-5',
                                'my-5'
                            )}
                        >
                            Add Bucket
                        </CButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WithStorage = (props): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div>
            <div className={classnames('flex', 'flex-row', 'justify-between', 'items-center')}>
                <div className={classnames('text-center')}>Sort by Type</div>
                <div>
                    <CButton
                        click={() => {
                            navigate('/resource/bucket/add');
                        }}
                        classes={classnames(
                            'bg-yellow-550',
                            'text-white',
                            'rounded-3xl',
                            'h-10',
                            'w-32',
                            'px-5',
                            'm-5'
                        )}
                    >
                        Add Bucket
                    </CButton>
                </div>
            </div>

            <div className={classnames('flex', 'flex-wrap', 'justify-items-center')}>
                {props.storageList.map((item) => {
                    return <CStorageCard key={item.bktName} {...item} />;
                })}
            </div>
        </div>
    );
};

const BucketPage = (): JSX.Element => {
    const [storageLoading, changeStorageLoading] = useState(true);
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const dispatch = useDispatch();

    
    useEffect(() => {
        bucketService.listBucket({ dc:dcName }).then((data: any) => {
            changeStorageLoading(false);
            dispatch(updateStorage(data));
            // dispatch(updateStorage(data.detail[0].bucketList));
        },
        () => {
            changeStorageLoading(false);
            alert('网络错误，请刷新');
        }
        );
    }, []);

    const storageSate = useSelector((state: RootState) => state.storage);
    const bucketList = storageSate.storageList;
    // const bktLoading = storageSate.loading;

    return (
        <Spin spinning={storageLoading} tip="Loading...">
        <div>
            {bucketList?.length === 0 ? <WithoutStorage /> : <WithStorage storageList={bucketList} />}
        </div>
        </Spin>
    )

    // if (storageLoading) {
    //     return (
    //         <CPartialLoading classes={classnames('h-96')} />
    //     );
    // }
    // else {
    //     return (
    //         <div>
    //             {bucketList?.length === 0 ? <WithoutStorage /> : <WithStorage storageList={bucketList} />}
    //         </div>
    //     );
    // }
};

export default BucketPage;