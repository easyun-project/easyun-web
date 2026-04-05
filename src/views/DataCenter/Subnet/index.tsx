import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SubnetCard from '@/components/Datacenter/SubnetCrad';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function index() {
    const subnets = useSelector((state: RootState) => state.subnet.list);
    const [sortBy, setSortBy] = useState('Name');

    return (
        <ResourceListPage
            title="Subnet"
            items={subnets}
            sortOptions={[
                { label: 'Type', value: 'Type' },
                { label: 'Name', value: 'Name' },
                { label: 'Zone', value: 'Zone' },
            ]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="add"
            addButtonText="Add New Subnet"
        >
            {subnets?.map(subnet => <SubnetCard key={subnet.subnetId} {...subnet} />)}
        </ResourceListPage>
    );
}
