import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import { Menu, Dropdown  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import HostModal from '@/components/Logic/CModal';
import userService from '@/service/userService';
import logo3 from '@@/src/assets/images/logo/easyun03.svg';


export const CHeader = (): JSX.Element => {
    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [selectedIndex, setSelectedIndex] = React.useState(1);
    // const open = Boolean(anchorEl);
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };
    //multiple language setting
    const { t, i18n } = useTranslation();
    // const lang = i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN';

    const userState = useSelector((state: RootState) => state.user.currentUser);

    const [ current, changeCurrent ] = useState('Home');
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const navigate = useNavigate();
    const handleClick = (e)=>{
        changeCurrent(e.key);
        navigate(`/${e.key}`);
    };

    const menu = (
        <Menu onClick={handleClick} selectedKeys={[ current ]} mode="vertical" className={classnames('text-xl')}>
            <Menu.Item key="home">{t('base.mainMenu.home')}</Menu.Item>
            <Menu.Item key="dashboard">{t('base.mainMenu.dashboard')}</Menu.Item>
            <Menu.Item key="event">{t('base.mainMenu.event')}</Menu.Item>
            <Menu.Item key="account">{t('base.mainMenu.account')}</Menu.Item>
        </Menu>
    );

    const getTitle = (key: string) => {
        switch (key) {
        case 'home':
            return t('base.mainMenu.home');
        case 'dashboard':
            return t('base.mainMenu.dashboard');
        case 'event':
            return t('base.mainMenu.event');
        case 'account':
            return t('base.mainMenu.account');
        default:
            return t('base.mainMenu.home');
        }
    };

    const handleLogout = ()=>{
        userService.logout().then(() => navigate('/login'));
    };

    const systemMenu = (
        <Menu>
            <Menu.Item key="hosturl" onClick={() => setIsModalVisible(true)} >API Server</Menu.Item>
            <Menu.Item key="setting">Settings</Menu.Item>
        </Menu>
    );

    const userMenu = (
        <Menu>
            <Menu.Item onClick={handleLogout} key="logout">{t('base.userMenu.Logout')}</Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="changepwd">{t('base.userMenu.Passwd')}</Menu.Item>
        </Menu>
    );

    const langMenu = (
        <Menu onClick={(e) => i18n.changeLanguage(e.key)}>
            <Menu.Item  key="en-US">English</Menu.Item>
            <Menu.Item  key="zh-CN">简体中文</Menu.Item>
            <Menu.Item  key="ja-JP">日本語</Menu.Item>
        </Menu>
    );

    return (
        <div className='flex items-center text-3xl text-white bg-gray-600' >
            <span id='logo'
                className={classnames('mx-10', 'cursor-pointer', 'flex')}
                onClick={() => navigate('/home')}
            >
                <img src={logo3} alt="Easyun" width="150" />
            </span>
            <span>
                <Dropdown overlay={menu}>
                    <a className={classnames('flex', 'items-baseline')} onClick={e => {
                        e.preventDefault();
                        navigate(`/${current}`);
                    }}>
                        <span className={classnames('text-2xl')}>{getTitle(current)}</span>
                        <DownOutlined style={{ fontSize: '20px' }}/>
                    </a>
                </Dropdown>
            </span>

            <div className='inline-flex absolute right-0 flex-none items-center' >
                <span id="free-trial" className={classnames('cursor-pointer', 'inline-flex')} >
                    <Icon icon="fa:heartbeat"
                        className={classnames('cursor-pointer')}
                        color="#9fbe8a"
                        width="25"
                        height="25"
                        fr={undefined}
                    />
                </span>
                <Icon icon="radix-icons:divider-vertical"
                    className={'mx-3'}
                    color="#5c6f9a"
                    width="25"
                    height="25"
                    hFlip={true}
                    fr={undefined}
                />

                <Dropdown overlay={systemMenu} trigger={[ 'click' ]} placement='bottom' className='inline-flex'>
                    <a onClick={e => e.preventDefault()}>
                        <span id="system" className='inline-flex cursor-pointer'>
                            <Icon icon="ant-design:setting-filled"
                                className='inline-block'
                                color="#5c6f9a" width="25" height="25" hFlip={true} fr={undefined} />
                            <Icon icon="iconoir:nav-arrow-down"
                                className='inline-block mr-2'
                                color="#5c6f9a" width="25" height="25" hFlip={true} fr={undefined} />
                        </span>
                    </a>
                </Dropdown>

                <HostModal title='配置服务器地址' msg='请输入您服务器的地址' isVisible={isModalVisible} setIsVisible={setIsModalVisible} />

                <Dropdown overlay={langMenu} trigger={[ 'click' ]} className='inline-flex'>
                    <a onClick={e => e.preventDefault()}>
                        <span id="language" className={classnames('text-lg')} style={{ color: '#5c6f9a' }}>
                            {t('base.langMenu.title')}
                        </span>
                        <Icon icon="iconoir:nav-arrow-down"
                            className={classnames('mr-2')}
                            color="#5c6f9a"
                            width="25"
                            height="25"
                            hFlip={true}
                            fr={undefined}
                        />
                    </a>
                </Dropdown>

                <Dropdown overlay={userMenu} >
                    <a onClick={e => e.preventDefault()}>
                        <span id="user" className={classnames('cursor-pointer', 'inline-flex')} >
                            <Icon icon="bi:person-fill"
                                className={classnames('ml-2', 'inline-block')}
                                color="#5c6f9a"
                                width="25"
                                height="25"
                                fr={undefined}
                            />
                            <span id="username" className={classnames('ml-1', 'text-lg')} style={{ color: '#5c6f9a' }}>
                                { userState.username }
                            </span>
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
            </div>
        </div>
    );
};
