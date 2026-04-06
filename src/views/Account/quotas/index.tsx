import { Switch } from '@/components/ui/switch';
import React, { useState, useEffect } from 'react';
import { Card, message, DatePicker } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { getApiV1AccountKeypairList, getApiV1AccountKeypairStoreByKeyName, deleteApiV1AccountKeypair, getApiV1AccountReminderFreetier, putApiV1AccountReminderFreetier } from '@/api-client';
import { IsshkeyItem } from '@/constant/awsInfo';
interface itemSSHKey {
  name: string;
  list: IsshkeyItem[];
}
const Component = (): JSX.Element => {
    function handleSourceData(olddata) {
        // 对数据进行分组
        const groupObj = {};
        olddata.forEach((item) => {
            const { region } = item;
            if (groupObj[region]) {
                groupObj[region].push(item);
            } else {
                groupObj[region] = [item];
            }
        });
        // 接口描述数组
        const groupList: Array<itemSSHKey> = [];
        Object.keys(groupObj).forEach((key) => {
            groupList.push({ name: key, list: groupObj[key] });
        });
        return groupList;
    }
    // 对数据进行分组
    const [list, setList] = useState<itemSSHKey[]>([]);
    const getList = async () => {
        const { data } = await getApiV1AccountKeypairList({} as any);
        const res = data?.detail as any;
        const groupList = handleSourceData(res);
        setList(groupList);
    };
    useEffect(() => {
        getList();
    }, []);
    // 动态拼接region部分:
    const region = 'us-east-1';
    const openRegionDashboard = () => {
        const url = `https://console.aws.amazon.com/servicequotas/home/?region=${region}#!/dashboard`;
        window.open(url, '_blank');
    };
    return (
        <>
            <div className="flex flex-wrap">
                <div>
          Service Quotas enables you to view and manage you quotas for AWS
          services in a Region. Quotas also referred to as limits in AWS, are
          the maximum values for the resources, actions. and items in your AWS
          accout.
                </div>
                {
                    list.map((item,index)=>{
                        return (
                            <div key={index} className={'w-11/12'}>
                                <div className={"flex items-center"}>
                                    <div>{item.name} </div>
                                    <div
                                        onClick={openRegionDashboard}
                                        className={"flex items-center ml-2 text-blue-600"}
                                    >
                                view quotas
                                        <Icon icon="ri:share-box-fill" />
                                    </div>
                                </div>

                                <div className={"flex ml-10"}>
                                    {item.list.map((xtem, xdex) => {
                                        return (
                                            <div key={xdex}>{xtem.item_name || '无'}</div>
                                        );
                                    })}
                                </div>
                                <div
                                    className={"h-52 ml-10 border-2"}
                                >
                                    {item.list.map((xtem, xdex) => {
                                        return <div key={xdex}>{xtem.key_name}</div>;
                                    })}
                                </div>
                            </div>
                        );
                    })
                }
                <div>

                </div>
            </div>
        </>
    );
};
export default Component;
