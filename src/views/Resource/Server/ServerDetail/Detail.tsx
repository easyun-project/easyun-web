import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Col, Divider, message, Row, Typography } from 'antd';
import { Icon } from '@iconify/react';
import { classnames,  } from '@@/tailwindcss-classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import TimeUtil from '@/utils/time';


// const { Title, Paragraph, Text } = Typography;
const { Text } = Typography;

export default function Detail():JSX.Element {
    const serverState = useSelector((state: RootState) => {
        return state.server;
    });
    const server = serverState.currentServer;
    if(server !== undefined){return (
        <>
            <div id='instanceId'>
                Instance Id:
                <Text copyable> {server.svrProperty.instanceId} </Text>
            </div>

            <div>
                Launch Time: <Text>{TimeUtil.utcConvertTimeZone({ date:server.svrProperty.launchTime })} </Text>
            </div>

            <div id='hostnameType' className={classnames('mt-4')}>
                <div>Hostname Type</div>
                <div id='ipName'>
                            IP name:
                    <CopyToClipboard text={server.svrNetworking.privateIp}
                        onCopy={() => {
                            message.success('copied to clipboard!');
                        }}>
                        <span>
                            <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                fr={undefined}/>
                            {server.svrProperty.privateIpv4Dns}</span>
                    </CopyToClipboard>
                </div>
                <div id='privateIpDNS'>
                            Private Ipv4 DNS:
                    <CopyToClipboard text={server.svrProperty.privateIpv4Dns}
                        onCopy={() => {
                            message.success('copied to clipboard!');
                        }}>
                        <span>
                            <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                fr={undefined}/>
                            {server.svrProperty.privateIpv4Dns}
                        </span>
                    </CopyToClipboard>
                </div>
                <div id='publicIpDNS'>
                            Public Ipv4 DNS:
                    <CopyToClipboard text={server.svrProperty.publicIpv4Dns}
                        onCopy={() => {
                            message.success('copied to clipboard!');
                        }}>
                        <span>
                            <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                fr={undefined}/>
                            {server.svrProperty.publicIpv4Dns}</span>
                    </CopyToClipboard>
                </div>
            </div>

            <div id='platformDetail' className={classnames('mt-5')}>
                <Row>
                    <Col span={8}>
                        <div>
                                    Platform details: {server.svrProperty.platformDetails}
                        </div>

                        <div>
                                    Virtualization: {server.svrProperty.virtualization}
                        </div>

                        <div>
                                    Tenancy: {server.svrProperty.tenancy}
                        </div>
                        <div>
                                    Usage operation: {server.svrProperty.usageOperation}
                        </div>

                        <div>
                                    Monitoring: {server.svrProperty.monitoring}
                        </div>

                        <div>
                                    Termination protection: {server.svrProperty.terminationProtection}
                        </div>

                    </Col>
                    <Col span={2}>
                        <Divider type={'vertical'}/>
                    </Col>
                    <Col span={8}>
                        <div id='amiId'>
                                    AMI ID:
                            <CopyToClipboard text={server.svrProperty.amiId}
                                onCopy={() => {
                                    message.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.amiId}</span>
                            </CopyToClipboard>
                        </div>

                        <div id='amiName'>
                                    AMI Name:
                            <CopyToClipboard text={server.svrProperty.amiName}
                                onCopy={() => {
                                    message.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.amiName}
                                </span>
                            </CopyToClipboard>
                        </div>

                        <div id='amiPath'>
                                    AMI Path:
                            <CopyToClipboard text={server.svrProperty.amiPath}
                                onCopy={() => {
                                    message.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.amiPath}
                                </span>
                            </CopyToClipboard>
                        </div>

                        <div id='keyPairName'>
                                    Key pair name:
                            <CopyToClipboard text={server.svrProperty.keyPairName}
                                onCopy={() => {
                                    message.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.keyPairName}
                                </span>
                            </CopyToClipboard>
                        </div>

                        <div id='iamRole'>
                                    IAM Role:
                            <CopyToClipboard text={server.svrProperty.iamRole}
                                onCopy={() => {
                                    message.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={classnames('inline-block', 'mx-2')} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.iamRole}
                                </span>
                            </CopyToClipboard>
                        </div>

                    </Col>
                </Row>
            </div>
        </>
    );}
    else{
        return <div>没有服务器的详细数据</div>;
    }
}
