import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
// import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import DataCenterService from '@/service/dataCenterService';
import { useState } from 'react';

export default function Network():JSX.Element {
    const currentServerState = useSelector((state: RootState) => {
        return state.server.currentServer;
    });
    const [hasPublicIP,changeHasPublicIP] = useState(true);
    if (currentServerState) {
        return (
            <>
                <div className={classnames('text-2xl')}>IPv4 networking</div>
                <div className={classnames('text-gray-600')}>The public IP address of your instance is accessible to the internet.</div>
                <div className={classnames('text-gray-600')}>The private IP address is accessible only to other resources in your Datacenter.</div>
                <div className={classnames('flex', 'flex-row','mt-6','mb-2')}>
                    <div className={classnames('w-1/3')}>
                        <div className={classnames('text-gray-400')}>PUBLIC IP</div>
                        <div className={classnames('rounded-border','mr-4')}>
                            {/* <div>{currentServerState.PublicIpAddress}</div> */}
                            <div className={classnames('text-2xl', 'font-bold')}>54.173.113.2</div>
                            { hasPublicIP
                                ? (<><button onClick={ ()=>DataCenterService.createEip('Easyun')}
                                    className={classnames('inline', 'text-yellow-550')}>
                                    <Icon icon="carbon:add"
                                        className={classnames('inline-block', 'mx-1')}
                                        width="15"
                                        height="15"
                                        fr={undefined} />
                                Create static IP</button>
                                <div className={classnames('inline', 'text-yellow-550','pl-2')}>
                                    <Icon icon="fluent:branch-fork-20-regular"
                                        className={classnames('inline-block', 'mx-1')}
                                        width="15"
                                        height="15"
                                        fr={undefined} />Associate EIP</div></>)
                                : <div className={classnames('text-yellow-550')}>
                                    <Icon icon="clarity:times-line"
                                        className={classnames('inline-block', 'mx-1')}
                                        width="15"
                                        height="15"
                                        fr={undefined} />Disassociate static EIP</div>}


                        </div>

                    </div>
                    <div className={classnames('w-1/3')}>
                        <div className={classnames('text-gray-400')}>PRIVATE IP</div>
                        <div className={classnames('rounded-border')}>
                            <div className={classnames('text-2xl','font-bold')}>{currentServerState.PrivateIpAddress}</div>
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
