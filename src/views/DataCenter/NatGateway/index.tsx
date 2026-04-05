import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { NatGWCrad } from '@/components/Datacenter/GatewayCard';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function index() {
    const natgws = useSelector((state: RootState) => state.natgateway.list);
    const [sortBy, setSortBy] = useState('Name');

    return (
        <ResourceListPage
            title="NAT Gateway"
            items={natgws}
            sortOptions={[
                { label: 'Name', value: 'Name' },
                { label: 'Zone', value: 'Zone' },
            ]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="add"
            addButtonText="Add NAT Gateway"
        >
            {natgws?.map(natgw => <NatGWCrad key={natgw.natgwId} {...natgw} />)}
        </ResourceListPage>
    );
}
