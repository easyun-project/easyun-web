import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { InternetGWCard } from '@/components/Datacenter/GatewayCard';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function index() {
    const igws = useSelector((state: RootState) => state.intgateway.list);
    const [sortBy, setSortBy] = useState('Name');

    return (
        <ResourceListPage
            title="Internet Gateway"
            items={igws}
            sortOptions={[
                { label: 'Name', value: 'Name' },
                { label: 'Zone', value: 'Zone' },
            ]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="add"
            addButtonText="Add Gateway"
        >
            {igws?.map(igw => <InternetGWCard key={igw.igwId} {...igw} />)}
        </ResourceListPage>
    );
}
