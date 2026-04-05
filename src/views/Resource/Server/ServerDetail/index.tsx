import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Col, message, Row, Tabs, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { getServerDetail } from '@/redux/serverSlice';
import { RootState } from '@/redux/store';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import Detail from './Detail';
import Config from './Config';
import Disk from './Disk';
import Security from './Security';
import Connect from './Connect';
import Network from './Network';
import Tags from './Tags';
import { postApiV1ServerAction, deleteApiV1Server, postApiV1ServerConfig, putApiV1ServerName, putApiV1ServerDisk, putApiV1ServerEip, putApiV1ServerSecgroup, getApiV1ServerParamImage, getApiV1ServerParamInstypeList, getApiV1ServerParamInsfamily, postApiV1Server, getApiV1ServerDetailBySvrId, deleteApiV1ServerTagsBySvrId, putApiV1ServerTagsBySvrId } from '@/api-client';
import { LoadingOutlined } from '@ant-design/icons';



const { TabPane } = Tabs;


const ServerDetail = ():JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const serverId = params.serverId;
    const serverState = useSelector((state: RootState) => state.server);
    const server = serverState.currentServer;
    const [firstLoading,changeFirstLoading] = useState(true);
    const [seletedTab, changeSelectedTab] = useState('Detail');

    useEffect(() => {
        const init = async ()=>dispatch(getServerDetail({ serverId: serverId! }));
        init().then(()=>changeFirstLoading(false));
    }, []);

    if(firstLoading){
        return (
            <CPartialLoading classes={"h-96"}/>
        );
    }

    else if (!server) {
        alert('请求详细信息出错！');
        return <div>没有服务器的详细信息</div>;
    }

    else {
        let color: string;
        // 刷新n次，每次间隔5s
        const refresh = (times?:number)=>{
            const serverId = server.svrProperty.instanceId;
            const m = times ? times : 5;
            let n = 1;
            function time()
            {
                if( n > m) return;
                dispatch(getServerDetail({ serverId }));
                n ++;
                setTimeout(time,5000); //time是指本身,延时递归调用自己,间隔调用时间5s,单位毫秒
            }
            time();
        };
        if (server.svrProperty.status === 'running') {
            color = "text-green-600";
        } else if (server.svrProperty.status == 'stopped') {
            color = "text-red-700";
        } else {
            color = "text-yellow-550";
        }
        return (
            <div className={"ml-3 mt-5"}>
                <Row gutter={16}>
                    <Col span={2}>
                        <Icon icon="logos:ubuntu" width={60} fr={undefined}/>
                    </Col>
                    <Col span={4}>
                        <div id="serverInfo">
                            <Typography.Title level={4}>{server.svrProperty.instanceName}</Typography.Title>
                            <div>
                            instance Type : {server.svrProperty.instanceType}({server.svrProperty.vCpu}vCPU, {server.svrProperty.memory} Gib)
                            </div>
                            <div>Private Ip: {server.svrNetworking.privateIp}</div>
                            <div>Public Ip: {server.svrNetworking.publicIp}</div>
                        </div>
                    </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <div id="operationPanel">
                            <div className={"my-2"}>
                            Status:
                                <span className={clsx(color, 'mx-2')}>{server.svrProperty.status}</span>
                                {serverState.loading ? <LoadingOutlined /> : null}
                            </div>
                            <div className={"flex"}>
                                <button className={"btn-yellow w-32 m-5"} value='start' onClick={(e)=>postApiV1ServerAction({ body: {
                                    action: e.currentTarget.value,
                                    svr_ids: [serverId]
                                } as any }).then(()=>refresh(3))
                                }>
                            Start
                                </button>
                                <button className={"btn-yellow w-32 m-5"} value='stop' onClick={(e)=>postApiV1ServerAction({ body: {
                                    action: e.currentTarget.value,
                                    svr_ids: [serverId]
                                } as any }).then(()=>refresh(6))
                                }>
                            Stop
                                </button>
                                <button className={"btn-yellow w-32 m-5"} value='restart' onClick={(e)=>postApiV1ServerAction({ body: {
                                    action: e.currentTarget.value,
                                    svr_ids: [serverId]
                                } as any }).then(()=>refresh(8))}>
                            Restart
                                </button>
                                <button className={"btn-red w-32 m-5"} value='delete' onClick={()=>message.info('I think you delete the instance')}>
                            Delete
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Tabs className={"pl-3"} activeKey={seletedTab} onChange={(key=>changeSelectedTab(key))}>
                    <TabPane tab="Detail" key="Detail">
                        <Detail />
                    </TabPane>

                    <TabPane tab="Config" key="Config">
                        <Config />
                    </TabPane>

                    <TabPane tab="Disk" key="Disk">
                        <Disk />
                    </TabPane>

                    <TabPane tab="Networking" key="Networking">
                        <Network />
                    </TabPane>

                    <TabPane tab="Security" key="Security">
                        <Security />
                    </TabPane>

                    <TabPane tab="Tags" key="Tags">
                        <Tags />
                    </TabPane>

                    <TabPane tab="Connect" key="Connect">
                        <Connect />
                    </TabPane>
                </Tabs>

            </div>
        );
    };};

export default ServerDetail;