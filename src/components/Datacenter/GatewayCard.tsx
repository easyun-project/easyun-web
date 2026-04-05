import React from 'react';
import { IntGatewayInfo, NatGatewayInfo } from '@/constant/dataCenter';
import { ResourceCard } from '@/components/ui/resource-card';
import igwIcon from '@@/src/assets/images/resource/res_aws_igw.svg';
import natgwIcon from '@@/src/assets/images/resource/res_aws_natgw.svg';

const defaultActions = [
    { label: 'Manage', onClick: () => console.log('Manage') },
    { label: 'Delete', onClick: () => console.log('Delete'), danger: true },
];

export function InternetGWCard(props: IntGatewayInfo) {
    const { igwId, state, vpcId, tagName } = props;
    return (
        <ResourceCard
            icon={<img src={igwIcon} alt="IGW" width="50" />}
            title={tagName}
            titleLink={igwId}
            subtitle={igwId}
            status={state}
            bgClass={state === 'available' ? 'bg-gray-200' : 'bg-amber-50'}
            actions={defaultActions}
            footerLeft={vpcId}
        />
    );
}

export function NatGWCrad(props: NatGatewayInfo) {
    const { natgwId, state, vpcId, connectType, createTime, tagName } = props;
    return (
        <ResourceCard
            icon={<img src={natgwIcon} alt="NAT GW" width="50" />}
            title={tagName}
            titleLink={natgwId}
            subtitle={natgwId}
            status={connectType}
            bgClass={state === 'available' ? 'bg-gray-200' : 'bg-amber-50'}
            actions={defaultActions}
            footerLeft={vpcId}
            footerRight={createTime}
        />
    );
}
