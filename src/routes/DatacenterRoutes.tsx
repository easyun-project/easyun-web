import React from 'react';
import NotFound from '@/views/NotFound';
import { NoResource } from '@/views/Resource';
//datacenter视图
import DataCenterOverview from '@/views/DataCenter/Overview';
import AddDataCenter from '@/views/DataCenter/Add';
import AddDcResult from '@/views/DataCenter/Add/result';
import Network from '@/views/DataCenter/Network';
import EipDetail from '@/views/DataCenter/Network/EipDetail';
import Subnet from '@/views/DataCenter/Subnet';
import SubnetDetail from '@/views/DataCenter/Subnet/SubnetDetail';
import AddSubnet from '@/views/DataCenter/Subnet/AddSubnet';

export default [
    {
        path:'add',
        element:<AddDataCenter />
    },
    {
        path:'add/result',
        element:<AddDcResult />
    },
    {
        path:'overview',
        element:<DataCenterOverview />
    },
    {
        path:'subnet',
        element:<Subnet/>
    },
    {
        path:'subnet/add',
        element:<AddSubnet/>
    },
    {
        path:'subnet/:subnetId',
        element:<SubnetDetail/>
    },
    {
        path:'route',
        element:<NoResource resourceName={'route'} buttonName={'Add Route'} routePath={'/route/add'} />
    },
    {
        path:'gateway',
        element:<NoResource resourceName={'gateway'} buttonName={'Add Gageway'} routePath={'/gateway/add'} />
    },
    {
        path:'security',
        element:<NoResource resourceName={'security'} buttonName={'Add SecurityGroup'} routePath={'/security/add'} />
    },
    {
        path:'staticip',
        element:<Network />
    },
    {
        path:'staticip/detail',
        element:<EipDetail />
    },
    {
        path:'*',
        element:<NotFound />
    }
];