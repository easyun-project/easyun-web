import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { CButton } from '@/components/Common/CButton';
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
    useEffect(() => {
        const params: ServerDetailParams = {
            serverId: serverId!
        };
        dispatch(getServerDetail(params));
    }, [dispatch]);

    if (serverState.loading) {
        return (
            <CPartialLoading classes={classnames('h-96')}/>
        );
    }
    if (!server) {
        return (
            <div>没有服务器的详细数据</div>
        );
    }
    let color: TTailwindString;
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
                <Col span={12}>
                    <div id="serverInfo">
                        <h1>{server.svrProperty.instanceId}</h1>
                        <div>
                            instance Type : {server.svrProperty.instanceType}({server.svrProperty.vCpu}vCPU, {server.svrProperty.memory} Gib)
                        </div>
                        <div>Private Ip: {server.svrNetworking.privateIp}</div>
                        <div>Public Ip: {server.svrNetworking.publicIp}</div>
                    </div>
                </Col>
                <Col span={8}>
                    <div id="operationPanel">
                        <div className={classnames('my-2')}>
                            Status:
                            <span className={classnames(color, 'ml-2')}>{server.svrProperty.status}</span>
                        </div>
                        <CButton
                            click={() => {
                                message.info('I think you stop the instance');
                            }}
                            classes={classnames('mr-2', 'inline-block', 'bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-2')}>
                            Stop
                        </CButton>
                        <CButton
                            click={() => {
                                message.info('I think you reboot the instance');
                            }}
                            classes={classnames('mr-2', 'inline-block', 'bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-2')}>
                            Restart
                        </CButton>
                        <CButton
                            click={() => {
                                message.error('I think you delete the instance');
                            }}
                            classes={classnames('inline-block', 'bg-red-700', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-2')}>
                            Delete instance
                        </CButton>
                    </div>
                </Col>
            </Row>
            <Tabs className={classnames('pl-3')} defaultActiveKey="1">
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
};

export default ServerDetail;