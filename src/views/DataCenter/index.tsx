import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { TabLayout } from '@/components/ui/tab-layout';

interface NotDataProps {
    resourceName: string;
    buttonName: string;
    routePath: string;
}

export const NoResource = (props: NotDataProps): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className="ml-3 mt-5 m-20 flex flex-col items-center">
            <div className="text-3xl m-1">you have no {props.resourceName} right now.</div>
            <div className="text-sm m-1">Add a cloud {props.resourceName} and get started with Easyun!</div>
            <button onClick={() => navigate(props.routePath)} className="btn-yellow">{props.buttonName}</button>
        </div>
    );
};

const dcTabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'subnet', label: 'Subnet' },
    { key: 'route', label: 'Route' },
    { key: 'internet', label: 'Internet' },
    { key: 'nat', label: 'NAT' },
    { key: 'security', label: 'Security' },
    { key: 'staticip', label: 'Static IP' },
];

export default function DataCenter() {
    return <TabLayout basePath="/datacenter" tabs={dcTabs} />;
}
