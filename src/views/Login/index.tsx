import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { CButton } from '@/components/Common/CButton';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAction } from '@/redux/userSlice';
import userService from '@/service/userService';
import { Row, Input, message, Typography, Form, Checkbox, Menu, Dropdown } from 'antd';
import HostModal from '@/components/Logic/CModal';
import { listAllDataCenter, getRegionList } from '@/redux/dataCenterSlice';

import logo3 from '@@/src/assets/images/logo/easyun03.svg';

const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //multiple language setting
    const { t } = useTranslation();
    // 定义修改API Server 模态框显示状态
    const [isModalVisible, setIsModalVisible] = useState(false);
    //获取datacenter列表
    const initDataCenterList = async () => {
        dispatch(listAllDataCenter());
        dispatch(getRegionList());
    };

    const reqLogin = (values) => {
        const { username, password } = values;
        if (!username || !password) {
            return;
        }
        // console.log(values);
        userService.login(username, password).then(
            loginRes=>{dispatch(userAction({ ...loginRes, loginTime: Date.now() }));
                // localStorage.setItem('token', loginRes.token);
                initDataCenterList().then(() => navigate('/home'));
            },
            ()=>message.error('Username and Password do not match.')
        );
    };

    const systemMenu = (
        <Menu>
            <Menu.Item onClick={() => setIsModalVisible(true)} key="sethost">API Server</Menu.Item>
        </Menu>
    );

    return (
        <div className='flex flex-col items-center'>
            {/* 首页header */}
            <div className='flex items-center w-full bg-gray-600'>
                <div className='grow ml-10'>
                    <img src={logo3} alt="Easyun" width='150' />
                </div>
                <Dropdown overlay={systemMenu} placement='bottomRight' className='inline-flex'>
                    <a onClick={e => e.preventDefault()}>
                        <Icon icon="ant-design:setting-filled"
                            className='inline-block ml-10'
                            color="#5c6f9a" width="25" height="25" hFlip={true} fr={undefined} />
                        <Icon icon="iconoir:nav-arrow-down"
                            className='inline-block mr-3'
                            color="#5c6f9a" width="25" height="25" hFlip={true} fr={undefined} />
                    </a>
                </Dropdown>
                <HostModal title='配置服务器地址' msg='请输入您服务器的地址' isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
            </div>
            {/* 登录框体 */}
            <div id="login-container" className='items-center py-12 mt-36 sm:w-96 md:w-1/2 lg:w-1/3 rounded-border'>
                <Row id="login-content" gutter={16} className='flex flex-col items-center' >
                    <Row className='mb-4'>
                        <Typography.Title level={4} >{t('login.title')}</Typography.Title>
                    </Row>

                    <Form name="login"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={reqLogin}
                        onFinishFailed={err => message.error(err)}
                        autoComplete="off" >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: 'Please input your username!' },
                                {
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: 'Username must contain only letters numbers and underscores'
                                },
                            ]}
                        >
                            <Input className='w-80 h-12 rounded-border' placeholder="Enter your username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password className='w-80 h-12 rounded-border' placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="" wrapperCol={{ offset: 0, span: 16 }}>
                            <Checkbox>{t('login.remember')}</Checkbox>
                        </Form.Item>

                        <Form.Item className='flex justify-center'>
                            <button type='submit' className='w-full btn-yellow'>{t('login.button')}</button>
                            {/* <CButton type="primary" htmlType="submit" classes={classnames('w-36')}>{t('login.button')}</CButton> */}
                        </Form.Item>
                    </Form>
                </Row>
            </div>
        </div>
    );
};

export default LoginPage;