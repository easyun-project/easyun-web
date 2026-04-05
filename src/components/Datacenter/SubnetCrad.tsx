import React from 'react';
import { SubnetInfo } from '@/constant/dataCenter';
import { ResourceCard } from '@/components/ui/resource-card';

export default function SubnetCard(props: SubnetInfo) {
    const { subnetType, tagName, subnetId, cidrBlock, availableIpNum, subnetAz } = props;

    return (
        <ResourceCard
            icon={subnetType === 'public' ? 'gis:globe-alt-o' : 'teenyicons:lock-circle-outline'}
            title={tagName}
            titleLink={subnetId}
            subtitle={subnetId}
            status={subnetType}
            bgClass={subnetType === 'public' ? 'bg-green-50' : 'bg-amber-50'}
            actions={[
                { label: 'Manage', onClick: () => console.log('Manage') },
                { label: 'Delete', onClick: () => console.log('Delete'), danger: true },
            ]}
            footerLeft={`CIDR:${cidrBlock} [${availableIpNum}/251]`}
            footerRight={subnetAz}
        />
    );
}
