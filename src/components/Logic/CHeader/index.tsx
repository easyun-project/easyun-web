import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import { Menu, Dropdown  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import userService from '@/service/userService';

import logo3 from '@@/src/assets/images/logo_easyun/logo_easyun03.svg';


export const CHeader = (): JSX.Element => {
    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [selectedIndex, setSelectedIndex] = React.useState(1);
    // const open = Boolean(anchorEl);
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    //multiple language setting
    const { t, i18n } = useTranslation();
    const lang = i18n.language === 'zh' ? 'en' : 'zh';

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

    const menu = (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="vertical" className={classnames('text-xl')}>
            <Menu.Item key="home">{t('menuHome')}</Menu.Item>
            <Menu.Item key="dashboard">{t('menuDashboard')}</Menu.Item>
            <Menu.Item key="event">{t('menuEvent')}</Menu.Item>
            <Menu.Item key="account">{t('menuAccount')}</Menu.Item>
        </Menu>
    );

    const getTitle = (key: string) => {
        switch (key) {
        case 'home':
            return t('menuHome');
        case 'dashboard':
            return t('menuDashboard');
        case 'event':
            return t('menuEvent');
        case 'account':
            return t('menuAccount');
        default:
            return t('menuHome');
        }
    };

    const handleLogout = ()=>{
        userService.logout().then(() => navigate('/login'));
    };

    const userMenu = (
        <Menu>
            <Menu.Item onClick={handleLogout} key="logout">{t('userMenuLogout')}</Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item onClick={() => i18n.changeLanguage(lang)} key="language">{t('userMenuLanguage')}</Menu.Item>
        </Menu>
    );

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
                <span id="setting" className={classnames('cursor-pointer', 'inline-flex')} >
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
                <Dropdown overlay={userMenu} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                        <span id="user" className={classnames('cursor-pointer', 'inline-flex')} >
                            <Icon icon="bi:person-fill"
                                className={classnames('ml-2', 'inline-block')}
                                color="#5c6f9a"
                                width="25"
                                height="25"
                                fr={undefined}
                            />
                            <Icon icon="iconoir:nav-arrow-down"
                                className={classnames('mr-2')}
                                color="#5c6f9a"
                                width="25"
                                height="25"
                                hFlip={true}
                                fr={undefined}
                            />
                        </span>
                    </a>
                </Dropdown>

                <span id="username" className={classnames('mx-5','text-lg')} style={{ color: '#5c6f9a' }}>
                    { userState.username }
                </span>
            </div>
        </div>
    );
};
