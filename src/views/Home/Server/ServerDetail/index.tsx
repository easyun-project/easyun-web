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
import Disk from './Disk';



const { TabPane } = Tabs;


export const ServerDetail = ():JSX.Element => {
    const params = useParams();
    const serverId = params.serverId;
    const userState = useSelector((state: RootState) => {
        return state.user.user;
    });
    const serverState = useSelector((state: RootState) => {
        return state.server;
    });
    const server = serverState.currentServer;
    const dispatch = useDispatch();
    useEffect(() => {
        const params: ServerDetailParams = {
            serverId: serverId!,
            token: userState!.token
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
    if (server.ServerState === 'running') {
        color = classnames('text-green-600');
    } else if (server.ServerState == 'stopped') {
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
                        <h1>{server.KeyName}</h1>
                        <div>
                            instance Type : {server.InstanceType}({server.VCpu}vCPU, {server.Memory} Gib)
                        </div>
                        <div>Private Ip: {server.PrivateIpAddress}</div>
                        <div>Public Ip: {server.PublicIpAddress}</div>
                    </div>
                </Col>
                <Col span={8}>
                    <div id="operationPanel">
                        <div className={classnames('my-2')}>
                            Status:
                            <span className={classnames(color, 'ml-2')}>{server.ServerState}</span>
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
                            Reboot
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

                <TabPane tab="Disk" key="Disk">
                    <Disk />
                </TabPane>

                <TabPane tab="Networking" key="Networking">
                </TabPane>

                <TabPane tab="Security" key="Security">
                </TabPane>

                <TabPane tab="Tags" key="Tags">
                </TabPane>

                <TabPane tab="Connect" key="Connect">
                </TabPane>
            </Tabs>

        </div>
    );
};

export default ServerDetail;