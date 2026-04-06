import React,{ useEffect,useState } from 'react';
import { Icon } from '@iconify/react';
import { SeverDetailModel } from '@/constant/server';
import { Link } from 'react-router-dom';
import { postApiV1ServerAction, deleteApiV1Server, postApiV1ServerConfig, putApiV1ServerName, putApiV1ServerDisk, putApiV1ServerEip, putApiV1ServerSecgroup, getApiV1ServerParamImage, getApiV1ServerParamInstypeList, getApiV1ServerParamInstypeFamily, postApiV1Server, getApiV1ServerDetailBySvrId, deleteApiV1ServerTagsBySvrId, putApiV1ServerTagsBySvrId } from '@/api-client';

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
        (getApiV1ServerDetailBySvrId as any)({ path: { svr_id: serverId } }).then(({ data }) => setServer(data?.detail as any));
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
        ? <div className="animate-pulse h-20 bg-gray-200 rounded" />
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
