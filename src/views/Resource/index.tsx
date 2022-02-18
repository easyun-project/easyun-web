//react 相关
import * as React from 'react';
import { useState } from 'react';
import { Route } from 'react-router';
import { Routes, useNavigate } from 'react-router-dom';

//redux相关
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
//UI 相关
import { Menu, Table } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
import { CButton } from '@/components/Common/CButton';

//数据模型
import { ServerModel } from '@/constant/server';

//视图与组件
import AddServer from '@/views/Resource/Server/AddServer';
import AddBucket from '@/views/Resource/Storage/AddBucket';
import AddDisk from '@/views/Resource/Storage/AddDisk';
import NotFound from '../NotFound';
import { ServerList } from '@/views/Resource/Server';
import { ServerDetail } from '@/views/Resource/Server/ServerDetail';
import { StoragePage } from '@/views/Resource/Storage';


interface NotDataProps {
    resourceName: string,
    buttonName: string,
    routePath: string

}


export const NoResource = (props: NotDataProps):JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className={classnames('m-20', 'flex', 'flex-col', 'items-center', 'h-screen')}>
            <div className={classnames('text-3xl', 'm-1')}>you have no {props.resourceName} right now.</div>
            <div className={classnames('text-sm', 'm-1')}>
                Add a cloud {props.resourceName} and get started with Easyun!
            </div>
            <div>
                <CButton
                    click={() => navigate(props.routePath)}
                    classes={classnames('bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-3')}>
                    {props.buttonName}
                </CButton>
            </div>
        </div>
    );

};


interface TableProps {
    dataSource: ServerModel[] | undefined | any[];
    columns: any[]
}

export const ResourceTable = (props: TableProps):JSX.Element => {
    return (
        <Table bordered={true} dataSource={props.dataSource} columns={props.columns}/>
    );
};
export const Resource = (): JSX.Element => {
    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // };
    const [current, changeCurrent] = useState('server');
    const navigate = useNavigate();
    const handleClick = (e)=>{
        console.log(e.key);
        changeCurrent(e.key);
        navigate(`/resource/${e.key}`);};
    return (
        <>
            <div>
                <div className={classnames('m-3','min-h-screen')}>
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
                        <Menu.Item key="server">Server</Menu.Item>
                        <Menu.Item key="storage">Storage</Menu.Item>
                        <Menu.Item key="databases">Databases</Menu.Item>
                        <Menu.Item key="networking">Networking</Menu.Item>
                        <Menu.Item key="containers">Containers</Menu.Item>
                        <Menu.Item key="backups">Backups</Menu.Item>
                    </Menu>
                    <Routes>
                        <Route path="server/:serverId" element={<ServerDetail />} />
                        <Route path="server" element={<ServerList/>}>
                        </Route>
                        <Route path="storage" element={<StoragePage />} />
                        <Route path="addServer" element={<AddServer />} />
                        <Route path="addBucket" element={<AddBucket />} />
                        <Route path="addDisk" element={<AddDisk />} />
                        <Route path="databases" element={<NoResource resourceName={'databases'} buttonName={'Add Databases'}
                            routePath={'/AddDatabases'}/>} />
                        <Route path="networking" element={<NoResource resourceName={'networking'} buttonName={'Add Networking'}
                            routePath={'/AddNetworking'}/>} />
                        <Route path="containers" element={<NoResource resourceName={'containers'} buttonName={'Add Container'}
                            routePath={'/AddContainer'}/>   } />
                        <Route path="backups" element={<NoResource resourceName={'backups'} buttonName={'Add Backup'} routePath={'/AddBackup'}/>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes >
                    {/* <Tabs defaultActiveKey="1">
                        <TabPane tab="Server" key="Server">
                            <ServerList/>
                        </TabPane>
                        <TabPane tab="Storage" key="Storage">
                            <Storage/>
                        </TabPane>
                        <TabPane tab="Databases" key="Databases">
                            <NoResource resourceName={'databases'} buttonName={'Add Databases'}
                                routePath={'/AddDatabases'}/>

                        </TabPane>
                        <TabPane tab="Networking" key="Networking">
                            <NoResource resourceName={'networking'} buttonName={'Add Networking'}
                                routePath={'/AddNetworking'}/>

                        </TabPane>
                        <TabPane tab="Containers" key="Containers">
                            <NoResource resourceName={'containers'} buttonName={'Add Container'}
                                routePath={'/AddContainer'}/>

                        </TabPane>
                        <TabPane tab="Backups" key="Backups">
                            <NoResource resourceName={'backups'} buttonName={'Add Backup'} routePath={'/AddBackup'}/>

                        </TabPane>
                    </Tabs> */}
                </div>
            </div>
            {/* <CFooter/> */}
        </>
    );
};


export default Resource;