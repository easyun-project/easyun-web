import React, { useState } from 'react';
import { Route } from 'react-router';
import { Routes, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
import Profile from './profile';
import Quotas from './quotas';
import Reminder from './reminder';
import Keypair from './keypair';
const Home = (): JSX.Element => {
    const [current, changeCurrent] = useState('profile');
    const navigate = useNavigate();
    const location = useLocation();
    // 刷新时 保持定位一致
    const url_route_pathname = location.pathname.split('/')[2];
    if (current !== url_route_pathname) changeCurrent(url_route_pathname);
    const handleClick = (e) => {
        console.log(e.key);
        changeCurrent(e.key);
        navigate(`/account/${e.key}`);
    };

    return (
        <div>
            <div className={classnames('ml-3', 'min-h-screen')}>
                <Menu
                    onClick={handleClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                >
                    <Menu.Item key="profile">profile</Menu.Item>
                    <Menu.Item key="reminder">Reminder</Menu.Item>
                    <Menu.Item key="keypair">Keypair</Menu.Item>
                    <Menu.Item key="quotas">Quotas</Menu.Item>
                </Menu>
                <div className={classnames('p-12')}>
                    <Routes>
                        <Route path="profile" element={<Profile />}></Route>
                        <Route path="reminder" element={<Reminder />} />
                        <Route path="keypair" element={<Keypair />} />
                        <Route path="quotas" element={<Quotas />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};
