import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Connect(): JSX.Element {
    const currentServerState = useSelector((state: RootState) => {
        return state.server.currentServer;
    });
    if (currentServerState) {
        return (
            <>
                <div>
                    You can connect to your instance using your own SSH client and the following credentials:
                </div>
                <div className={classnames('text-blue-500')}>
                    <a href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                        Connect using an SSH client
                        <Icon
                            className={classnames('inline-block', 'mx-1', 'text-blue-500')}
                            icon="akar-icons:link-out"
                            width="20"
                            height="20"
                            fr={undefined}
                        />
                    </a>
                </div>
                <div className={classnames('w-1/2', 'border', 'rounded', 'flex', 'flex-col')}>
                    <div>CONNECT TO</div>
                    <div>{currentServerState.PrivateIpAddress}</div>
                    <div>USER NAME</div>
                    <div>{currentServerState.PrivateIpAddress}</div>
                    <div>PASSWORD</div>
                    <div>{currentServerState.KeyName}</div>
                </div>
            </>);
    }
    else {
        return <></>;
    }

}
