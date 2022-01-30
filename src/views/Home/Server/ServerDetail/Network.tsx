import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
// import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Network():JSX.Element {
    const currentServerState = useSelector((state: RootState) => {
        return state.server.currentServer;
    });
    if (currentServerState) {
        return (
            <>
                <div className={classnames('text-2xl')}>IPv4 networking</div>
                <div className={classnames('text-gray-600')}>The public IP address of your instance is accessible to the internet.</div>
                <div className={classnames('text-gray-600')}>The private IP address is accessible only to other resources in your Datacenter.</div>
                <div className={classnames('flex', 'flex-row','mt-6','mb-2')}>
                    <div className={classnames('w-1/3')}>
                        <div className={classnames('text-gray-400')}>PUBLIC IP</div>
                        <div className={classnames('border', 'rounded')}>
                            {/* <div>{currentServerState.PublicIpAddress}</div> */}
                            <div className={classnames('text-2xl','font-bold')}>54.173.113.2</div>
                            <div className={classnames('inline','text-yellow-550')}>Create static IP</div>
                            <div className={classnames('inline','text-yellow-550')}>Associate EIP</div>
                        </div>
                    </div>
                    <div className={classnames('w-1/3')}>
                        <div className={classnames('text-gray-400')}>PRIVATE IP</div>
                        <div className={classnames('border', 'rounded')}>
                            <div className={classnames('text-2xl','font-bold')}>{currentServerState.PrivateIpAddress}</div>
                            <div>What is this for?</div>
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
