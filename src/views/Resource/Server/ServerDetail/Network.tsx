import { putApiV1ServerEip } from "@/api-client";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import { getApiV1DatacenterSecgroupList as _dcSecgroupList, getApiV1DatacenterSubnetList as _dcSubnetList } from '@/api-client';
import { useState, useEffect } from 'react';
import { Modal, Radio, Space, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { StaticIpBasic } from '@/constant/dataCenter';
import { getServerDetail } from '@/redux/serverSlice';
import { useNavigate } from 'react-router-dom';
import { getApiV1DatacenterStaticipList, postApiV1DatacenterStaticip, deleteApiV1DatacenterStaticip } from '@/api-client';


export default function Network(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const server = useSelector((state: RootState) => state.server.currentServer);
    const dc = useSelector((state: RootState) => state.dataCenter.current?.dcName);
    const [isModalVisible, changeIsModalVisible] = useState(false);
    const [selectedEip, changeSelectedEip] = useState('');
    const [eips, changeEips] = useState<StaticIpBasic[]>([]);
    const [operating, changeOperating] = useState(false);
    const [hasEip, changehasEip] = useState<boolean>(server!.svrProperty.isEip);
    useEffect(
        () => {
            if (dc) {
                (getApiV1DatacenterStaticipList as any)({ query: { dc } }).then(({ data }: any) => data?.detail).then(
                    (res) => {
                        changeEips(res);
                    },
                    (error) => console.log(error));
            }
            else {
                navigate('/home');
            }
        }
        , []);
    if (server) {
        return (
            <>
                <div className={"text-2xl"}>IPv4 networking</div>
                <div className={"text-gray-600"}>The public IP address of your instance is accessible to the internet.</div>
                <div className={"text-gray-600"}>The private IP address is accessible only to other resources in your Datacenter.</div>
                <div className={"flex mt-6 mb-2"}>
                    {/* public ip part */}
                    <div className={"w-96"}>
                        <div className={"text-gray-400"}>PUBLIC IP</div>
                        <div className={"rounded-border mr-4 p-2"}>
                            {/* <div>{currentServerState.PublicIpAddress}</div> */}
                            <div className={"text-2xl font-bold"}>{server.svrNetworking.publicIp ? server.svrNetworking.publicIp : 'Null'}</div>
                            {hasEip
                                ?
                                <button className={"text-yellow-550"} onClick={() => {
                                    changeOperating(true);
                                    (putApiV1ServerEip as any)({ body: {
                                        action: 'detach',
                                        publicIp: server.svrNetworking.publicIp,
                                        svrId: server?.svrProperty.instanceId
                                    } }).then(
                                        () => {
                                            dispatch(getServerDetail({
                                                serverId: server?.svrProperty.instanceId
                                            }));
                                            changehasEip(false);
                                            changeOperating(false);
                                        },
                                        () => changeOperating(false)
                                    );
                                }}>
                                    {operating
                                        ? <LoadingOutlined className={"align-middle mr-2"} />
                                        : <Icon icon="clarity:times-line"
                                            className={"inline-block mx-1"}
                                            width="15"
                                            height="15"
                                            fr={undefined} />}
                                    Disassociate static EIP</button>
                                :
                                (<><button onClick={() => {
                                    changeOperating(true);
                                    (postApiV1DatacenterStaticip as any)({ body: { dcName: dc } }).then(
                                        () => changeOperating(false)
                                    );
                                }}
                                className={"inline text-yellow-550"}>
                                    {operating
                                        ? <LoadingOutlined className={"align-middle mr-2"} />
                                        : <Icon icon="carbon:add"
                                            className={"inline-block mx-1"}
                                            width="15"
                                            height="15"
                                            fr={undefined} />}
                                Create static IP</button>
                                <button onClick={() => {
                                    changeIsModalVisible(true);
                                    // fix-me: 不应该写死‘Easyun’
                                    (getApiV1DatacenterStaticipList as any)({ query: { dc: 'Easyun' } }).then(({ data }: any) => data?.detail).then(
                                        (res) => {
                                            changeEips(res);
                                        },
                                        (error) => console.log(error));
                                }}
                                className={"inline text-yellow-550"}>
                                    <Icon icon="fluent:branch-fork-20-regular"
                                        className={"inline-block mx-1"}
                                        width="15"
                                        height="15"
                                        fr={undefined} />Associate EIP</button>
                                <Modal title="Please select an eip." visible={isModalVisible}
                                    footer={[
                                        <Button key="back" onClick={() => changeIsModalVisible(false)}>
                                            Cancel
                                        </Button>,
                                        <Button key="submit" type="primary" loading={operating} onClick={
                                            () => {
                                                changeOperating(true);
                                                (putApiV1ServerEip as any)({ body: {
                                                    action: 'attach',
                                                    publicIp: selectedEip,
                                                    svrId: server?.svrProperty.instanceId
                                                } }
                                                ).then(
                                                    () => {
                                                        dispatch(getServerDetail({
                                                            serverId: server?.svrProperty.instanceId
                                                        }));
                                                        changeOperating(false);
                                                        changehasEip(true);
                                                        changeIsModalVisible(false);
                                                    }
                                                );
                                            }
                                        }>
                                            OK
                                        </Button>,
                                    ]}

                                    onCancel={() => changeIsModalVisible(false)}>
                                    <Radio.Group onChange={(e) => { changeSelectedEip(e.target.value); }} value={selectedEip}>
                                        <Space direction="vertical">
                                            {eips.map((item: StaticIpBasic) =>
                                                <Radio value={item.publicIp} key={item.eipId} disabled={!item.isAvailable}>
                                                    {item.publicIp}({item.isAvailable ? 'Available' : 'Unavailable'})
                                                </Radio>)}
                                        </Space>
                                    </Radio.Group>
                                </Modal></>)}
                        </div>
                    </div>
                    {/* private ip part */}
                    <div className={"w-96"}>
                        <div className={"text-gray-400"}>PRIVATE IP</div>
                        <div className={"rounded-border p-2"}>
                            <div className={"text-2xl font-bold"}>{server.svrNetworking.privateIp ? server.svrNetworking.privateIp : 'Null'}</div>
                            <div className={"text-blue-500"}>
                                <a href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                                    What is this for?
                                    <Icon
                                        icon="akar-icons:link-out"
                                        className={"inline-block mx-1 text-blue-500"}
                                        width="15"
                                        height="15"
                                        fr={undefined}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"text-gray-600 text-xs"}>Your public IPv4 address changes when you stop and start your instance.</div>
                <div className={"text-gray-600 text-xs"}>Attach a static IPv4 address to your instance to keep it from changing.</div>
            </>);
    }
    else {
        return <></>;
    }
}
