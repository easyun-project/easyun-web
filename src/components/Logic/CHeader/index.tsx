import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = () => {
    const handleMenuClick = (e) => {
        message.info(`Click on menu item => ${e.key}.`);
    };
    return (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="Home">Home</Menu.Item>
            <Menu.Item key="Dashboard">Dashboard</Menu.Item>
            <Menu.Item key="Event">Event</Menu.Item>
            <Menu.Item key="Account">Account</Menu.Item>
        </Menu>
    );
};

export const CHeader = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const container = classnames(
        'bg-gray-600',
        'text-white',
        'text-3xl',
        'h-16',
        'flex',
        'items-center'
    );
    const content = classnames('ml-6', 'flex-none', 'cursor-pointer');
    return (
        <div className={container}>
            <span className={content} onClick={() => navigate('/home')}>
        Easyun
            </span>
            <Dropdown overlay={menu} className={classnames('ml-32')}>
                <span>
          Home <DownOutlined />
                </span>
            </Dropdown>
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
                    width="40"
                    height="40"
                    fr={undefined}
                />
                <Icon
                    className={'mx-3'}
                    icon="radix-icons:divider-vertical"
                    color="#5c6f9a"
                    width="30"
                    height="30"
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
                        width="30"
                        height="30"
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

                <span id="username" className={'mx-5'} style={{ color: '#5c6f9a' }}>
          admin
                </span>
                <span id="user" className={classnames('cursor-pointer', 'inline-flex')}>
                    <Icon
                        className={classnames('ml-2', 'inline-block')}
                        icon="bi:person-fill"
                        color="#5c6f9a"
                        width="30"
                        height="30"
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
            </div>
        </div>
    );
};
