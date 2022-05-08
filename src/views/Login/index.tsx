import { useTranslation } from 'react-i18next';

import React, { createRef, useState } from 'react';
// import { CButton } from '@/components/Common/CButton';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import appService from '@/service/appService';
import { useDispatch } from 'react-redux';
import { userAction } from '@/redux/userSlice';
import userService from '@/service/userService';
import { Row, Input, message, Typography, Modal, Form, Checkbox } from 'antd';
import { CButton } from '@/components/Common/CButton';
import { listAllDataCenter, getRegionList } from '@/redux/dataCenterSlice';
import { UserModel } from '@/constant/user';
// import { RootState } from '@/redux/store';

import logo3 from '@@/src/assets/images/logo_easyun/logo_easyun03.svg';

const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const usernameRef = createRef<HTMLInputElement>();
    // const passwordRef = createRef<HTMLInputElement>();
    const configRef = createRef<Input>();

    //获取datacenter列表
    const initDataCenterList = async () => {
        dispatch(listAllDataCenter());
        dispatch(getRegionList());
    };

    const reqLogin = async (values) => {
        const { username, password } = values;
        if (!username || !password) {
            return;
        }
        const loginRes = await userService.login(username, password);
        if (loginRes) {
            // 把登录时间一并存在redux中
            dispatch(userAction(
                { ...loginRes, loginTime: Date.now() }));
            const token = loginRes.token;
            localStorage.setItem('token', token);
            initDataCenterList().then(() => navigate('/home'));
        } else {
            message.error('Username and Password do not match.');
        }
    };

    const onFinishFailed = (message) => {
        message.error(message);
    };


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = async () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        const host = configRef.current?.input.value;
        if (!host) {
            message.info('请输入您服务器的地址');
            return;
        }
        appService.setHost(host);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { t, i18n } = useTranslation();
    const lang = i18n.language === 'ja' ? 'en' : 'ja';
    console.log(lang);
    // const container = classnames('bg-gray-600', 'text-white', 'text-3xl', 'flex', 'items-center');
    // const classes = classnames('w-2/3','h-12', 'rounded-border', 'border-gray-400', 'mx-2', 'my-10', 'p-5');
    return (
        <div className={classnames('flex', 'flex-col', 'items-center')}>
            {/* 首页header */}
            <div className={classnames('flex', 'items-center', 'bg-gray-600', 'w-full')}>
                <div className='grow ml-10'>
                    <img src={logo3} alt="logo_easyun03.svg" width='150' />
                </div>
                <span onClick={showModal} className={classnames('float-right', 'mr-10', 'cursor-pointer')}>
                    <Icon className={classnames('ml-10', 'inline-block')} icon="ant-design:setting-filled"
                        color="#5c6f9a" width="25" height="25"
                        hFlip={true} fr={undefined} />
                    <Icon className={classnames('ml-3', 'inline-block')} icon="iconoir:nav-arrow-down"
                        color="#5c6f9a" width="25" height="25"
                        hFlip={true} fr={undefined} />
                </span>
                <Modal title="配置服务器地址" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Input value={configRef.current?.state.value} ref={configRef}
                        placeholder='please your server url' />
                </Modal>
            </div>
            {/* 登录框体 */}
            <div id="login-container" className={classnames('mt-36', 'sm:w-96', 'md:w-1/2', 'lg:w-1/3', 'rounded-border', 'items-center', 'py-12')}>
                <Row id="login-content" gutter={16} className='flex flex-col items-center' >
                    <Row className='mb-4'>
                        <Typography.Title level={4} >{t('Login')}</Typography.Title>
                    </Row>

                    <Form name="login"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={reqLogin}
                        onFinishFailed={onFinishFailed}
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
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item className='flex justify-center'>
                            <CButton type="primary" htmlType="submit" classes={classnames('w-36')}>Login</CButton>
                        </Form.Item>
                    </Form>
                </Row>

                {/* <CButton click={() => i18n.changeLanguage(lang)}>
                	{`change to ${lang}`}
                </CButton> */}
            </div>
        </div>
    );
};

export default LoginPage;