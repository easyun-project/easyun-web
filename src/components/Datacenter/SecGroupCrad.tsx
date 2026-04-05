import React from 'react';
import { SecurityGroupInfo } from '@/constant/dataCenter';
import { ResourceCard } from '@/components/ui/resource-card';

export default function SecGroupCard(props: SecurityGroupInfo) {
    const { sgName, sgId, ibPermissions } = props;

    return (
        <ResourceCard
            icon="material-symbols:shield-outline"
            title={sgName}
            titleLink={sgId}
            subtitle={sgId}
            status={undefined}
            actions={[
                { label: 'Manage', onClick: () => console.log('Manage') },
                { label: 'Delete', onClick: () => console.log('Delete'), danger: true },
            ]}
            footerLeft={`${ibPermissions?.length || 0} inbound rules`}
        />
    );
}
