import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DatabaseCard from '@/components/resource/DatabaseCard';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function DatabasePage() {
    const { dbInstanceList, loading } = useSelector((state: RootState) => state.database);
    const [sortBy, setSortBy] = useState('Name');

    return (
        <ResourceListPage
            title="Database"
            loading={loading}
            items={dbInstanceList}
            sortOptions={[
                { label: 'Name', value: 'Name' },
                { label: 'Engine', value: 'Engine' },
            ]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="/resource/database/add"
            addButtonText="Add Database"
        >
            {dbInstanceList?.map(db => <DatabaseCard key={db.dbiId} {...db} />)}
        </ResourceListPage>
    );
}
