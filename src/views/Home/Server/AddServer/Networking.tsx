import React from 'react';
// import { Table } from 'antd';
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

interface SubnetProps extends subnetData{
    setSelected : React.Dispatch<React.SetStateAction<string>>;
    key?:React.Key;
    classes?: TTailwindString;
    changeSelectedSubnet: React.Dispatch<React.SetStateAction<string>>;
}

function Subnet(props: SubnetProps): JSX.Element{
    let { classes } = props;
    const { subnetType,subnetId,tagName,cidr, setSelected, changeSelectedSubnet } = props;
    if (subnetType === 'public') {
        classes = classnames(classes, 'bg-green-50');
    } else {
        classes = classnames(classes, 'bg-yellow-50');
    }
    return(
        <button value={subnetId}
            onClick={(e) => {
                setSelected(e.currentTarget.value);
                changeSelectedSubnet(e.currentTarget.value);}}
            className={classnames(classes,'rounded-lg','w-40','h-20','m-2','flex','flex-col','justify-center','items-center')}>
            {subnetType === 'public'
                ? <Icon className={classnames('relative', 'top-0', 'right-0', 'float-right')}
                    icon="ant-design:lock-outlined"
                    width="25" height="25"
                    fr={undefined}/>
                : undefined}
            <div className={classnames('font-bold')}>{tagName.split(' ')[0]}</div>
            <div className={classnames('font-bold')}>{tagName.replace('Public','').replace('private','')}</div>
            <div>({cidr})</div>
        </button>
    );
}

interface NetworkingProps {
    changeSelectedSubnet: React.Dispatch<React.SetStateAction<string>>
    subnets: subnetData[]
}

export default function Networking(props: NetworkingProps):JSX.Element {
    const [selected, setSelected] = useState('');
    // const columns = [
    //     {
    //         title: 'us-east-1a',
    //         dataIndex: 'InstanceType',
    //         key: 'us-east-1a',
    //     },
    //     {
    //         title: 'us-east-1b',
    //         dataIndex: 'VCpu',
    //         key: 'us-east-1b',
    //     },
    //     {
    //         title: 'us-east-1c',
    //         dataIndex: 'Memory',
    //         key: 'us-east-1c',
    //     },
    //     {
    //         title: 'us-east-1d',
    //         dataIndex: 'Network',
    //         key: 'us-east-1d',
    //     },
    //     {
    //         title: 'us-east-1e',
    //         dataIndex: 'Price',
    //         key: 'us-east-1e',
    //         render: text => text.value
    //     },
    // ];
    const { subnets } = props;
    return (
        <div>
            {subnets.map((network:subnetData) =>
                <Subnet
                    classes={network.subnetId === selected ?
                        classnames('border-2','border-yellow-550') :
                        undefined}
                    key={network.subnetId}
                    setSelected={setSelected}
                    changeSelectedSubnet={ props.changeSelectedSubnet}
                    {...network}
                />)}
        </div>
    );
}
