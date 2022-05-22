import React from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@@/tailwindcss-classnames';
import { Menu, Dropdown, notification } from 'antd';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { DataCenterModel } from '@/constant/dataCenter';
import { deleteDataCenter, updateCurrentDC, getDatacenterSummary, getDataCenterEip, listAllDataCenter } from '@/redux/dataCenterSlice';
import { useDispatch } from 'react-redux';
import { getDataCenterSecgroup, getDataCenterSubnet } from '@/redux/dataCenterSlice';
import { getCostSummary, getResourceSummary } from '@/redux/resourceSlice';
import { getServerList, listAllServer } from '@/redux/serverSlice';
import { listAllBucket, listAllVolume } from '@/redux/storageSlice';


export default function DataCenterCard(props: DataCenterModel) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dcName, vpcCidr, dcRegion, vpcID } = props;
    // this function is used to initialize a datacenter
    // use async to make sure the requests are not lost
    const initDcManage = async () => {
        dispatch(updateCurrentDC(props));
        dispatch(getDatacenterSummary({ dc: dcName }));
        dispatch(getDataCenterSecgroup({ dc: dcName }));
        dispatch(getDataCenterEip({ dc: dcName }));
        dispatch(getDataCenterSubnet({ dc: dcName }));
        dispatch(getServerList({ dc: dcName }));
    };
    const initResource = async () => {
        dispatch(updateCurrentDC(props));
        dispatch(getCostSummary({ dc: dcName }));
        dispatch(getResourceSummary({ dc: dcName }));
        dispatch(listAllServer({ dc: dcName }));
        dispatch(listAllVolume({ dc: dcName }));
        dispatch(listAllBucket({ dc: dcName }));
    };
    //fix-me: 在通知窗口提示Datacenter删除状态
    const openNotification = (placement) => {
        notification.open({
            placement,
            key : 'updatable',
            message: 'Start',
            description: 'Start deleting Datacenter.',
        });
        setTimeout(() => {
            notification.open({
                placement,
                key : 'updatable',
                message: 'Deleting',
                description: 'Deleting the Datacenter.',
            });
        }, 1000);
        dispatch(listAllDataCenter());
    };
    const menu = (
        <Menu>
            <Menu.Item key="manage" onClick={() => {
                initDcManage().then(() => navigate('/datacenter'));
            }}>
                {t('home.dcCard.menu.manage')}
            </Menu.Item>
            <Menu.Item key="resource" onClick={() => {
                initResource().then(() => navigate('/resource'));
            }}>
                {t('home.dcCard.menu.resource')}
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() => {
                    openNotification('bottomRight');
                    dispatch(deleteDataCenter({ dcName: dcName }));
                    navigate('/home');
                }}
            >
                {t('home.dcCard.menu.delete')}
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() => {
                    openNotification('bottomRight');
                    dispatch(deleteDataCenter({ dcName: dcName, isForceDel: true }));
                    navigate('/home');
                }}
            >
                {t('home.dcCard.menu.forceDelete')}
            </Menu.Item>
        </Menu>
    );

    return (
        <div
            className={classnames(
                'flex',
                'flex-col',
                'bg-gray-200',
                'rounded-border',
                'w-96',
                'p-2'
            )}
        >
            <div className={classnames('flex', 'mb-2')}>
                {/* <img
                    src={stbucket}
                    alt="stbucket.png"
                    className={classnames('w-12', 'h-12')}
                /> */}
                <Icon icon="ic:round-cloud-circle" color="#e9862e" width="60" />
                <div className='grow ml-2' >
                    <a className={classnames('text-blue-600', 'text-lg')} onClick={() => { initResource().then(() => navigate('/resource')); }}>{dcName}</a>
                    <div className={classnames('text-xs', 'text-gray-500')}>{vpcID}</div>
                </div>
                <Dropdown overlay={menu}>
                    <Icon
                        icon="fluent:more-vertical-20-filled"
                        width="20"
                        fr={undefined}
                        className={classnames('cursor-pointer', 'hover:text-yellow-550')}
                    />
                </Dropdown>
            </div>
            <div
                className={classnames(
                    'flex',
                    'justify-between',
                    'border-t-2',
                    'border-gray-300',
                    'border-dashed',
                    'mx-2'
                )}
            >
                <div className={classnames('text-xs', 'text-gray-500')}>{vpcCidr}</div>
                <div className={classnames('text-xs', 'text-gray-500')}>{dcRegion}</div>
            </div>
        </div>
    );
}