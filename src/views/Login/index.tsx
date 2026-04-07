import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { CButton } from '@/components/Common/CButton';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { userAction } from '@/redux/userSlice';
import { postApiV1UserAuth, deleteApiV1UserLogout } from '@/api-client';

import HostModal from '@/components/Logic/CModal';
import { listAllDataCenter, getRegionList } from '@/redux/dataCenterSlice';

import logo3 from '@@/src/assets/images/logo/easyun03.svg';

const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    //multiple language setting
    const { t } = useTranslation();
    // 定义修改API Server 模态框显示状态
    const [isModalVisible, setIsModalVisible] = useState(false);
    //获取datacenter列表
    const initDataCenterList = async () => {
        dispatch(listAllDataCenter());
        dispatch(getRegionList());
    };

    const reqLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const username = fd.get('username') as string;
        const password = fd.get('password') as string;
        if (!username || !password) {
            return;
        }
        // console.log(values);
        postApiV1UserAuth({ body: { username, password } }).then(({ data }) => data?.detail).then(
            loginRes=>{dispatch(userAction({ ...loginRes, loginTime: Date.now() } as any));
                // localStorage.setItem('token', loginRes.token);
                initDataCenterList().then(() => navigate('/home'));
            },
            ()=>toast.error('Username and Password do not match.')
        );
    };


    return (
        <div className='flex flex-col items-center'>
            {/* 首页header */}
            <div className='flex items-center w-full bg-gray-600'>
                <div className='grow ml-10'>
                    <img src={logo3} alt="Easyun" width='150' />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="cursor-pointer"><Icon icon="ant-design:setting-filled" color="#5c6f9a" width="25" height="25" fr={undefined} /></span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setIsModalVisible(true)}>API Server</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <HostModal title='配置服务器地址' msg='请输入您服务器的地址' isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
            </div>
            {/* 登录框体 */}
            <div id="login-container" className='items-center py-12 mt-36 sm:w-96 md:w-1/2 lg:w-1/3 rounded-border'>
                <div className="flex flex-wrap">
                    <div className="flex flex-wrap">
                        <h4 >{t('login.title')}</h4>
                    </div>

                    <form onSubmit={reqLogin} autoComplete="off" className="space-y-4">
                        <Input name="username" className="w-80 h-12 rounded-border" placeholder="Enter your username" required pattern="^[a-zA-Z0-9_]+$" />
                        <Input name="password" type="password" className="w-80 h-12 rounded-border" placeholder="Enter your password" required />
                        <label className="flex items-center gap-2">
                            <Checkbox name="remember" /> {t('login.remember')}
                        </label>
                        <div className="flex justify-center">
                            <button type="submit" className="w-full btn-yellow">{t('login.button')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;