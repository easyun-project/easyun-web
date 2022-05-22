import React,{ useEffect,useState } from 'react';
import { Icon } from '@iconify/react';
import { SeverDetailModel } from '@/constant/server';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';
import serverService from '@/service/serverService';

interface ServerCardProps{
    serverId:string
    children?: JSX.Element[] | JSX.Element | undefined
    active? : boolean
}

export default function ServerCard(props:ServerCardProps) {

    const [server, setServer] = useState<'loading'|SeverDetailModel>('loading');
    const { children,active,serverId } = props;
    useEffect(() => {
        setServer('loading');
        serverService.getServerDetail({ serverId }).then(res =>setServer(res));
    }, [serverId]);
    const icons = {
        'Debian':'debian',
        'ubuntu':'ubuntu',
        'Red':'redhat-icon',
        'Cent':'centos-icon',
        'amzn2':'aws',
        'SUSE':'suse',
        'Windows':'microsoft-windows',
    };

    return server === 'loading'
        ? <Skeleton active/>
        : (
            <div className={active
                ? 'flex items-center p-2 w-96 bg-gray-200 active-border'
                : 'flex items-center p-2 w-96 bg-gray-200 rounded-border'}>
                <Icon icon={`logos:${icons[server.svrConfig.os]}`} width="60" fr={undefined} className='mx-4'/>
                <div className='grow mb-2'>
                    <Link className='text-lg text-blue-500' to={`/resource/server/${server.svrProperty.instanceId}`}>{server.svrProperty.instanceName}</Link>
                    <div>
                        <span>{server.svrProperty.memory} GiB RAM, </span>
                        <span>{server.svrProperty.vCpu} vCPU</span>
                    </div>
                    <div>{server.svrConfig.os}</div>
                </div>
                {children}
            </div>
        );
}
