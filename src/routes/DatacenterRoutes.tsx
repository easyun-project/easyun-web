import React from 'react';
import NotFound from '@/views/NotFound';
import { NoResource } from '@/views/Resource';
//datacenter视图
import DataCenterOverview from '@/views/DataCenter/Overview';
import AddDataCenter from '@/views/DataCenter/Add';
import AddDcResult from '@/views/DataCenter/Add/result';
import StaticIP from '@/views/DataCenter/StaticIp';
import EipDetail from '@/views/DataCenter/StaticIp/EipDetail';
import Subnet from '@/views/DataCenter/Subnet';
import SubnetDetail from '@/views/DataCenter/Subnet/SubnetDetail';
import AddSubnet from '@/views/DataCenter/Subnet/AddSubnet';
import IntGateway from '@/views/DataCenter/IntGateway';
import NatGateway from '@/views/DataCenter/NatGateway';
import RouteTable from '@/views/DataCenter/RouteTable';
import SecurityGroup from '@/views/DataCenter/SecGroup';


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
        element:<RouteTable />
    },
    {
        path:'internet',
        element:<IntGateway/>
    },
    {
        path:'nat',
        element:<NatGateway/>
    },
    {
        path:'security',
        element:<SecurityGroup />
    },
    {
        path:'staticip',
        element:<StaticIP />
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