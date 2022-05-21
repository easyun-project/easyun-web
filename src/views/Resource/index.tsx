// react related
import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
// UI contents
import { Menu, Table } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
// services and interface/schema
import { ServerModel } from '@/constant/server';

interface NotDataProps {
    resourceName: string,
    buttonName: string,
    routePath: string

}
export const NoResource = (props: NotDataProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className={classnames('m-20', 'flex', 'flex-col', 'items-center')}>
            <div className={classnames('text-3xl', 'm-1')}>you have no {props.resourceName} right now.</div>
            <div className={classnames('text-sm', 'm-1')}>
                Add a cloud {props.resourceName} and get started with Easyun!
            </div>
            <div>
                <button
                    onClick={() => navigate(props.routePath)}
                    className={classnames('btn-yellow')}>
                    {props.buttonName}
                </button>
            </div>
        </div>
    );

};


interface TableProps {
    dataSource: ServerModel[] | undefined | never[];
    columns: never[]
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


const Resource = (): JSX.Element => {
    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // };
    const location = useLocation();
    const currentTab = location.pathname.split('/').at(2) as string;
    const [current, changeCurrent] = useState(currentTab);
    const navigate = useNavigate();
    const handleClick = (e) => {
        changeCurrent(e.key);
        navigate(`/resource/${e.key}`);
    };
    return (
        <>
            <div>
                <div className={classnames('m-3')}>
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
                        <Menu.Item key="overview">Overview</Menu.Item>
                        <Menu.Item key="server">Server</Menu.Item>
                        <Menu.Item key="volume">Volume</Menu.Item>
                        <Menu.Item key="object">Bucket</Menu.Item>
                        <Menu.Item key="database">Database</Menu.Item>
                        <Menu.Item key="loadbalancer">Load Balancer</Menu.Item>
                        <Menu.Item key="backup">Backup</Menu.Item>
                    </Menu>
                    <Outlet />
                </div>
            </div>
        </>
    );
};


export default Resource;