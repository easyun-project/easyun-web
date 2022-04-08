import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import DataCenterService from '@/service/dataCenterService';
import { useState,useEffect } from 'react';
import { Modal, Radio, Space,Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { EipInfoSimple } from '@/constant/dataCenter';
import serverService from '@/service/serverService';
import { getServerDetail } from '@/redux/serverSlice';
import { useNavigate } from 'react-router-dom';

export default function Network():JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const server = useSelector((state: RootState) => state.server.currentServer);
    const dc = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo?.dcName);
    const [isModalVisible, changeIsModalVisible] = useState(false);
    const [selectedEip, changeSelectedEip] = useState('');
    const [eips,changeEips] = useState<EipInfoSimple[]>([]);
    const [operating,changeOperating] = useState(false);
    const [hasEip,changehasEip] = useState<boolean>(server!.svrProperty.isEip);
    useEffect(
        ()=>{
            if(dc)
            {DataCenterService.listEipInfo(dc).then(
                (res)=>{
                    changeEips(res);
                },
                (error)=>console.log(error));
            }
            else{
                navigate('/home');
            }}
        ,[]);
    if (server) {
        return (
            <>
                <div className={classnames('text-2xl')}>IPv4 networking</div>
                <div className={classnames('text-gray-600')}>The public IP address of your instance is accessible to the internet.</div>
                <div className={classnames('text-gray-600')}>The private IP address is accessible only to other resources in your Datacenter.</div>
                <div className={classnames('flex','mt-6','mb-2')}>
                    {/* public ip part */}
                    <div className={classnames('w-96')}>
                        <div className={classnames('text-gray-400')}>PUBLIC IP</div>
                        <div className={classnames('rounded-border','mr-4','p-2')}>
                            {/* <div>{currentServerState.PublicIpAddress}</div> */}
                            <div className={classnames('text-2xl', 'font-bold')}>{server.svrNetworking.publicIp ? server.svrNetworking.publicIp : 'Null'}</div>
                            { hasEip
                                ?
                                <button onClick={()=>{
                                    changeOperating(true);
                                    serverService.bindServerEip({
                                        action:'detach',
                                        publicIp:server.svrNetworking.publicIp,
                                        svrId:server?.svrProperty.instanceId
                                    }).then(
                                        ()=>{
                                            dispatch(getServerDetail({
                                                serverId: server?.svrProperty.instanceId
                                            }));
                                            changehasEip(false);
                                            changeOperating(false);
                                        },
                                        ()=>changeOperating(false)
                                    );
                                }}
                                className={classnames('text-yellow-550')}>
                                    {operating
                                        ? <LoadingOutlined className={classnames('align-middle','mr-2')}/>
                                        : <Icon icon="clarity:times-line"
                                            className={classnames('inline-block', 'mx-1')}
                                            width="15"
                                            height="15"
                                            fr={undefined} />}
                                        Disassociate static EIP</button>
                                : (<><button onClick={ ()=>{
                                    changeOperating(true);
                                    DataCenterService.createEip(dc!).then(
                                        ()=>changeOperating(false)
                                    );
                                }}
                                className={classnames('inline', 'text-yellow-550')}>
                                    {operating
                                        ? <LoadingOutlined className={classnames('align-middle','mr-2')}/>
                                        : <Icon icon="carbon:add"
                                            className={classnames('inline-block', 'mx-1')}
                                            width="15"
                                            height="15"
                                            fr={undefined} />}
                                Create static IP</button>
                                <button onClick={()=>{
                                    changeIsModalVisible(true);
                                    DataCenterService.listEipInfo('Easyun').then(
                                        (res)=>{
                                            changeEips(res);
                                        },
                                        (error)=>console.log(error));
                                }}
                                className={classnames('inline', 'text-yellow-550')}>
                                    <Icon icon="fluent:branch-fork-20-regular"
                                        className={classnames('inline-block', 'mx-1')}
                                        width="15"
                                        height="15"
                                        fr={undefined} />Associate EIP</button>
                                <Modal title="Please select an eip." visible={isModalVisible}
                                    footer={[
                                        <Button key="back" onClick={()=>changeIsModalVisible(false)}>
                                Cancel
                                        </Button>,
                                        <Button key="submit" type="primary" loading={operating} onClick={
                                            ()=>{
                                                changeOperating(true);
                                                serverService.bindServerEip({
                                                    action: 'attach',
                                                    publicIp: selectedEip,
                                                    svrId: server?.svrProperty.instanceId
                                                }
                                                ).then(
                                                    ()=>{
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

                                    onCancel={()=>changeIsModalVisible(false)}>
                                    <Radio.Group onChange={(e)=>{changeSelectedEip(e.target.value);}} value={selectedEip}>
                                        <Space direction="vertical">
                                            { eips.map((item:EipInfoSimple)=>
                                                <Radio value={item.pubIp} key={item.alloId} disabled={!item.isAvailable}>
                                                    {item.pubIp}({item.isAvailable ? 'Available' : 'Unavailable'})
                                                </Radio>)}
                                        </Space>
                                    </Radio.Group>
                                </Modal></>)}
                        </div>

                    </div>
                    {/* private ip part */}
                    <div className={classnames('w-96')}>
                        <div className={classnames('text-gray-400')}>PRIVATE IP</div>
                        <div className={classnames('rounded-border','p-2')}>
                            <div className={classnames('text-2xl','font-bold')}>{server.svrNetworking.privateIp ? server.svrNetworking.privateIp : 'Null'}</div>
                            <div className={classnames('text-blue-500')}>
                                <a href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                                    What is this for?
                                    <Icon
                                        icon="akar-icons:link-out"
                                        className={classnames('inline-block', 'mx-1', 'text-blue-500')}
                                        width="15"
                                        height="15"
                                        fr={undefined}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classnames('text-gray-600', 'text-xs')}>Your public IPv4 address changes when you stop and start your instance.</div>
                <div className={classnames('text-gray-600', 'text-xs')}>Attach a static IPv4 address to your instance to keep it from changing.</div>
            </>);
    }
    else {
        return <></>;
    }

}
