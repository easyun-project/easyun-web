import React from 'react';
import { Table } from 'antd';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useState } from 'react';

interface subnetData{
    az: string;
    cidr: string;
    freeIps: number;
    subnetId: string;
    subnetType:string;
    tagName:string;}

interface subnetProps extends subnetData{
    setSelected : React.Dispatch<React.SetStateAction<string>>;
    key?:React.Key;
    classes?:TTailwindString;
}

function Subnet(props:subnetProps):JSX.Element{
    let classes = props.classes;
    if (props.subnetType === 'public') {
        classes = classnames(classes, 'bg-green-50');
    } else {
        classes = classnames(classes, 'bg-yellow-50');
    }
    return(
        <button value={props.subnetId}
            onClick={(e)=>props.setSelected(e.currentTarget.value)}
            className={classnames(classes,'rounded-lg','w-40','h-20','m-2','flex','flex-col','justify-center','items-center')}>
            {props.subnetType === 'public'
                ? <Icon className={classnames('relative', 'top-0', 'right-0', 'float-right')}
                    icon="ant-design:lock-outlined"
                    width="25" height="25"
                    fr={undefined}/>
                : undefined}
            <div className={classnames('font-bold')}>{props.tagName.split(' ')[0]}</div>
            <div className={classnames('font-bold')}>{props.tagName.replace('Public','').replace('private','')}</div>
            <div>({props.cidr})</div>
        </button>
    );
}

export default function Networking():JSX.Element {
    const [selected, setSelected] = useState('');
    const columns = [
        {
            title: 'us-east-1a',
            dataIndex: 'InstanceType',
            key: 'us-east-1a',
        },
        {
            title: 'us-east-1b',
            dataIndex: 'VCpu',
            key: 'us-east-1b',
        },
        {
            title: 'us-east-1c',
            dataIndex: 'Memory',
            key: 'us-east-1c',
        },
        {
            title: 'us-east-1d',
            dataIndex: 'Network',
            key: 'us-east-1d',
        },
        {
            title: 'us-east-1e',
            dataIndex: 'Price',
            key: 'us-east-1e',
            render: text => text.value
        },
    ];
    const networks:subnetData[] = [
        {
            'az': 'us-east-1a',
            'cidr': '10.10.1.0/24',
            'freeIps': 249,
            'subnetId': 'subnet-06bfe659f6ecc2eed',
            'subnetType': 'public',
            'tagName': 'Public subnet 1'
        },
        {
            'az': 'us-east-1b',
            'cidr': '10.10.2.0/24',
            'freeIps': 247,
            'subnetId': 'subnet-02a09fd044f6d8e8d',
            'subnetType': 'public',
            'tagName': 'Public subnet 2'
        },
        {
            'az': 'us-east-1a',
            'cidr': '10.10.21.0/24',
            'freeIps': 251,
            'subnetId': 'subnet-03c3de7f09dfe36d7',
            'subnetType': 'private',
            'tagName': 'Private subnet 1'
        },
        {
            'az': 'us-east-1b',
            'cidr': '10.10.22.0/24',
            'freeIps': 244,
            'subnetId': 'subnet-0c903785974d075f0',
            'subnetType': 'private',
            'tagName': 'Private subnet 2'
        }
    ];
    return (
        <div>
            {networks.map((network:subnetData) =>
                <Subnet
                    classes={network.subnetId === selected ?
                        classnames('border-2','border-yellow-550') :
                        undefined}
                    key={network.subnetId}
                    setSelected={setSelected}
                    {...network}
                />)}
        </div>
    );
}
