import { toast } from 'sonner';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import TimeUtil from '@/utils/time';


// 
export default function Detail():JSX.Element {
    const serverState = useSelector((state: RootState) => {
        return state.server;
    });
    const server = serverState.currentServer;
    if(server !== undefined){return (
        <>
            <div id='instanceId'>
                Instance Id:
                <span> {server.svrProperty.instanceId} </span>
            </div>

            <div>
                Launch Time: <span>{TimeUtil.utcConvertTimeZone({ date:server.svrProperty.launchTime })} </span>
            </div>

            <div id='hostnameType' className={"mt-4"}>
                <div>Hostname Type</div>
                <div id='ipName'>
                            IP name:
                    <CopyToClipboard text={server.svrNetworking.privateIp}
                        onCopy={() => {
                            toast.success('copied to clipboard!');
                        }}>
                        <span>
                            <Icon width={20} className={"inline-block mx-2"} icon="ep:document-copy"
                                fr={undefined}/>
                            {server.svrProperty.privateIpv4Dns}</span>
                    </CopyToClipboard>
                </div>
                <div id='privateIpDNS'>
                            Private Ipv4 DNS:
                    <CopyToClipboard text={server.svrProperty.privateIpv4Dns}
                        onCopy={() => {
                            toast.success('copied to clipboard!');
                        }}>
                        <span>
                            <Icon width={20} className={"inline-block mx-2"} icon="ep:document-copy"
                                fr={undefined}/>
                            {server.svrProperty.privateIpv4Dns}
                        </span>
                    </CopyToClipboard>
                </div>
                <div id='publicIpDNS'>
                            Public Ipv4 DNS:
                    <CopyToClipboard text={server.svrProperty.publicIpv4Dns}
                        onCopy={() => {
                            toast.success('copied to clipboard!');
                        }}>
                        <span>
                            <Icon width={20} className={"inline-block mx-2"} icon="ep:document-copy"
                                fr={undefined}/>
                            {server.svrProperty.publicIpv4Dns}</span>
                    </CopyToClipboard>
                </div>
            </div>

            <div id='platformDetail' className={"mt-5"}>
                <div className="flex flex-wrap">
                    <div className="w-8/24">
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

                    </div>
                    <div className="w-2/24">
                        <hr className="my-4 border-gray-200" />
                    </div>
                    <div className="w-8/24">
                        <div id='amiId'>
                                    AMI ID:
                            <CopyToClipboard text={server.svrProperty.amiId}
                                onCopy={() => {
                                    toast.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={"inline-block mx-2"} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.amiId}</span>
                            </CopyToClipboard>
                        </div>

                        <div id='amiName'>
                                    AMI Name:
                            <CopyToClipboard text={server.svrProperty.amiName}
                                onCopy={() => {
                                    toast.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={"inline-block mx-2"} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.amiName}
                                </span>
                            </CopyToClipboard>
                        </div>

                        <div id='amiPath'>
                                    AMI Path:
                            <CopyToClipboard text={server.svrProperty.amiPath}
                                onCopy={() => {
                                    toast.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={"inline-block mx-2"} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.amiPath}
                                </span>
                            </CopyToClipboard>
                        </div>

                        <div id='keyPairName'>
                                    Key pair name:
                            <CopyToClipboard text={server.svrProperty.keyPairName}
                                onCopy={() => {
                                    toast.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={"inline-block mx-2"} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.keyPairName}
                                </span>
                            </CopyToClipboard>
                        </div>

                        <div id='iamRole'>
                                    IAM Role:
                            <CopyToClipboard text={server.svrProperty.iamRole}
                                onCopy={() => {
                                    toast.success('copied to clipboard!');
                                }}>
                                <span>
                                    <Icon width={20} className={"inline-block mx-2"} icon="ep:document-copy"
                                        fr={undefined}/>
                                    {server.svrProperty.iamRole}
                                </span>
                            </CopyToClipboard>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );}
    else{
        return <div>没有服务器的详细数据</div>;
    }
}
