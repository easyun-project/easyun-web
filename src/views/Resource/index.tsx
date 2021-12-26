import * as React from 'react';
// import { CHeader } from '@/components/Logic/CHeader';
// import { CFooter } from '@/components/Logic/CFooter';
import { useNavigate } from 'react-router-dom';
import { Table, Tabs } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
import { CButton } from '@/components/Common/CButton';
import { ServerModel } from '@/constant/server';
import { ServerList } from '@/views/Resource/Server';
import Storage from './Storage';
import AddServer from '@/views/Resource/Server/AddServer';
import AddBucket from '@/views/Resource/Storage/AddBucket';
import AddDisk from '@/views/Resource/Storage/AddDisk/insex';
import ServerDetail from '@/views/Resource/Server/ServerDetail';
import { Menu } from 'antd';
import { useState } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

const { TabPane } = Tabs;

interface NotDataProps {
    resourceName: string,
    buttonName: string,
    routePath: string

}


export const NoResource = (props: NotDataProps) => {
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
    dataSource: ServerModel[] | undefined | object[];
    columns: object[]
}

export const ResourceTable = (props: TableProps) => {
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
                {/* <CHeader/> */}
                <div className={classnames('ml-3','min-h-screen')}>
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
                        <Menu.Item key="server">Server</Menu.Item>
                        <Menu.Item key="storage">Storage</Menu.Item>
                        <Menu.Item key="databases">Databases</Menu.Item>
                        <Menu.Item key="networking">Networking</Menu.Item>
                        <Menu.Item key="containers">Containers</Menu.Item>
                        <Menu.Item key="backups">Backups</Menu.Item>
                    </Menu>
                    <Routes>
                        <Route path="/" element={<ServerList/>} />
                        <Route path="server" element={<ServerList/>} />
                        <Route path="storage" element={<Storage />} />
                        <Route path="addServer" element={<AddServer />} />
                        <Route path="server/:serverId" element={<ServerDetail />} />
                        <Route path="addBucket" element={<AddBucket />} />
                        <Route path="addDisk" element={<AddDisk />} />
                        <Route path="databases" element={<NoResource resourceName={'databases'} buttonName={'Add Databases'}
                            routePath={'/AddDatabases'}/>} />
                        <Route path="networking" element={<NoResource resourceName={'networking'} buttonName={'Add Networking'}
                            routePath={'/AddNetworking'}/>} />
                        <Route path="containers" element={<NoResource resourceName={'containers'} buttonName={'Add Container'}
                            routePath={'/AddContainer'}/>} />
                        <Route path="backups" element={<NoResource resourceName={'backups'} buttonName={'Add Backup'} routePath={'/AddBackup'}/>} />
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