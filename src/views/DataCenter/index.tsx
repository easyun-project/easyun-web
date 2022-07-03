//react 相关
import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

//UI 相关
import { Menu } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';



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
    const location = useLocation();
    const subPath = location.pathname.split('/')[2];
    const [ current, setCurrent ] = useState(subPath);

    const navigate = useNavigate();
    const handleClick = (e) => {
        setCurrent(e.key);
        navigate(`/datacenter/${e.key}`);
    };
    return (
        <>
            <div>
                <div className='m-3'>
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
                        <Menu.Item key="overview">Overview</Menu.Item>
                        <Menu.Item key="subnet">Subnet</Menu.Item>
                        <Menu.Item key="route">Route</Menu.Item>
                        <Menu.Item key="internet">Internet</Menu.Item>
                        <Menu.Item key="nat">NAT</Menu.Item>
                        <Menu.Item key="security">Security</Menu.Item>
                        <Menu.Item key="staticip">Static IP</Menu.Item>
                    </Menu>
                    <Outlet />
                </div>
            </div>
        </>
    );
};


export default DataCenter;