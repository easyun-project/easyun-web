import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { listAllStaticIp } from '@/redux/staticipSlice';
import { postApiV1DatacenterStaticip } from '@/api-client';
import EipCard from '@/components/Datacenter/EipCard';
import { ResourceListPage } from '@/components/ui/resource-list-page';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Icon } from '@iconify/react';

export default function Network() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const eipInfos = useSelector((state: RootState) => state.staticip.list);
    const loading = useSelector((state: RootState) => state.staticip.loading);
    const dc = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
    const [creating, setCreating] = useState(false);
    const [sortBy, setSortBy] = useState('Name');

    useEffect(() => { if (!dc) navigate('/home'); }, []);

    const addButton = (
        <Button className="btn-yellow" disabled={creating} onClick={() => {
            setCreating(true);
            (postApiV1DatacenterStaticip as any)({ body: { dcName: dc } }).then(() => {
                dispatch(listAllStaticIp({ dc }));
                setCreating(false);
            });
        }}>
            {creating
                ? <Spinner className="size-4 mr-2" />
                : <Icon icon="carbon:add" className="mr-1" width="15" height="15" inline />}
            Add Static IP
        </Button>
    );

    return (
        <ResourceListPage
            title="Static IP"
            loading={loading}
            items={eipInfos}
            sortOptions={[{ label: 'Name', value: 'Name' }]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addButton={addButton}
        >
            {eipInfos?.map(item => <EipCard key={item.publicIp} {...item} />)}
        </ResourceListPage>
    );
}
