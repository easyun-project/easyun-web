import React, { useState } from 'react';
import { Route } from 'react-router';
import { Routes, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
import Profile from './profile';
import Quotas from './quotas';
import Reminder from './reminder';
import Ssh_keys from './ssh_keys';
const Home = (): JSX.Element => {
    const [current, changeCurrent] = useState('server');
    const navigate = useNavigate();
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
                    <Menu.Item key="proile">Proile</Menu.Item>
                    <Menu.Item key="reminder">Reminder</Menu.Item>
                    <Menu.Item key="ssh_keys">SSH Keys</Menu.Item>
                    <Menu.Item key="quotas">Quotas</Menu.Item>
                </Menu>
                <Routes>
                    <Route path="proile" element={<Profile />}></Route>
                    <Route path="reminder" element={<Reminder />} />
                    <Route path="ssh_keys" element={<Ssh_keys />} />
                    <Route path="quotas" element={<Quotas />} />
                </Routes>
            </div>
        </div>
    );
};
export default Home;