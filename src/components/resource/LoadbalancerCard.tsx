import React from 'react';
import { ElbModel } from '@/constant/loadbalancer';
import { ResourceCard } from '@/components/ui/resource-card';
import albIcon from '@@/src/assets/images/resource/res_aws_elb_alb.svg';
import nlbIcon from '@@/src/assets/images/resource/res_aws_elb_nlb.svg';

export default function LoadbalancerCard(props: ElbModel) {
    const { elbId, elbType, elbState, createTime, dnsName } = props;
    return (
        <ResourceCard
            icon={<img src={elbType === 'application' ? albIcon : nlbIcon} alt="LB" width="50" />}
            title={elbId}
            titleLink={elbId}
            subtitle={dnsName.split('.')[0]}
            status={elbState}
            actions={[
                { label: 'Manage', onClick: () => console.log('Manage') },
                { label: 'Delete', onClick: () => console.log('Delete'), danger: true },
            ]}
            footerLeft={elbType}
            footerRight={createTime}
        />
    );
}
