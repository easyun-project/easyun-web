import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
// import { useState } from 'react';


export interface CAmiProps {
    children?;
    classes?: TTailwindString;
    click?: () => void;
    imgName: string;
    imgVersion: string;
}

export const CAmi = (props: CAmiProps): JSX.Element => {
    // 通过imgName的第一个单词判断需要使用iconify:logos的哪个logo
    const icons = {
        'Debian':'debian',
        'Ubuntu':'ubuntu',
        'Red':'redhat-icon',
        'Cent':'centos-icon',
        'Amazon':'aws',
        'SUSE':'suse',
        'Windows':'microsoft-windows',
    };
    return(
        <button className={classnames('flex','flex-row','items-center','m-3','w-56','focus:outline-none','focus:ring','focus:border-blue-300')}>
            <Icon icon={`logos:${icons[props.imgName.split(' ')[0]]}`} width="30" fr={undefined}/>
            <div className={classnames('ml-3','text-left')}>
                <div className={classnames('text-black','font-semibold')}>{props.imgName}</div>
                <div className={classnames('text-gray-400')}>{props.imgVersion}</div>
            </div>
        </button>);
};


const CAmis = (): JSX.Element => {
    const amis = [
        {
            'imgCode': 'ubuntu',
            'imgDescription': 'Canonical, Ubuntu, 18.04 LTS, amd64 bionic image build on 2021-10-27',
            'imgID': 'ami-0279c3b3186e54acd',
            'imgName': 'Ubuntu',
            'imgVersion': '18.04 LTS',
            'root_device_disk': {
                'DeleteOnTermination': true,
                'Encrypted': false,
                'SnapshotId': 'snap-00758a6dd433754bb',
                'VolumeSize': 8,
                'VolumeType': 'gp2'
            },
            'root_device_name': '/dev/sda1',
            'root_device_type': 'ebs'
        },
        {
            'imgCode': 'debian',
            'imgDescription': 'Debian 10 (20210208-542)',
            'imgID': 'ami-07d02ee1eeb0c996c',
            'imgName': 'Debian 10',
            'imgVersion': '20210208',
            'root_device_disk': {
                'DeleteOnTermination': true,
                'Encrypted': false,
                'SnapshotId': 'snap-081c85673ff2b517e',
                'VolumeSize': 8,
                'VolumeType': 'gp2'
            },
            'root_device_name': '/dev/xvda',
            'root_device_type': 'ebs'
        },
        {
            'imgCode': 'ubuntu',
            'imgDescription': 'Canonical, Ubuntu, 20.04 LTS, amd64 focal image build on 2021-10-21',
            'imgID': 'ami-083654bd07b5da81d',
            'imgName': 'Ubuntu',
            'imgVersion': '20.04 LTS',
            'root_device_disk': {
                'DeleteOnTermination': true,
                'Encrypted': false,
                'SnapshotId': 'snap-0c97f1c43c6bb2043',
                'VolumeSize': 8,
                'VolumeType': 'gp2'
            },
            'root_device_name': '/dev/sda1',
            'root_device_type': 'ebs'
        },
        {
            'imgCode': 'sles',
            'imgDescription': 'SUSE Linux Enterprise Server 12 SP5 (HVM, 64-bit, SSD-Backed)',
            'imgID': 'ami-0a16c2295ef80ff63',
            'imgName': 'SUSE Linux Enterprise Server',
            'imgVersion': '12 SP5',
            'root_device_disk': {
                'DeleteOnTermination': true,
                'Encrypted': false,
                'SnapshotId': 'snap-0f3c910d283c87a9b',
                'VolumeSize': 10,
                'VolumeType': 'gp2'
            },
            'root_device_name': '/dev/sda1',
            'root_device_type': 'ebs'
        },
        {
            'imgCode': 'rhel',
            'imgDescription': 'Provided by Red Hat, Inc.',
            'imgID': 'ami-0b0af3577fe5e3532',
            'imgName': 'Red Hat Enterprise Linux',
            'imgVersion': '8.4',
            'root_device_disk': {
                'DeleteOnTermination': true,
                'Encrypted': false,
                'SnapshotId': 'snap-03a3ad00558b4d17c',
                'VolumeSize': 10,
                'VolumeType': 'gp2'
            },
            'root_device_name': '/dev/sda1',
            'root_device_type': 'ebs'
        },
        {
            'imgCode': 'ubuntu',
            'imgDescription': 'Canonical, Ubuntu, 16.04 LTS, amd64 xenial image build on 2021-09-28',
            'imgID': 'ami-0b0ea68c435eb488d',
            'imgName': 'Ubuntu',
            'imgVersion': '16.04 LTS',
            'root_device_disk': {
                'DeleteOnTermination': true,
                'Encrypted': false,
                'SnapshotId': 'snap-0d07aca74085233bf',
                'VolumeSize': 8,
                'VolumeType': 'gp2'
            },
            'root_device_name': '/dev/sda1',
            'root_device_type': 'ebs'
        },
        {
            'imgCode': 'amzn2',
            'imgDescription': 'Amazon Linux 2 Kernel 5.10 AMI 2.0.20211201.0 x86_64 HVM gp2',
            'imgID': 'ami-0ed9277fb7eb570c9',
            'imgName': 'Amazon Linux 2 Kernel 5.10',
            'imgVersion': '2.0.20211201.0',
            'root_device_disk': {
                'DeleteOnTermination': true,
                'Encrypted': false,
                'SnapshotId': 'snap-046c8ef36dde8e523',
                'VolumeSize': 8,
                'VolumeType': 'gp2'
            },
            'root_device_name': '/dev/xvda',
            'root_device_type': 'ebs'
        },
        {
            'imgCode': 'sles',
            'imgDescription': 'SUSE Linux Enterprise Server 15 SP2 (HVM, 64-bit, SSD-Backed)',
            'imgID': 'ami-0fde50fcbcd46f2f7',
            'imgName': 'SUSE Linux Enterprise Server',
            'imgVersion': '15 SP2',
            'root_device_disk': {
                'DeleteOnTermination': true,
                'Encrypted': false,
                'SnapshotId': 'snap-087794cd3c02a34dc',
                'VolumeSize': 10,
                'VolumeType': 'gp2'
            },
            'root_device_name': '/dev/sda1',
            'root_device_type': 'ebs'
        }
    ];
    return (
        <div id="select-your-ami" >
            select your image(AMI)
            <div className={classnames('flex','flex-row','flex-wrap','items-center','m-3')}>
                {amis.map((aminInfo)=><CAmi key={aminInfo.imgID} {...aminInfo}/>)}
            </div>
        </div>

    );
};



export default CAmis;