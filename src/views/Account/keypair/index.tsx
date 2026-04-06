import { SimpleSelect as Select, SimpleOption as Option } from '@/components/ui/simple-select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { Icon } from '@iconify/react';
import { getApiV1AccountKeypairList, getApiV1AccountKeypairStoreByKeyName, deleteApiV1AccountKeypair, getApiV1AccountReminderFreetier, putApiV1AccountReminderFreetier } from '@/api-client';
import { IsshkeyItem } from '@/constant/awsInfo';
interface itemSSHKey {
  name: string;
  list: IsshkeyItem[];
}
const olddata = [
    {
        id: 0,
        key_name: 'key-easyun-user',
        region: 'EASYUN',
    },
    {
        id: 1,
        key_name: 'key-easyun-test1',
        region: 'EASYUN',
    },
    {
        id: 2,
        key_name: 'ap-southeast-1',
        region: 'DM-DC',
    },
    {
        id: 3,
        key_name: 'ap-southeast-2',
        region: 'DM-DC',
    },
];
const Component = (): JSX.Element => {
    
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
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
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    // region 动态拼接
    const region = 'us-east-1';
    const openIAMconsle = () => {
        const url = `https://console.aws.amazon.com/iam/home?region=${region}#/security_credential`;
        window.open(url, '_blank');
    };
    // 下载key
    const downItem = (id)=>{
        window.open(`/api/v1/account/keypair/store/${id}`, '_blank');
    };
    // 删除key
    const deleteItem = async (id)=>{
        const { data } = await (deleteApiV1AccountKeypair as any)({ query: { key_name: id } });
        const res = data;
        toast.success(res.message);
    };
    return (
        <>
            <div className="flex flex-wrap">
                <div className={"min-w-3/4"} title="SSH keys">
                    <div>you can store up to 100 keys per AWS Region.</div>
                    {list.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className={"flex items-center"}>
                                    <Icon
                                        className={"text-orange-400 mr-1"}
                                        icon="ant-design:cloud-sync-outlined"
                                        width="30"
                                        height="30"
                                    />
                                    <div>{item.name}</div>
                                </div>
                                <div className={"ml-10"}>
                                    {item.list.map((kitem, kindex) => {
                                        return (
                                            <div
                                                key={kindex}
                                                className={"flex items-center justify-between border-b-2"}
                                            >
                                                <div
                                                    className={"flex items-center"}
                                                >
                                                    <Icon
                                                        className={"mr-2 text-orange-400"}
                                                        icon="codicon:key"
                                                        width="18"
                                                        height="18"
                                                        rotate={3}
                                                    />
                                                    {kitem.key_name}
                                                </div>
                                                <div
                                                    className={"flex items-center text-orange-400"}
                                                >
                                              Download
                                                    <Icon
                                                        onClick={()=>{downItem(kitem.id);}}
                                                        className={"ml-2 mr-10"}
                                                        icon="entypo:download"
                                                        width="18"
                                                        height="18"
                                                    />
                                                    <Icon
                                                        onClick={()=>{
                                                            deleteItem(
                                                                kitem.id
                                                            );
                                                        }}
                                                        icon="ci:close-big"
                                                        width="18"
                                                        height="18"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                    <div
                        className={"flex justify-end items-center mt-4 text-orange-400"}
                    >
                        <div
                            className={"flex items-center"}
                            onClick={showModal}
                        >
                            <Icon icon="carbon:add" width="30" height="30" />
              Add SSH key
                        </div>
                    </div>
                </div>
                <div className={"min-w-3/4 mt-10"} title="API access keys">
                    <div>
            if you want to use AWS API. you must create API access keys in the
            Access keys section of the AWS IAM console.
                        <div
                            onClick={openIAMconsle}
                            className={"flex items-center text-blue-600 underline w-48"}
                        >
              Go to the IAM console.
                            <Icon icon="ri:share-box-fill" />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Add SSH key"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>
                    <div>
                        <div>key name:</div>
                        <div>
                            <Input placeholder="" />
                        </div>
                    </div>
                    <div>
                        <div>the key is used datacenter:</div>
                        <div>
                            <Select
                                defaultValue=""
                               
                                onValueChange={handleChange}
                            >
                                <Option value="A">A</Option>
                                <Option value="B">B</Option>
                                <Option value="C">C</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default Component;
