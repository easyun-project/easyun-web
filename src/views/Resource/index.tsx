// react related
import * as React from 'react';
import { useState } from 'react';
import { Route } from 'react-router';
import { Routes, useNavigate } from 'react-router-dom';
// redux related
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// UI contents
import { Menu, Table } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
// import { CButton } from '@/components/Common/CButton';

// services and interface/schema
import { ServerModel } from '@/constant/server';

// view and components
import ResourceOverview from '@/views/Resource/Overview'
import AddServer from '@/views/Resource/Server/AddServer';
import AddBucket from '@/views/Resource/Storage/AddBucket';
import AddDisk from '@/views/Resource/Storage/AddDisk';
import NotFound from '../NotFound';
import { ServerList } from '@/views/Resource/Server';
import { ServerDetail } from '@/views/Resource/Server/ServerDetail';
import { StoragePage } from '@/views/Resource/Storage';
import BucketManage from '@/views/Resource/Storage/BucketManage';
import { DatabasePage } from '@/views/Resource/Database';


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
    dataSource: ServerModel[] | undefined | any[];
    columns: any[]
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
export const Resource = (): JSX.Element => {
    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // };
    const [current, changeCurrent] = useState('overview');
    const navigate = useNavigate();
    const handleClick = (e) => {
        console.log(e.key);
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
                        <Menu.Item key="storage">Storage</Menu.Item>
                        <Menu.Item key="database">Database</Menu.Item>
                        <Menu.Item key="loadbalancer">Load Balancer</Menu.Item>
                        {/* <Menu.Item key="containers">Containers</Menu.Item> */}
                        <Menu.Item key="backup">Backup</Menu.Item>
                    </Menu>
                    <Routes>
                        <Route path="overview" element={<ResourceOverview />} />
                                            
                        <Route path="server/:serverId" element={<ServerDetail />} />
                        <Route path="server" element={<ServerList />} />
                        <Route path="server/add" element={<AddServer />} />

                        <Route path="storage" element={<StoragePage />} />
                        <Route path='storage/object/:bktId' element={<BucketManage />} />
                        <Route path='storage/object/add' element={<AddBucket />} />
                        <Route path='storage/block/add' element={<AddDisk />} />

                        <Route path="database" element={<DatabasePage />} />
                        {/* <Route path="database/:databaseId" element={<DatabaseDetail />} /> */}
                        {/* <Route path="database/add" element={<AddDatabase />} />          */}
                            
                        <Route path="loadbalancer" element={<NoResource resourceName={'loadbalancer'} buttonName={'Add Load Balancer'} routePath={'/loadbalancer/add'} />} />
                        {/* <Route path="containers" element={<NoResource resourceName={'containers'} buttonName={'Add Container'} routePath={'/AddContainer'} />} /> */}
                        <Route path="backup" element={<NoResource resourceName={'backup'} buttonName={'Add Backup'} routePath={'/backup/add'} />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes >
                </div>
            </div>
            {/* <CFooter/> */}
        </>
    );
};


export default Resource;