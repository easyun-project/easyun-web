import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SecGroupCard from '@/components/Datacenter/SecGroupCrad';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function index() {
    const { list, loading } = useSelector((state: RootState) => state.secgroup);
    const [sortBy, setSortBy] = useState('Name');

    return (
        <ResourceListPage
            title="Security Group"
            loading={loading}
            items={list}
            sortOptions={[{ label: 'Name', value: 'Name' }]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="add"
            addButtonText="Add Security Group"
        >
            {list?.map(sg => <SecGroupCard key={sg.sgId} {...sg} />)}
        </ResourceListPage>
    );
}
