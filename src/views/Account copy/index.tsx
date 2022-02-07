import React, { useState, useEffect } from 'react';
import './index.css';
import {
    Row,
    Col,
    Card,
    Radio,
    Space,
    Checkbox,
    DatePicker,
    message,
} from 'antd';
import { Icon } from '@iconify/react';
import accountService from '@/service/accountService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Account = (): JSX.Element => {
    const [count, setCount] = useState(1);
    const [info, setInfo] = useState({
        account_id: '',
        aws_type: '',
        role: '',
    });
    const userState = useSelector((state: RootState) => {
        return state.user.user;
    });
    const getAwsInfo = async () => {
        const res = await accountService.getAwsInfo(userState.token);
        setInfo({
            account_id: res.detail.account_id,
            aws_type: res.detail.aws_type,
            role: res.detail.role,
        });
    };
    useEffect(() => {
        getAwsInfo();
    }, []);
    const onChange = (e) => {
        setCount(e.target.value);
    };
    const [freeChecked, setFreeChecked] = useState(true);
    const onChangeFree = (e) => {
        setFreeChecked(e.target.checked);
    };
    const [activationData, setActivationData] = useState('');
    const onChangeActivationData = (date, dateString) => {
        console.log(date, dateString);
        setActivationData(dateString);
    };
    const openMangerAwsProfile = () => {
        const url = 'https://console.aws.amazon.com/billing/home/?region=us-east-1#/account';
        window.open(url, '_blank');
    };
    const openIAMconsle = () => {
        const url = 'https://console.aws.amazon.com/iam/home?region=us-east-1#/security_credential';
        window.open(url, '_blank');
    };
    const addEmail = () => {
        message.warning('正在火速研发中!');
    };
    const addSMS = () => {
        message.warning('正在火速研发中!');
    };
    const createSSHKey = () => {
        message.warning('正在火速研发中!');
    };
    const uploadSSHKey = () => {
        message.warning('正在火速研发中!');
    };
    const downloadSSHItem = () => {
        message.warning('正在火速研发中!');
    };
    const deleteSSHItem = () => {
        message.warning('正在火速研发中!');
    };
    return (
        <div className="min-h-screen">
            <Row className="content-body">
                <Col span={12}>
                    <div>
                        <div className="color-black-weight800">
                            Account ID:{info.account_id}[{info.aws_type}]
                        </div>
                        <div>sercurity-credentials: {info.role}</div>
                    </div>
                </Col>

                <Col span={12}>
                    <div>
                        <div>
                            <Checkbox checked={freeChecked} onChange={onChangeFree}>
                                Free Tier Reminder
                            </Checkbox>
                        </div>
                        <div>
                            Activation data:{' '}
                            <DatePicker size="small" onChange={onChangeActivationData}/>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="content-body">
                <Card
                    className="card-item"
                    title="Profile & contacts"
                    style={{ width: '100%' }}
                >
                    <ul className="list-style-disc">
                        <li className="color-link">
                            <div
                                className="flex-center pointer"
                                onClick={openMangerAwsProfile}
                            >
                                <div>Manager your AWS profile</div>
                                <Icon icon="ri:share-box-fill" fr={undefined}/>
                            </div>
                        </li>
                        <li>Nofification contacts</li>
                    </ul>
                    <Row>
                        <Col span={12}>Email notification are supported in AWS Regions</Col>
                        <Col span={12}>
                            SMS(text message) notifications are supported in AWS Regions Where
                            the Amazon Simple Notification Service is available.
                        </Col>
                    </Row>
                    <Row className="yellow-text-color">
                        <Col span={12}>
                            <div onClick={addEmail} className="flex-align-center">
                                <Icon icon="fluent:add-12-filled" fr={undefined}/>
                                Add email address
                            </div>
                        </Col>
                        <Col span={12} className="flex-align-center">
                            <div onClick={addSMS} className="flex-align-center">
                                <Icon icon="fluent:add-12-filled" fr={undefined}/>
                                Add SMS number
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card className="card-item" title="SSH keys" style={{ width: '100%' }}>
                    <div className="flex-align-center yellow-text-color">
                        <div
                            className="text-icon-box margin-right-10"
                            onClick={createSSHKey}
                        >
                            <div>Create New</div>
                            <Icon icon="fluent:add-12-filled" fr={undefined}/>
                        </div>
                        <div className="text-icon-box" onClick={uploadSSHKey}>
                            <div>Upload New</div>
                            <Icon icon="eva:upload-fill" fr={undefined}/>
                        </div>
                    </div>
                    <Radio.Group onChange={onChange} value={count}>
                        <Space direction="vertical">
                            <Radio value={1}>
                                <div className="sshkey-radio-row">
                                    <div>key-easyun-user</div>
                                    <div className="flex-center">
                                        <div
                                            className="text-icon-box margin-right-10"
                                            onClick={downloadSSHItem}
                                        >
                                            <div>Download</div>
                                            <Icon
                                                icon="ant-design:download-outlined"
                                                fr={undefined}
                                            />
                                        </div>
                                        <Icon
                                            className="text-icon-box"
                                            icon="fluent:delete-off-20-regular"
                                            fr={undefined}
                                        />
                                    </div>
                                </div>
                            </Radio>
                            <Radio value={2}>
                                <div className="sshkey-radio-row">
                                    <div>key-easyun-dev</div>
                                    <div className="flex-center">
                                        <div
                                            className="text-icon-box margin-right-10"
                                            onClick={downloadSSHItem}
                                        >
                                            <div>Download</div>
                                            <Icon
                                                icon="ant-design:download-outlined"
                                                fr={undefined}
                                            />
                                        </div>
                                        <Icon
                                            className="text-icon-box"
                                            icon="fluent:delete-off-20-regular"
                                            fr={undefined}
                                        />
                                    </div>
                                </div>
                            </Radio>
                        </Space>
                    </Radio.Group>
                    <div className="margin-top-10 color-gray">
                        you can store up to 100 keys per AWS Region.
                    </div>
                </Card>
                <Card
                    className="card-item"
                    title="API access keys"
                    style={{ width: '100%' }}
                >
                    <div className="color-gray">
                        if you want to use AWS API. you must create API access keys setion
                        of the AWS console.
                    </div>
                    <div>
                        <ul className="list-style-disc">
                            <li>
                                <div
                                    className="flex-center color-link pointer"
                                    onClick={openIAMconsle}
                                >
                                    <div>Go to the IAM console.</div>
                                    <Icon icon="ri:share-box-fill" fr={undefined}/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Account;
