import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CStBucketCard from '@/components/Logic/CStorageCard/StBucketCard';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function BucketPage() {
    const { loading, bucketList } = useSelector((state: RootState) => state.stbucket);
    const [sortBy, setSortBy] = useState('Type');

    return (
        <ResourceListPage
            title="Bucket"
            loading={loading}
            items={bucketList}
            sortOptions={[{ label: 'Type', value: 'Type' }]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="/resource/object/add"
            addButtonText="Add Bucket"
            emptyTitle="Store your data on Cloud."
            emptyDescription="Storage resources allow you to increase the amount of data storage available to your AWS Cloud resources."
        >
            {bucketList?.map(item => <CStBucketCard key={item.bucketId} {...item} />)}
        </ResourceListPage>
    );
}
