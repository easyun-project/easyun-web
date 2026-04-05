import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { ServerModel } from '@/constant/server';
import { TabLayout } from '@/components/ui/tab-layout';

interface NotDataProps {
    resourceName: string;
    buttonName: string;
    routePath: string;
}

export const NoResource = (props: NotDataProps): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className="m-20 flex flex-col items-center">
            <div className="text-3xl m-1">you have no {props.resourceName} right now.</div>
            <div className="text-sm m-1">Add a cloud {props.resourceName} and get started with Easyun!</div>
            <button onClick={() => navigate(props.routePath)} className="btn-yellow">{props.buttonName}</button>
        </div>
    );
};

interface TableProps {
    dataSource: ServerModel[] | undefined | never[];
    columns: never[];
}

export const ResourceTable = (props: TableProps): JSX.Element => {
    return (
        <Table bordered={true} dataSource={props.dataSource} columns={props.columns} rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: ServerModel[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        }} />
    );
};

const resourceTabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'server', label: 'Server' },
    { key: 'volume', label: 'Volume' },
    { key: 'object', label: 'Bucket' },
    { key: 'database', label: 'Database' },
    { key: 'loadbalancer', label: 'Load Balancer' },
    { key: 'backup', label: 'Backup' },
];

export default function Resource() {
    return <TabLayout basePath="/resource" tabs={resourceTabs} />;
}
