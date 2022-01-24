import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Col, Divider, message, Row } from 'antd';
import { Icon } from '@iconify/react';
import { classnames,  } from '@@/tailwindcss-classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Detail():JSX.Element {
    const serverState = useSelector((state: RootState) => {
        return state.server;
    });
    const server = serverState.currentServer;
    if(server !== undefined){return (
        <>
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
        </>
    );}
    else{
        return <div>没有服务器的详细数据</div>;
    }

}
