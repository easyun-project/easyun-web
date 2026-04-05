import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import { deleteApiV1UserLogout } from '@/api-client';
import HostModal from '@/components/Logic/CModal';
import logo3 from '@@/src/assets/images/logo/easyun03.svg';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export const CHeader = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const userState = useSelector((state: RootState) => state.user.currentUser);
    const [current, setCurrent] = useState('home');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { key: 'home', label: t('base.mainMenu.home') },
        { key: 'dashboard', label: t('base.mainMenu.dashboard') },
        { key: 'event', label: t('base.mainMenu.event') },
        { key: 'account', label: t('base.mainMenu.account') },
    ];
    const currentLabel = navItems.find(i => i.key === current)?.label || t('base.mainMenu.home');

    return (
        <div className="flex items-center text-3xl text-white bg-gray-600">
            <span className="mx-10 cursor-pointer flex" onClick={() => navigate('/home')}>
                <img src={logo3} alt="Easyun" width="150" />
            </span>

            {/* Main nav dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <span className="flex items-baseline cursor-pointer">
                        <span className="text-2xl">{currentLabel}</span>
                        <ChevronDown className="ml-1 size-5" />
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {navItems.map(item => (
                        <DropdownMenuItem key={item.key} onClick={() => { setCurrent(item.key); navigate(`/${item.key}`); }}>
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="inline-flex absolute right-0 flex-none items-center">
                <Icon icon="fa:heartbeat" color="#9fbe8a" width="25" height="25" fr={undefined} />
                <Icon icon="radix-icons:divider-vertical" className="mx-3" color="#5c6f9a" width="25" height="25" fr={undefined} />

                {/* System menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="inline-flex cursor-pointer items-center">
                            <Icon icon="ant-design:setting-filled" color="#5c6f9a" width="25" height="25" fr={undefined} />
                            <ChevronDown className="size-4 mr-2" style={{ color: '#5c6f9a' }} />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setIsModalVisible(true)}>API Server</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <HostModal title="配置服务器地址" msg="请输入您服务器的地址" isVisible={isModalVisible} setIsVisible={setIsModalVisible} />

                {/* Language menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="inline-flex items-center cursor-pointer text-lg" style={{ color: '#5c6f9a' }}>
                            {t('base.langMenu.title')}
                            <ChevronDown className="size-4 mr-2" style={{ color: '#5c6f9a' }} />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => i18n.changeLanguage('en-US')}>English</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => i18n.changeLanguage('zh-CN')}>简体中文</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => i18n.changeLanguage('ja-JP')}>日本語</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="cursor-pointer inline-flex items-center">
                            <Icon icon="bi:person-fill" className="ml-2" color="#5c6f9a" width="25" height="25" fr={undefined} />
                            <span className="ml-1 text-lg" style={{ color: '#5c6f9a' }}>{userState.username}</span>
                            <ChevronDown className="size-4 mr-2" style={{ color: '#5c6f9a' }} />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => deleteApiV1UserLogout().then(() => navigate('/login'))}>
                            {t('base.userMenu.Logout')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{t('base.userMenu.Passwd')}</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
