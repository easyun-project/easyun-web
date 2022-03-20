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
// import BucketManage from './Storage/BucketManage';
import Network from './Network';
import AddDataCenter from './Add';
import Gateway from './Gateway';
import Overview from './Overview';
import EipDetail from './Network/EipDetail';
import NotFound from '../NotFound';


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
                <div className={classnames('m-3')}>
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
                        <Menu.Item key="overview">Overview</Menu.Item>
                        <Menu.Item key="network">Network</Menu.Item>
                        <Menu.Item key="subnet">Subnet</Menu.Item>
                        <Menu.Item key="security">Security</Menu.Item>
                        <Menu.Item key="gateway">Gateway</Menu.Item>
                        <Menu.Item key="route">Route</Menu.Item>
                    </Menu>
                    <Routes>
                        {/* <Route path="server/:serverId" element={<ServerDetail />} /> */}
                        <Route path="add" element={<AddDataCenter />} />
                        <Route path="overview" element={<Overview />} />
                        <Route path="network" element={<Network />} />
                        <Route path="network/detail"  element={<EipDetail />} />
                        <Route path="gateway" element={<Gateway />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes >
                </div>
            </div>
        </>
    );
};


export default DataCenter;