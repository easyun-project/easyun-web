import { X, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { getApiV1AccountKeypairList, getApiV1AccountKeypairStoreByKeyName, deleteApiV1AccountKeypair, getApiV1AccountReminderFreetier, putApiV1AccountReminderFreetier } from '@/api-client';
const Component = (): JSX.Element => {
    const [ remainder, setRemainder ] = useState(0);
    // 这个接口暂时有问题
    const getRemainder = async () => {
        const { data } = await getApiV1AccountReminderFreetier();
        const { remainder } = data?.detail as any;
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
            toast.warning('select date!');
            return;
        };
        const { data } = await putApiV1AccountReminderFreetier({ body: {
            active_date: activationData,
        } as any });
        const res = data?.detail as any;
        setStatusData(true);
        setRemainder(res.remainder);
        toast.warning(`remainder time ${res.remainder} day`);
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
            <div className="flex flex-wrap">
                <div className={"min-w-3/4"} title="Reminder">
                    <div>
                        <div>
                            <Switch
                                checked={checkedFree}
                                onCheckedChange={onChangeFree}
                                className={"mr-1"}
                               
                               
                            />
                Free Tier Reminder
                        </div>
                        <div className={"ml-12 flex"}>
                            <div>Activation data:</div>
                            <div className={"flex items-center"}>
                                <Input type="date"
                                    className={"ml-4"}
                                    
                                    onChange={(e) => onChangeActivationData(null, e.target.value)}
                                />
                                <Icon
                                    icon="ant-design:check-circle-outlined"
                                    width="30"
                                    height="30"
                                    onClick={onChangeStatusData}
                                    className={
                                        statusData
                                            ? "text-emerald-500 ml-2"
                                            : "text-gray-500 ml-2"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"mt-10"}>
                        <div>
                            <Switch
                                disabled={true}
                                checked={checkedCredits}
                                onCheckedChange={onChangeCredits}
                               
                               
                            />
                Credits Reminder
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Component;
