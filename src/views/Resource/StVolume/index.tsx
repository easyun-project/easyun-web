import * as React from 'react';
import { RootState } from '@/redux/store';
import CStVolumeCard from '@/components/Logic/CStorageCard/StVolumeCard';
import { CButton } from '@/components/Common/CButton';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Divider, Badge, Card, Statistic, Spin, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listAllVolume, updateVolumeList } from '@/redux/storageSlice';
import volumeManage from '@/service/stVolumeService';
import stdisk from '@@/src/assets/images/stdisk.png';
import { StVolumeModel, VolumeBasic } from '@/constant/storage';


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
                        src={stdisk}
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
                                navigate('/resource/volume/add');
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
                        Add Volume
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
                            navigate('/resource/volume/add');
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
                        Add Volume
                    </CButton>
                </div>
            </div>

            <div className={classnames('flex', 'flex-wrap', 'justify-items-center')}>
                {props.storageList.map((item) => {
                    return <CStVolumeCard key={item.volumeBasic.volumeId} {...item.volumeBasic} />;
                })}
            </div>
        </div>
    );
};

const VoluemPage = (): JSX.Element => {
    // const [storageLoading, changeStorageLoading] = useState(true);
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const dispatch = useDispatch();
    const storageSate = useSelector((state: RootState) => state.storage);
    const volumeList = storageSate.volumeList;
    const storageLoading = storageSate.loading;

    useEffect(() => {
        const params = {
            dc: dcName
        };
        dispatch(listAllVolume(params));
    }, []);



    return (
        //volume列表还没改好，先用空白页顶着
        <div> <WithoutStorage /> </div>
        // <Spin spinning={storageLoading} tip="Loading...">
        // <div>
        //     {volumeList?.length === 0 ? <WithoutStorage /> : <WithStorage storageList={volumeList} />}
        // </div>
        // </Spin>
    )

};

export default VoluemPage;
