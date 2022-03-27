//react 相关
import * as React from 'react';
import { useState } from 'react';
import { Route } from 'react-router';
import { Routes, useNavigate } from 'react-router-dom';

//UI 相关
import { Menu } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';

//数据模型
// import { ServerModel } from '@/constant/server';

//视图与组件
import DataCenterOverview from './Overview';
import AddDataCenter from './Add';
import Gateway from './Gateway';
import Network from './Network';
import EipDetail from './Network/EipDetail';
import NotFound from '../NotFound';


interface NotDataProps {
    resourceName: string,
    buttonName: string,
    routePath: string

}

export const NoResource = (props: NotDataProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className={classnames('ml-3', 'mt-5', 'm-20', 'flex', 'flex-col', 'items-center')}>
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

export const DataCenter = (): JSX.Element => {
    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // };
    const [current, changeCurrent] = useState('overview');
    const navigate = useNavigate();
    const handleClick = (e) => {
        changeCurrent(e.key);
        navigate(`/datacenter/${e.key}`);
    };
    return (
        <>
            <div>
                <div className='m-3'>
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
                        <Menu.Item key="overview">Overview</Menu.Item>
                        <Menu.Item key="subnet">Subnet</Menu.Item>
                        <Menu.Item key="security">Security</Menu.Item>
                        <Menu.Item key="gateway">Gateway</Menu.Item>
                        <Menu.Item key="network">Network</Menu.Item>
                        <Menu.Item key="route">Route</Menu.Item>
                    </Menu>
                    <Routes>
                        {/* <Route path="server/:serverId" element={<ServerDetail />} /> */}
                        <Route path="add" element={<AddDataCenter />} />
                        <Route path="overview" element={<DataCenterOverview />} />
                        <Route path="subnet" element={<NoResource resourceName={'subnet'} buttonName={'Add Subnet'} routePath={'/subnet/add'} />} />
                        <Route path="route" element={<NoResource resourceName={'route'} buttonName={'Add Route'} routePath={'/route/add'} />} />
                        <Route path="gateway" element={<NoResource resourceName={'gateway'} buttonName={'Add Gageway'} routePath={'/gateway/add'} />} />
                        <Route path="security" element={<NoResource resourceName={'security'} buttonName={'Add SecurityGroup'} routePath={'/security/add'} />} />
                        <Route path="network" element={<Network />} />
                        <Route path="network/detail"  element={<EipDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes >
                </div>
            </div>
        </>
    );
};


export default DataCenter;