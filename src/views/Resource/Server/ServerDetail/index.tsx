import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Col, message, Row, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServerDetail } from '@/redux/serverSlice';
import { RootState } from '@/redux/store';
import { ServerDetailParams } from '@/service/serverService';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import Detail from './Detail';
import Config from './Config';
import Disk from './Disk';
import Security from './Security';
import Connect from './Connect';
import Network from './Network';
import Tags from './Tags';
import serverService from '@/service/serverService';
import { LoadingOutlined } from '@ant-design/icons';



const { TabPane } = Tabs;


export const ServerDetail = ():JSX.Element => {
    const params = useParams();
    const serverId = params.serverId;
    // const userState = useSelector((state: RootState) => {
    //     return state.user.user;
    // });
    const serverState = useSelector((state: RootState) => {
        return state.server;
    });
    const server = serverState.currentServer;
    const dispatch = useDispatch();
    const [seletedTab, changeSelectedTab] = useState('Detail');
    useEffect(() => {
        const params: ServerDetailParams = {
            serverId: serverId!
        };
        dispatch(getServerDetail(params));
    }, []);

    let color: TTailwindString;

    // 刷新n次，每次间隔5s
    const refresh = (times?:number)=>{
        const m = times ? times : 5;
        let n = 1;
        function time()
        {
            if( n > m) return;
            dispatch(getServerDetail({ serverId:server!.svrProperty.instanceId }));
            n ++;
            setTimeout(time,5000); //time是指本身,延时递归调用自己,间隔调用时间5s,单位毫秒
        }
        time();
    };

    if (!server) {
        return (
            <div>暂时没有服务器的详细数据</div>
        );
    }

    else {
        if (server.svrProperty.status === 'running') {
            color = classnames('text-green-600');
        } else if (server.svrProperty.status == 'stopped') {
            color = classnames('text-red-700');
        } else {
            color = classnames('text-yellow-550');
        }
        return (
            <div className={classnames('ml-3','mt-5')}>
                <Row>
                    <Col span={2}>
                        <Icon
                            icon="logos:ubuntu"
                            width={60}
                            fr={undefined}/>
                    </Col>
                    <Col span={4}>
                        <div id="serverInfo">
                            <h1>{server.svrProperty.instanceName}</h1>
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
                            <div className={classnames('my-2')}>
                            Status:
                                <span className={classnames(color, 'mx-2')}>{server.svrProperty.status}</span>
                                {serverState.loading ? <LoadingOutlined /> : null}
                            </div>
                            <div className={classnames('flex')}>
                                <button className={classnames('btn-yellow','w-32','m-5')} value='start' onClick={(e)=>serverService.changeServerState({
                                    action: e.currentTarget.value,
                                    svr_ids: [serverId]
                                }).then(()=>refresh(3))
                                }>
                            Start
                                </button>
                                <button className={classnames('btn-yellow','w-32','m-5')} value='stop' onClick={(e)=>serverService.changeServerState({
                                    action: e.currentTarget.value,
                                    svr_ids: [serverId]
                                }).then(()=>refresh(6))
                                }>
                            Stop
                                </button>
                                <button className={classnames('btn-yellow','w-32','m-5')} value='restart' onClick={(e)=>serverService.changeServerState({
                                    action: e.currentTarget.value,
                                    svr_ids: [serverId]
                                }).then(()=>refresh(8))}>
                            Restart
                                </button>
                                <button className={classnames('btn-red','w-32','m-5')} value='delete' onClick={()=>message.info('I think you delete the instance')}>
                            Delete
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Tabs className={classnames('pl-3')} activeKey={seletedTab} onChange={(key=>changeSelectedTab(key))}>
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