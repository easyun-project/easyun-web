import React from 'react';
import { Table } from 'antd';

export interface InsType {
    key?:React.Key;
    insType: string;
    memSize: number;
    netSpeed: string;
    vcpuNum: number;
    monthPrice:{
        currency:string,
        value:number,
    };
}

export default function InstanceList(props: {insTypes:'loading'|InsType[], changeselectefIns:React.Dispatch<React.SetStateAction<string>>}):JSX.Element {

    const columns = [
        {
            title: 'Type',
            dataIndex: 'insType',
            key: 'insType',
        },
        {
            title: 'Processing',
            dataIndex: 'vcpuNum',
            key: 'vcpuNum',
        },
        {
            title: 'Memory',
            dataIndex: 'memSize',
            key: 'memSize',
        },
        {
            title: 'Network',
            dataIndex: 'netSpeed',
            key: 'netSpeed',
        },
        {
            title: 'Price',
            dataIndex: 'monthPrice',
            key: 'monthPrice',
            render: text => {
                text.currency === 'USD';
                return '$' + text.value.toFixed(2);}
        },
    ];

    // const instances = [
    //     {
    //         'InstanceType': 'c5.4xlarge',
    //         'Memory': 32,
    //         'Network': 'Up to 10 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 496.40000000000003
    //         },
    //         'VCpu': 16
    //     },
    //     {
    //         'InstanceType': 'c5.xlarge',
    //         'Memory': 8,
    //         'Network': 'Up to 10 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 124.10000000000001
    //         },
    //         'VCpu': 4
    //     },
    //     {
    //         'InstanceType': 'c5.12xlarge',
    //         'Memory': 96,
    //         'Network': '12 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 1489.2
    //         },
    //         'VCpu': 48
    //     },
    //     {
    //         'InstanceType': 'c5.24xlarge',
    //         'Memory': 192,
    //         'Network': '25 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 2978.4
    //         },
    //         'VCpu': 96
    //     },
    //     {
    //         'InstanceType': 'c5.9xlarge',
    //         'Memory': 72,
    //         'Network': '10 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 1116.9
    //         },
    //         'VCpu': 36
    //     },
    //     {
    //         'InstanceType': 'c5.metal',
    //         'Memory': 192,
    //         'Network': '25 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 2978.4
    //         },
    //         'VCpu': 96
    //     },
    //     {
    //         'InstanceType': 'c5.large',
    //         'Memory': 4,
    //         'Network': 'Up to 10 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 62.050000000000004
    //         },
    //         'VCpu': 2
    //     },
    //     {
    //         'InstanceType': 'c5.2xlarge',
    //         'Memory': 16,
    //         'Network': 'Up to 10 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 248.20000000000002
    //         },
    //         'VCpu': 8
    //     },
    //     {
    //         'InstanceType': 'c5.18xlarge',
    //         'Memory': 144,
    //         'Network': '25 Gigabit',
    //         'Price': {
    //             'currency': 'USD',
    //             'value': 2233.8
    //         },
    //         'VCpu': 72
    //     }
    // ];
    const instances = props.insTypes;
    if (instances !== 'loading') {
        const instance = instances.map((item: InsType) => { item.key = item.insType; return item; });
        return (
            <Table rowSelection={{
                type: 'radio',
                onChange: (selectedRowKeys: React.Key[]) => {
                    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    props.changeselectefIns(selectedRowKeys.toString());
                },
            }} dataSource={instance} columns={columns} />
        );
    }
    else {return <div> loading</div>; }

}
