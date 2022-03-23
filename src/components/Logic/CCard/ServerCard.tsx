import React from 'react';
import { Icon } from '@iconify/react';
import { SeverDetailModel } from '@/constant/server';
import { Link } from 'react-router-dom';

interface ServerCardProps extends SeverDetailModel{
    children?:JSX.Element[]
}

export default function ServerCard(props:ServerCardProps) {
    const { svrConfig,svrProperty,children } = props;
    // const icons = {
    //     'Debian':'debian',
    //     'Ubuntu':'ubuntu',
    //     'Red':'redhat-icon',
    //     'Cent':'centos-icon',
    //     'Amazon':'aws',
    //     'SUSE':'suse',
    //     'Windows':'microsoft-windows',
    // };
    return (
        <div className='flex items-center p-2 w-96 bg-gray-200 rounded-border'>
            <Icon icon={`logos:${svrConfig.os}`} width="60" fr={undefined}/>
            <div className='grow mb-2'>
                <Link className='text-lg text-blue-500' to={`/resource/server/${svrProperty.instanceId}`}>{svrProperty.instanceName}</Link>
                <div>
                    <span>{svrProperty.memory} GiB RAM, </span>
                    <span>{svrProperty.vCpu} vCPU</span>
                </div>
                <div>{svrConfig.os}</div>
            </div>
            {children}
        </div>
    );
}
