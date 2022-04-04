import React from 'react';
import NotFound from '@/views/NotFound';
import { NoResource } from '@/views/Resource';
// Resource视图
import ResourceOverview from '@/views/Resource/Overview';
import AddServer from '@/views/Resource/Server/AddServer';
import AddBucket from '@/views/Resource/Storage/AddBucket';
import AddDisk from '@/views/Resource/Storage/AddDisk';
import ServerList from '@/views/Resource/Server';
import ServerDetail from '@/views/Resource/Server/ServerDetail';
import StoragePage from '@/views/Resource/Storage';
import BucketManage from '@/views/Resource/Storage/BucketManage';
import DatabasePage from '@/views/Resource/Database';

export default [
    {
        path:'overview',
        element:<ResourceOverview />
    },
    {
        path:'server/:serverId',
        element:<ServerDetail />
    },
    {
        path:'server',
        element:<ServerList />
    },
    {
        path:'server/add',
        element:<AddServer />
    },
    {
        path:'storage',
        element:<StoragePage />
    },
    {
        path:'storage/object/:bktId',
        element:<BucketManage />
    },
    {
        path:'storage/object/add',
        element:<AddBucket />
    },
    {
        path:'storage/block/add',
        element:<AddDisk />
    },
    {
        path:'database',
        element:<DatabasePage />
    },
    {
        path:'loadbalancer',
        element:<NoResource resourceName={'loadbalancer'} buttonName={'Add Load Balancer'} routePath={'/loadbalancer/add'} />
    },
    {
        path:'backup',
        element:<NoResource resourceName={'backup'} buttonName={'Add Backup'} routePath={'/backup/add'} />
    },
    {
        path:'*',
        element:<NotFound />
    }
];