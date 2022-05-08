import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import { Menu,Dropdown  } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import logo3 from '@@/src/assets/images/logo_easyun/logo_easyun03.svg';

// const menu = () => {
//     // const navigate = useNavigate();
//     const handleMenuClick = (e) => {
//         // e.target
//         // navigate(`/${e.target.value}`)
//         // console.log(`/${}`);
//         message.info(`Click on menu item => ${e.key}.`);
//     };
//     return (
//         <Menu onClick={handleMenuClick}>
//             <Menu.Item key="Home">Home</Menu.Item>
//             <Menu.Item key="Dashboard">Dashboard</Menu.Item>
//             <Menu.Item key="Event">Event</Menu.Item>
//             <Menu.Item key="Account">Account</Menu.Item>
//         </Menu>
//     );
// };

export const CHeader = (): JSX.Element => {
    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [selectedIndex, setSelectedIndex] = React.useState(1);
    // const open = Boolean(anchorEl);
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    const userState = useSelector((state: RootState) => {
        return state.user.currentUser;
    });

    const [current, changeCurrent] = useState('Home');
    const navigate = useNavigate();
    const handleClick = (e)=>{
        console.log(e.currentTarget);
        changeCurrent(e.key);
        navigate(`/${e.key}`);
    };

    const getTitle = (key: string) => {
        switch (key) {
        case 'home':
            return 'Home';
        case 'dashboard':
            return 'Dashboard';
        case 'event':
            return 'Event';
        case 'account':
            return 'Account';
        default:
            return 'Home';
        }
    };


    const menu = (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="vertical" className={classnames('text-xl')}>
            <Menu.Item key="home">Home</Menu.Item>
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="event">Event</Menu.Item>
            <Menu.Item key="account">Account</Menu.Item>
        </Menu>);
    return (
        <div
            className={classnames(
                'flex',
                'items-center',
                'bg-gray-600',
                'text-white',
                'text-3xl',
            )}
        >
            <span
                className={classnames('mx-10', 'cursor-pointer', 'flex')}
                onClick={() => navigate('/home')}
            >
                <img src={logo3} alt="logo_easyun03.svg" width="150" />
            </span>
            <span >
                <Dropdown overlay={menu}>
                    <a   className={classnames('flex','items-baseline')} onClick={e => e.preventDefault()}>
                        <span className={classnames('text-2xl')}>{getTitle(current)}</span>
                        <DownOutlined style={{ fontSize: '20px' }}/>
                    </a>
                </Dropdown>
            </span>
            <div
                className={classnames(
                    'absolute',
                    'right-0',
                    'flex-none',
                    'inline-flex',
                    'items-center'
                )}
            >
                <Icon
                    id="free-trial"
                    className={classnames('cursor-pointer')}
                    icon="fa:heartbeat"
                    color="#9fbe8a"
                    width="25"
                    height="25"
                    fr={undefined}
                />
                <Icon
                    className={'mx-3'}
                    icon="radix-icons:divider-vertical"
                    color="#5c6f9a"
                    width="25"
                    height="25"
                    hFlip={true}
                    fr={undefined}
                />
                <span
                    id="setting"
                    className={classnames('cursor-pointer', 'inline-flex')}
                >
                    <Icon
                        className={classnames('ml-2', 'inline-block')}
                        icon="ant-design:setting-filled"
                        color="#5c6f9a"
                        width="25"
                        height="25"
                        fr={undefined}
                    />
                    <Icon
                        className={'mr-2'}
                        icon="iconoir:nav-arrow-down"
                        color="#5c6f9a"
                        width="25"
                        height="25"
                        hFlip={true}
                        fr={undefined}
                    />
                </span>
                <span
                    id="user"
                    className={classnames('cursor-pointer', 'inline-flex')}
                >
                    <Icon
                        className={classnames('ml-2', 'inline-block')}
                        icon="bi:person-fill"
                        color="#5c6f9a"
                        width="25"
                        height="25"
                        fr={undefined}
                    />
                    <Icon
                        className={classnames('mr-2')}
                        icon="iconoir:nav-arrow-down"
                        color="#5c6f9a"
                        width="25"
                        height="25"
                        hFlip={true}
                        fr={undefined}
                    />
                </span>
                <span id="username" className={classnames('mx-5','text-lg')} style={{ color: '#5c6f9a' }}>
                    { userState.username }
                </span>
            </div>
        </div>
    );
};
