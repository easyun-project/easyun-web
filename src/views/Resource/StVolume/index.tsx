import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CStVolumeCard from '@/components/Logic/CStorageCard/StVolumeCard';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function VolumePage() {
    const { volumeList, loading } = useSelector((state: RootState) => state.stvolume);
    const [sortBy, setSortBy] = useState('Type');

    return (
        <ResourceListPage
            title="Volume"
            loading={loading}
            items={volumeList}
            sortOptions={[{ label: 'Type', value: 'Type' }]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="/resource/volume/add"
            addButtonText="Add Volume"
            emptyTitle="Store your data on Cloud."
            emptyDescription="Disks are storage volumes that you can mount as hard drives on your instances."
        >
            {volumeList?.map(vol => <CStVolumeCard key={vol.volumeId} {...vol} />)}
        </ResourceListPage>
    );
}
