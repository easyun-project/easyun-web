import React, { useState, useEffect } from 'react';
import {
    Row,
    Card,
    message,
    Switch,
    DatePicker,
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import accountService from '@/service/accountService';
const Component = (): JSX.Element => {
    const [ remainder, setRemainder ] = useState(0);
    // 这个接口暂时有问题
    const getRemainder = async () => {
        const { remainder } = await accountService.getFreeTier();
        setRemainder(remainder);
    };
    const [ checkedFree, setCheckedFree ] = useState(false);
    const onChangeFree = (value) => {
        setCheckedFree(value);
    };
    const [ checkedCredits, setCheckedCredits ] = useState(false);
    const onChangeCredits = (value) => {
        setCheckedCredits(value);
    };
    const [ activationData, setActivationData ] = useState('');
    const onChangeActivationData = (date, dateString) => {
        console.log(date, dateString);
        setActivationData(dateString);
    };
    const [ statusData, setStatusData ] = useState(false);
    const onChangeStatusData = async () => {
        if (!activationData){
            message.warning('select date!');
            return;
        };
        const res = await accountService.putFreeTire({
            active_date: activationData,
        });
        setStatusData(true);
        // 设置天数
        setRemainder(res.remainder);
        // 剩余天数
        message.warning(`remainder time ${res.remainder} day`);
    };
    useEffect(() => {
        getRemainder();

    }, []);
    // 动态拼接region部分:
    const region = 'us-east-1';
    const openMangerAwsProfile = () => {
        const url = `https://console.aws.amazon.com/billing/home/?region=${region}#/account`;
        window.open(url, '_blank');
    };
    return (
        <>
            <Row>
                <Card className={classnames('min-w-3/4')} title="Reminder">
                    <div>
                        <div>
                            <Switch
                                checked={checkedFree}
                                onChange={onChangeFree}
                                className={classnames('mr-1')}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                Free Tier Reminder
                        </div>
                        <div className={classnames('ml-12', 'flex')}>
                            <div>Activation data:</div>
                            <div className={classnames('flex', 'items-center')}>
                                <DatePicker
                                    className={classnames('ml-4')}
                                    size="small"
                                    onChange={onChangeActivationData}
                                />
                                <Icon
                                    icon="ant-design:check-circle-outlined"
                                    width="30"
                                    height="30"
                                    onClick={onChangeStatusData}
                                    className={
                                        statusData
                                            ? classnames('text-emerald-500', 'ml-2')
                                            : classnames('text-gray-500', 'ml-2')
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classnames('mt-10')}>
                        <div>
                            <Switch
                                disabled={true}
                                checked={checkedCredits}
                                onChange={onChangeCredits}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                            />
                Credits Reminder
                        </div>
                    </div>
                </Card>
            </Row>
        </>
    );
};
export default Component;
