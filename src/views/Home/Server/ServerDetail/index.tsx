import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { CButton } from '@/components/Common/CButton';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Col, Divider, message, Row, Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getServerDetail } from '@/redux/serverSlice';
import { RootState } from '@/redux/store';
import { ServerDetailParams } from '@/service/serverService';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const { TabPane } = Tabs;


export const ServerDetail = () => {
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
        <div className={classnames('ml-3')}>
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
                    <div id='instanceId'>
                        Instance Id:
                        <CopyToClipboard text={server.InstanceId}
                            onCopy={() => {
                                message.success('copied to clipboard!');
                            }}>
                            <span>
                                <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                    fr={undefined}/>
                                {server.InstanceId}</span>
                        </CopyToClipboard>
                    </div>

                    <div>
                        Launch Time: {server.LaunchTime}
                    </div>

                    <div id='hostnameType' className={classnames('mt-4')}>
                        <div>Hostname Type</div>
                        <div id='ipName'>
                            IP name:
                            <CopyToClipboard text={server.IpName}
                                onCopy={() => {
                                    message.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.IpName}</span>
                            </CopyToClipboard>
                        </div>
                        <div id='privateIpDNS'>
                            Private Ipv4 DNS:
                            <CopyToClipboard text={server.PrivateDnsName}
                                onCopy={() => {
                                    message.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.PrivateDnsName}</span>
                            </CopyToClipboard>
                        </div>
                        <div id='publicIpDNS'>
                            Public Ipv4 DNS:
                            <CopyToClipboard text={server.PublicDnsName}
                                onCopy={() => {
                                    message.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.PublicDnsName}</span>
                            </CopyToClipboard>
                        </div>
                    </div>

                    <div id='platformDetail' className={classnames('mt-5')}>
                        <Row>
                            <Col span={8}>
                                <div>
                                    Platform details: {server.PlatformDetails}
                                </div>

                                <div>
                                    Virtualization: {server.VirtualizationType}
                                </div>

                                <div>
                                    Tenancy: {}
                                </div>
                                <div>
                                    Usage operation: {server.UsageOperation}
                                </div>

                                <div>
                                    Monitoring: {server.Monitoring}
                                </div>

                                <div>
                                    Termination protection: {}
                                </div>

                            </Col>
                            <Col span={2}>
                                <Divider type={'vertical'}/>
                            </Col>
                            <Col span={8}>
                                <div id='amiId'>
                                    AMI ID:
                                    <CopyToClipboard text={server.ImageId}
                                        onCopy={() => {
                                            message.success('copied to clipboard!');
                                        }}>
                                        <span>
                                            <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                                fr={undefined}/>
                                            {server.ImageId}</span>
                                    </CopyToClipboard>
                                </div>

                                <div id='amiName'>
                                    AMI Name:
                                    <CopyToClipboard text={server.ImageName}
                                        onCopy={() => {
                                            message.success('copied to clipboard!');
                                        }}>
                                        <span>
                                            <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                                fr={undefined}/>
                                            {server.ImageName}
                                        </span>
                                    </CopyToClipboard>
                                </div>

                                <div id='amiPath'>
                                    AMI Path:
                                    <CopyToClipboard text={server.ImagePath}
                                        onCopy={() => {
                                            message.success('copied to clipboard!');
                                        }}>
                                        <span>
                                            <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                                fr={undefined}/>
                                            {server.ImagePath}
                                        </span>
                                    </CopyToClipboard>
                                </div>

                                <div id='keyPairName'>
                                    Key pair name:
                                    <CopyToClipboard text={server.KeyName}
                                        onCopy={() => {
                                            message.success('copied to clipboard!');
                                        }}>
                                        <span>
                                            <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                                fr={undefined}/>
                                            {server.KeyName}
                                        </span>
                                    </CopyToClipboard>
                                </div>

                                <div id='iamRole'>
                                    IAM Role:
                                    <CopyToClipboard text={server.IamInstanceProfile}
                                        onCopy={() => {
                                            message.success('copied to clipboard!');
                                        }}>
                                        <span>
                                            <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                                fr={undefined}/>
                                            {server.IamInstanceProfile}
                                        </span>
                                    </CopyToClipboard>
                                </div>

                            </Col>
                        </Row>
                    </div>

                </TabPane>
                <TabPane tab="Disk" key="Disk">
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