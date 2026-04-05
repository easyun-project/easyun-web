import React from 'react';
import { RouteTableInfo } from '@/constant/dataCenter';
import { ResourceCard } from '@/components/ui/resource-card';
import rtbIcon from '@@/src/assets/images/resource/res_aws_router.svg';

export default function RouteTableCard(props: RouteTableInfo) {
    const { tagName, rtbId, vpcId, routes } = props;
    return (
        <ResourceCard
            icon={<img src={rtbIcon} alt="Route Table" width="50" />}
            title={tagName}
            titleLink={rtbId}
            subtitle={rtbId}
            status={`routes: ${routes.length}`}
            actions={[
                { label: 'Manage', onClick: () => console.log('Manage') },
                { label: 'Delete', onClick: () => console.log('Delete'), danger: true },
            ]}
            footerLeft={vpcId}
        />
    );
}
