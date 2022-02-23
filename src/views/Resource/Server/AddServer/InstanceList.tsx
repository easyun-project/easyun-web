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
            sorter: (a, b) => a.vcpuNum - b.vcpuNum,
        },
        {
            title: 'Memory',
            dataIndex: 'memSize',
            key: 'memSize',
            sorter: (a, b) => a.memSize - b.memSize,
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
            sorter: (a, b) => a.monthPrice.value - b.monthPrice.value,
            render: text => {
                text.currency === 'USD';
                return '$' + text.value.toFixed(2);}
        },
    ];

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
            }} dataSource={instance} columns={columns}/>
        );
    }
    else {return (
        <Table rowSelection={{
            type: 'radio',
            onChange: (selectedRowKeys: React.Key[]) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                props.changeselectefIns(selectedRowKeys.toString());
            },
        }} columns={columns}
        loading={ true }/>
    ); }

}
