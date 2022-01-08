import React from 'react';
import { Table } from 'antd';

export default function InstanceList():JSX.Element {

    const columns = [
        {
            title: 'Type',
            dataIndex: 'InstanceType',
            key: 'Type',
        },
        {
            title: 'Processing',
            dataIndex: 'VCpu',
            key: 'Processing',
        },
        {
            title: 'Memory',
            dataIndex: 'Memory',
            key: 'Memory',
        },
        {
            title: 'Network',
            dataIndex: 'Network',
            key: 'Network',
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
            render: text => text.value
        },
    ];
    interface DataType {
        key?:React.Key;
        InstanceType: string;
        Memory: number;
        Network: string;
        VCpu: number;
        Price:{
            currency:string,
            value:number,
        };
    }
    const instances = [
        {
            'InstanceType': 'c5.4xlarge',
            'Memory': 32,
            'Network': 'Up to 10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 496.40000000000003
            },
            'VCpu': 16
        },
        {
            'InstanceType': 'c5.xlarge',
            'Memory': 8,
            'Network': 'Up to 10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 124.10000000000001
            },
            'VCpu': 4
        },
        {
            'InstanceType': 'c5.12xlarge',
            'Memory': 96,
            'Network': '12 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 1489.2
            },
            'VCpu': 48
        },
        {
            'InstanceType': 'c5.24xlarge',
            'Memory': 192,
            'Network': '25 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 2978.4
            },
            'VCpu': 96
        },
        {
            'InstanceType': 'c5.9xlarge',
            'Memory': 72,
            'Network': '10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 1116.9
            },
            'VCpu': 36
        },
        {
            'InstanceType': 'c5.metal',
            'Memory': 192,
            'Network': '25 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 2978.4
            },
            'VCpu': 96
        },
        {
            'InstanceType': 'c5.large',
            'Memory': 4,
            'Network': 'Up to 10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 62.050000000000004
            },
            'VCpu': 2
        },
        {
            'InstanceType': 'c5.2xlarge',
            'Memory': 16,
            'Network': 'Up to 10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 248.20000000000002
            },
            'VCpu': 8
        },
        {
            'InstanceType': 'c5.18xlarge',
            'Memory': 144,
            'Network': '25 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 2233.8
            },
            'VCpu': 72
        }
    ];
    const instance = instances.map((item:DataType)=>{item.key = item.InstanceType;return item;});
    return (
        <Table         rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
        }}dataSource={instance} columns={columns} />
    );
}
