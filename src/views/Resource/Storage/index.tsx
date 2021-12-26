import * as React from 'react';
// import { CHeader } from '@/components/Logic/CHeader';
// import { CFooter } from '@/components/Logic/CFooter';
import { RootState } from '@/redux/store';
import CStorageCard from '@/components/Logic/CStorageCard';
import { CButton } from '@/components/Common/CButton';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateStorage } from '@/redux/storageSlice';
import bucketManage from '@/service/addBucket';



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
                    <img
                        src="../src/assets/images/stbucket.png"
                        alt="stbucket.png"
                        className={classnames('w-40', 'h-40')}
                    />
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
                                navigate('/resource/addBucket');
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
                    <img
                        src="../src/assets/images/stdisk.png"
                        alt="stdisk.png"
                        className={classnames('w-40', 'h-40')}
                    />
                    <div>
                        <div className={classnames('font-bold')}>Disk</div>
                        <div>
              Disks are storage volumes that you can mount as hard drivers on your Lightsail
              instances. A disk persists independently from the life of the instance it is attached
              to.
                        </div>
                        <div className={classnames('text-blue-500')}>
                            <a href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                Learn more about Disk
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
                                navigate('/resource/addDisk');
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
              Add Disk
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
                            navigate('/resource/addBucket');
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
                    <CButton
                        click={() => {
                            navigate('/resource/addDisk');
                        }}
                        classes={classnames(
                            'cursor-not-allowed',
                            'bg-gray-500',
                            'text-white',
                            'rounded-3xl',
                            'h-10',
                            'w-32',
                            'px-5',
                            'm-5'
                        )}
                    >
            Add Disk
                    </CButton>
                    <CButton
                        click={() => {
                            navigate('/resource/addDisk');
                        }}
                        classes={classnames(
                            'cursor-not-allowed',
                            'bg-gray-500',
                            'text-white',
                            'rounded-3xl',
                            'h-10',
                            'w-32',
                            'px-5',
                            'm-5'
                        )}
                    >
            Add NAS
                    </CButton>
                </div>
            </div>

            <div className={classnames('flex','flex-wrap','justify-items-center')}>
                {props.storageList.map((storageInfo) => {
                    return <CStorageCard key={storageInfo.Name} {...storageInfo}/>;
                })}
            </div>
        </div>
    );
};

const Storage = (): JSX.Element => {
    const [storageLoading, changeStorageLoading] = useState(true);
    const dispatch = useDispatch();
    // const storageState = useSelector((state: RootState) => {
    //     return state.storage;
    // });

    const token = useSelector((state: RootState) => {
        return state.user.user.token;
    });

    // const storageList = [
    //     { Name: 'string1',
    //         bucketStatus: 'string',
    //         bucketRegion: 'string' },
    //     { Name: 'string2',
    //         bucketStatus: 'string',
    //         bucketRegion: 'string' },
    //     { Name: 'string3',
    //         bucketStatus: 'string',
    //         bucketRegion: 'string' },
    //     { Name: 'string4',
    //         bucketStatus: 'string',
    //         bucketRegion: 'string' },
    //     { Name: 'string5',
    //         bucketStatus: 'string',
    //         bucketRegion: 'string' }
    // ];
    useEffect(()=>{
        bucketManage.listBucket(token).then((data:any)=>{
            changeStorageLoading(false);
            dispatch(updateStorage(data.detail[0].bucketList));
        },
        ()=>{
            changeStorageLoading(false);
            alert('网络错误，请刷新');
        }
        );
    },[]);

    const storageList = useSelector((state: RootState) => {
        return state.storage.storageList;
    });

    if (storageLoading) {
        return (
            <CPartialLoading classes={classnames('h-96')}/>
        );}
    else {
        return (
            <div>
                {storageList.length === 0 ? <WithoutStorage /> : <WithStorage storageList={storageList}/>}
            </div>
        );}
};

export default Storage;
