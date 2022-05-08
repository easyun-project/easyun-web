import React from 'react';
import NotFound from '@/views/NotFound';
import { NoResource } from '@/views/Resource';
// Resource视图
import RescOverview from '@/views/Resource/Overview';
import AddServer from '@/views/Resource/Server/AddServer';
import AddBucket from '@/views/Resource/StBucket/AddBucket';
import AddVolume from '@/views/Resource/StVolume/AddVolume';
import ServerList from '@/views/Resource/Server';
import ServerDetail from '@/views/Resource/Server/ServerDetail';
import VoluemPage from '@/views/Resource/StVolume';
import BucketPage from '@/views/Resource/StBucket';
import BucketManage from '@/views/Resource/StBucket/BucketManage';
import VolumeManage from '@/views/Resource/StVolume/VolumeManage';
import DatabasePage from '@/views/Resource/Database';

export default [
    {
        path: 'overview',
        element: <RescOverview />
    },
    {
        path: 'server/:serverId',
        element: <ServerDetail />
    },
    {
        path: 'server',
        element: <ServerList />
    },
    {
        path: 'server/add',
        element: <AddServer />
    },
    {
        path: 'bucket',
        element: <BucketPage />
    },
    {
        path: 'object/:bktId',
        element: <BucketManage />
    },
    {
        path: 'object/add',
        element: <AddBucket />
    },
    {
        path: 'volume',
        element: <VoluemPage />
    },
    {
        path: 'volume/:volumeId',
        element: <VolumeManage />
    },
    {
        path: 'volume/add',
        element: <AddVolume />
    },
    {
        path: 'database',
        element: <DatabasePage />
    },
    {
        path: 'loadbalancer',
        element: <NoResource resourceName={'loadbalancer'} buttonName={'Add Load Balancer'} routePath={'/loadbalancer/add'} />
    },
    {
        path: 'backup',
        element: <NoResource resourceName={'backup'} buttonName={'Add Backup'} routePath={'/backup/add'} />
    },
    {
        path: '*',
        element: <NotFound />
    }
];