import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { DataCenterModel } from '@/constant/dataCenter';
import { getApiV1DatacenterTask, deleteApiV1Datacenter } from '@/api-client';
import { updateCurrentDC, getDatacenterSummary, listAllDataCenter } from '@/redux/dataCenterSlice';
import { listAllSubnet } from '@/redux/subnetSlice';
import { listAllRouteTable } from '@/redux/routeSlice';
import { listAllIntGateway } from '@/redux/intgatewaySlice';
import { listAllNatGateway } from '@/redux/natgatewaySlice';
import { listAllSecGroup } from '@/redux/secgroupSlice';
import { listAllStaticIp } from '@/redux/staticipSlice';
import { listAllServer } from '@/redux/serverSlice';
import { listAllBucket } from '@/redux/stbucketSlice';
import { listAllVolume } from '@/redux/stvolumeSlice';
import { listAllDatabase } from '@/redux/databaseSlice';
import { listAllLoadbalancer } from '@/redux/loadbalancerSlice';
import { ResourceCard } from '@/components/ui/resource-card';

export default function DataCenterCard(props: DataCenterModel) {
    const { dcName, vpcID, cidrBlock, regionCode } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const initDcManage = async () => {
        dispatch(updateCurrentDC(props) as any);
        dispatch(getDatacenterSummary({ dc: dcName }) as any);
        dispatch(listAllSubnet({ dc: dcName }));
        dispatch(listAllRouteTable({ dc: dcName }));
        dispatch(listAllIntGateway({ dc: dcName }));
        dispatch(listAllNatGateway({ dc: dcName }));
        dispatch(listAllSecGroup({ dc: dcName }));
        dispatch(listAllStaticIp({ dc: dcName }));
    };
    const initResource = async () => {
        dispatch(updateCurrentDC(props) as any);
        dispatch(listAllServer({ dc: dcName }));
        dispatch(listAllBucket({ dc: dcName }));
        dispatch(listAllVolume({ dc: dcName }));
        dispatch(listAllDatabase({ dc: dcName }));
        dispatch(listAllLoadbalancer({ dc: dcName }));
    };

    const handleDelete = async (params: { dcName: string; isForceDel?: boolean }) => {
        const toastId = toast.loading(`Deleting datacenter "${params.dcName}"...`);
        let task: any;
        try {
            task = await deleteApiV1Datacenter({ body: params as any }).then(({ data }) => data?.task as any);
        } catch {
            toast.error('Delete request failed', { id: toastId });
            return;
        }
        if (!task) { toast.error('Delete request failed', { id: toastId }); return; }
        if ('conflict' in task) {
            toast.dismiss(toastId);
            if (confirm(`${task.message}\n\nDo you want to force delete?`)) {
                handleDelete({ dcName: params.dcName, isForceDel: true });
            }
            return;
        }
        if (!task.taskId) { toast.error('No task ID returned', { id: toastId }); return; }
        const poll = setInterval(async () => {
            const result = await getApiV1DatacenterTask({ query: { id: task.taskId } }).then(({ data }) => data?.task as any);
            if (!result) { clearInterval(poll); toast.error('Cannot get task status', { id: toastId }); return; }
            if (result.status === 'SUCCESS') {
                clearInterval(poll);
                toast.success(`Datacenter "${params.dcName}" deleted`, { id: toastId });
                dispatch(listAllDataCenter());
            } else if (result.status === 'FAILURE') {
                clearInterval(poll);
                toast.error(result.description, { id: toastId });
            } else {
                toast.loading(result.description || 'In progress...', { id: toastId });
            }
        }, 2000);
    };

    return (
        <ResourceCard
            icon="ic:round-cloud-circle"
            title={dcName}
            subtitle={vpcID}
            actions={[
                { label: t('home.dcCard.menu.manage'), onClick: () => initDcManage().then(() => navigate('/datacenter')) },
                { label: t('home.dcCard.menu.resource'), onClick: () => initResource().then(() => navigate('/resource')) },
                { label: t('home.dcCard.menu.delete'), onClick: () => handleDelete({ dcName }), danger: true },
                { label: t('home.dcCard.menu.forceDelete'), onClick: () => handleDelete({ dcName, isForceDel: true }), danger: true },
            ]}
            footerLeft={cidrBlock}
            footerRight={regionCode}
        />
    );
}
