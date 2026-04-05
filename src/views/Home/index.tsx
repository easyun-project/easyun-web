import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import type { AppDispatch } from '@/redux/store';
import Nodc from './Nodc';
import DataCenterCard from '@/components/Datacenter/DataCenterCard';
import { listAllDataCenter } from '@/redux/dataCenterSlice';
import { ResourceListPage } from '@/components/ui/resource-list-page';

export default function Home(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const [sortBy, setSortBy] = useState('Name');
    const dataCenterList = useSelector((state: RootState) => state.dataCenter.list);
    const [loading, setLoading] = useState(true);

    useEffect(() => { dispatch(listAllDataCenter()).finally(() => setLoading(false)); }, []);

    const orderKey = { Name: 'dcName', CreateDate: 'createDate', VPC: 'vpcID', Region: 'regionCode' }[sortBy] || 'dcName';
    const sorted = dataCenterList?.slice().sort((a: any, b: any) => (b[orderKey] || '').localeCompare(a[orderKey] || ''));

    return (
        <ResourceListPage
            title={t('home.title.selectDc')}
            loading={loading}
            items={dataCenterList}
            sortOptions={[
                { label: t('home.sortMenu.name'), value: 'Name' },
                { label: t('home.sortMenu.createdate'), value: 'CreateDate' },
                { label: t('home.sortMenu.vpc'), value: 'VPC' },
                { label: t('home.sortMenu.region'), value: 'Region' },
            ]}
            sortBy={sortBy}
            onSortChange={setSortBy}
            addPath="/datacenter/add"
            addButtonText={t('home.addButton')}
            emptyTitle=""
        >
            {!sorted?.length
                ? <Nodc />
                : sorted.map((item: any) => <DataCenterCard key={item.dcName} {...item} />)}
        </ResourceListPage>
    );
}
