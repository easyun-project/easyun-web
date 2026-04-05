import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import LoadbalancerCard from '@/components/resource/LoadbalancerCard';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function LoadbalancerPage() {
    const { list, loading } = useSelector((state: RootState) => state.loadbalancer);
    const [sortBy, setSortBy] = useState('Name');

    return (
        <ResourceListPage
            title="Load Balancer"
            loading={loading}
            items={list}
            sortOptions={[
                { label: 'Name', value: 'Name' },
                { label: 'Type', value: 'Type' },
            ]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="/resource/loadbalancer/add"
            addButtonText="Add Load Balancer"
        >
            {list?.map(elb => <LoadbalancerCard key={elb.elbId} {...elb} />)}
        </ResourceListPage>
    );
}
