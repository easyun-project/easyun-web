import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Dropdown, notification, Modal } from 'antd';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { DataCenterModel } from '@/constant/dataCenter';
import { postApiV1Datacenter, getApiV1DatacenterTask, getApiV1DatacenterList, deleteApiV1Datacenter } from '@/api-client';
import { deleteDataCenter, updateCurrentDC, getDatacenterSummary, listAllDataCenter } from '@/redux/dataCenterSlice';
import { listAllSubnet } from '@/redux/subnetSlice';
import { listAllRouteTable } from '@/redux/routeSlice';
import { listAllIntGateway } from '@/redux/intgatewaySlice';
import { listAllNatGateway } from '@/redux/natgatewaySlice';
import { listAllSecGroup } from '@/redux/secgroupSlice';
import { listAllStaticIp } from '@/redux/staticipSlice';
import { getCostSummary, getResourceSummary } from '@/redux/dataCenterSlice';
import { getServerList, listAllServer } from '@/redux/serverSlice';
import { listAllBucket } from '@/redux/stbucketSlice';
import { listAllVolume } from '@/redux/stvolumeSlice';
import { listAllDatabase } from '@/redux/databaseSlice';
import { listAllLoadbalancer } from '@/redux/loadbalancerSlice';


export default function DataCenterCard(props: DataCenterModel) {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { dcName, vpcID, cidrBlock, regionCode } = props;
    // this function is used to initialize a datacenter
    // use async to make sure the requests are not lost
    const initDcManage = async () => {
        dispatch(updateCurrentDC(props));
        dispatch(getDatacenterSummary({ dc: dcName }));
        dispatch(listAllSubnet({ dc: dcName }));
        dispatch(listAllRouteTable({ dc: dcName }));
        dispatch(listAllIntGateway({ dc: dcName }));
        dispatch(listAllNatGateway({ dc: dcName }));
        dispatch(listAllSecGroup({ dc: dcName }));
        dispatch(listAllStaticIp({ dc: dcName }));
        dispatch(getServerList({ dc: dcName }));
    };
    const initResource = async () => {
        dispatch(updateCurrentDC(props));
        dispatch(getCostSummary({ dc: dcName }));
        dispatch(getResourceSummary({ dc: dcName }));
        dispatch(listAllServer({ dc: dcName }));
        dispatch(listAllVolume({ dc: dcName }));
        dispatch(listAllBucket({ dc: dcName }));
        dispatch(listAllDatabase({ dc: dcName }));
        dispatch(listAllLoadbalancer({ dc: dcName }));
    };
    //删除DC并轮询任务状态
    const handleDelete = async (params: { dcName: string; isForceDel?: boolean }) => {
        notification.open({
            placement: 'bottomRight',
            key: 'dc-delete',
            message: 'Deleting',
            description: `Deleting datacenter "${params.dcName}"...`,
            duration: 0,
        });
        let task: any;
        try {
            task = await deleteApiV1Datacenter({ body: params as any }).then(({ data }) => data?.task as any);
        } catch {
            notification.error({ key: 'dc-delete', message: 'Failed', description: 'Delete request failed' });
            return;
        }
        if (!task) {
            notification.error({ key: 'dc-delete', message: 'Failed', description: 'Delete request failed' });
            return;
        }
        // 409 conflict — ask user to force delete
        if ('conflict' in task) {
            notification.destroy('dc-delete');
            Modal.confirm({
                title: 'Resource Conflict',
                content: `${task.message}\n\nDo you want to force delete?`,
                okText: 'Force Delete',
                okButtonProps: { danger: true },
                onOk: () => handleDelete({ dcName: params.dcName, isForceDel: true }),
            });
            return;
        }
        if (!task.taskId) {
            notification.error({ key: 'dc-delete', message: 'Failed', description: 'No task ID returned' });
            return;
        }
        const poll = setInterval(async () => {
            const result = await getApiV1DatacenterTask({ query: { id: task.taskId } }).then(({ data }) => data?.task as any);
            if (!result) {
                clearInterval(poll);
                notification.error({ key: 'dc-delete', message: 'Error', description: 'Cannot get task status' });
                return;
            }
            if (result.status === 'SUCCESS') {
                clearInterval(poll);
                notification.success({ key: 'dc-delete', message: 'Deleted', description: `Datacenter "${params.dcName}" deleted successfully` });
                dispatch(listAllDataCenter());
            } else if (result.status === 'FAILURE') {
                clearInterval(poll);
                notification.error({ key: 'dc-delete', message: 'Failed', description: result.description });
            } else {
                notification.open({
                    placement: 'bottomRight',
                    key: 'dc-delete',
                    message: 'Deleting',
                    description: result.description || 'In progress...',
                    duration: 0,
                });
            }
        }, 2000);
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
                onClick={() => handleDelete({ dcName })}
            >
                {t('home.dcCard.menu.delete')}
            </Menu.Item>
            <Menu.Item
                danger
                key="forceDel"
                onClick={() => handleDelete({ dcName, isForceDel: true })}
            >
                {t('home.dcCard.menu.forceDelete')}
            </Menu.Item>
        </Menu>
    );

    return (
        <div
            className={"flex flex-col bg-gray-200 rounded-border w-96 p-2"}
        >
            <div className={"flex mb-2"}>
                {/* <img
                    src={stbucket}
                    alt="stbucket.png"
                    className={"w-12 h-12"}
                /> */}
                <Icon icon="ic:round-cloud-circle" color="#e9862e" width="60" />
                <div className='grow ml-2' >
                    <a className={"text-blue-600 text-lg"} onClick={() => { initResource().then(() => navigate('/resource')); }}>{dcName}</a>
                    <div className={"text-xs text-gray-500"}>{vpcID}</div>
                </div>
                <Dropdown overlay={menu}>
                    <Icon
                        icon="fluent:more-vertical-20-filled"
                        width="20"
                        fr={undefined}
                        className={"cursor-pointer hover:text-yellow-550"}
                    />
                </Dropdown>
            </div>
            <div
                className={"flex justify-between border-t-2 border-gray-300 border-dashed mx-2"}
            >
                <div className={"text-xs text-gray-500"}>{cidrBlock}</div>
                <div className={"text-xs text-gray-500"}>{regionCode}</div>
            </div>
        </div>
    );
}
