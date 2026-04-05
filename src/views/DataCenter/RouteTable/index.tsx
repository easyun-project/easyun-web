import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import RouteTableCard from '@/components/Datacenter/RouteTableCard';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function index() {
    const { list, loading } = useSelector((state: RootState) => state.route);
    const [sortBy, setSortBy] = useState('Name');

    return (
        <ResourceListPage
            title="Route Table"
            loading={loading}
            items={list}
            sortOptions={[{ label: 'Name', value: 'Name' }]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="add"
            addButtonText="Add Route Table"
        >
            {list?.map(route => <RouteTableCard key={route.rtbId} {...route} />)}
        </ResourceListPage>
    );
}
