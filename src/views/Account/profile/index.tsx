import React, { useState, useEffect } from 'react';
import { Row, Col, Card, message } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import accountService from '@/service/accountService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
const  Component = (): JSX.Element => {
    const userState = useSelector((state: RootState) => {
        return state.user.user;
    });
    console.log(userState);
    // const [info, setInfo] = useState({
    //     account_id: '',
    //     aws_type: '',
    //     role: '',
    // });
    // const getAwsInfo = async () => {
    //     const { detail } = await accountService.getAwsInfo();
    //     setInfo({
    //         account_id: detail.account_id,
    //         aws_type: detail.aws_type,
    //         role: detail.role,
    //     });
    // };
    // useEffect(() => {
    //     getAwsInfo();
    // }, []);
    // 动态拼接region部分:
    const region = 'us-east-1';
    const openMangerAwsProfile = () => {
        const url =
          `https://console.aws.amazon.com/billing/home/?region=${region}#/account`;
        window.open(url, '_blank');
    };
    // 新增邮箱
    const addEmail = () => {
        message.warning('正在火速研发中!');
    };
    // 新增SMS
    const addSMS = () => {
        message.warning('正在火速研发中!');
    };
    return (
        <>
            <Row>
                <Col span={1}>
                    <Icon
                        className={classnames('mx-0', 'inline-block')}
                        width="50"
                        height="50"
                        icon="bi:person-circle"
                    />
                </Col>
                <Col span={23}>
                    <div>
              Account ID: {userState.account_id} [{userState.account_type}]
                    </div>
                    <div>sercurity-credentials: {userState.account_id}</div>
                </Col>
            </Row>
            <Row>
                <div
                    onClick={openMangerAwsProfile}
                    className={classnames(
                        'flex',
                        'items-center',
                        'text-indigo-500',
                        'p-2'
                    )}
                >
                    <div className={classnames('mr-2.5')}>Manager your AWS profile</div>
                    <Icon icon="ri:share-box-fill" />
                </div>
            </Row>
            <Row>
                <Card
                    className={classnames('min-w-3/4')}
                    title="Nofification contacts"
                >
                    <Row>
                        <Col span={12}>
                            <div className={classnames('text-gray-900', 'font-extrabold')}>
                  Email
                            </div>
                            <div>Email notification are supported in AWS Regions</div>
                            <div
                                onClick={addEmail}
                                className={classnames(
                                    'mt-5',
                                    'flex',
                                    'items-center',
                                    'text-orange-400'
                                )}
                            >
                                <Icon icon="fluent:add-12-filled" />
                  Add email address
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={classnames('text-gray-900', 'font-extrabold')}>
                  SMS
                            </div>
                            <div>
                  SMS(text message) notifications are supported in AWS Regions
                  Where the Amazon Simple Notification Service is available.
                            </div>
                            <div
                                onClick={addSMS}
                                className={classnames(
                                    'flex',
                                    'items-center',
                                    'text-orange-400'
                                )}
                            >
                                <Icon icon="fluent:add-12-filled" />
                  Add SMS number
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className={classnames('text-gray-900', 'font-extrabold')}>
                  Wechat
                            </div>
                            <div>send notification through chat messages.</div>
                            <div>Corporaion ID:</div>
                            <div>Corporaion Secret:</div>
                            <div
                                className={classnames(
                                    'mt-5',
                                    'flex',
                                    'items-center',
                                    'text-orange-400'
                                )}
                            >
                                <Icon icon="fluent:add-12-filled" />
                  Configure
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Row>
        </>
    );
};
export default Component;