import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { Icon } from '@iconify/react';
import { getApiV1AccountKeypairList, getApiV1AccountKeypairStoreByKeyName, deleteApiV1AccountKeypair, getApiV1AccountReminderFreetier, putApiV1AccountReminderFreetier } from '@/api-client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
const  Component = (): JSX.Element => {
    const userState = useSelector((state: RootState) => {
        return state.user.currentUser;
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
        toast.warning('正在火速研发中!');
    };
    // 新增SMS
    const addSMS = () => {
        toast.warning('正在火速研发中!');
    };
    return (
        <>
            <Row>
                <Col span={1}>
                    <Icon
                        className={"mx-0 inline-block"}
                        width="50"
                        height="50"
                        icon="bi:person-circle"
                    />
                </Col>
                <Col span={23}>
                    <div>
              Account ID: {userState.accountId} [{userState.accountType}]
                    </div>
                    <div>Sercurity credentials: {userState.role}</div>
                </Col>
            </Row>
            <Row>
                <div
                    onClick={openMangerAwsProfile}
                    className={"flex items-center text-indigo-500 p-2"}
                >
                    <div className={"mr-2.5"}>Manager your AWS profile</div>
                    <Icon icon="ri:share-box-fill" />
                </div>
            </Row>
            <Row>
                <Card
                    className={"min-w-3/4"}
                    title="Nofification contacts"
                >
                    <Row>
                        <Col span={12}>
                            <div className={"text-gray-900 font-extrabold"}>
                  Email
                            </div>
                            <div>Email notification are supported in AWS Regions</div>
                            <div
                                onClick={addEmail}
                                className={"mt-5 flex items-center text-orange-400"}
                            >
                                <Icon icon="fluent:add-12-filled" />
                  Add email address
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={"text-gray-900 font-extrabold"}>
                  SMS
                            </div>
                            <div>
                  SMS(text message) notifications are supported in AWS Regions
                  Where the Amazon Simple Notification Service is available.
                            </div>
                            <div
                                onClick={addSMS}
                                className={"flex items-center text-orange-400"}
                            >
                                <Icon icon="fluent:add-12-filled" />
                  Add SMS number
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className={"text-gray-900 font-extrabold"}>
                  Wechat
                            </div>
                            <div>send notification through chat messages.</div>
                            <div>Corporaion ID:</div>
                            <div>Corporaion Secret:</div>
                            <div
                                className={"mt-5 flex items-center text-orange-400"}
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