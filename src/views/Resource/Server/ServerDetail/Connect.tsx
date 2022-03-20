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
                <div className={classnames('w-1/2', 'border', 'rounded', 'flex', 'flex-col','py-2','px-4','my-4')}>
                    <div className={classnames('text-gray-400')}>CONNECT TO</div>
                    <div className={classnames('text-black','text-2xl')}>{currentServerState.svrConnect.publicIp}</div>
                    <div className={classnames('text-gray-400','mt-8')}>USER NAME</div>
                    <div className={classnames('text-black','text-2xl')}>{currentServerState.svrConnect.userName}</div>
                    <div className={classnames('text-gray-400','mt-2')}>PASSWORD</div>
                    <div className={classnames('text-gray-700', 'text-sm','mb-2')}>This instance uses your
                        <a href='http://www.baidu.com' target="_blank" rel='noreferrer'
                            className={classnames('text-black', 'font-bold', 'inline')}> {currentServerState.svrProperty.keyPairName} </a>
                        (us-east-1) key pair to sign in.
                    </div>
                </div>
            </>);
    }
    else {
        return <></>;
    }

}
