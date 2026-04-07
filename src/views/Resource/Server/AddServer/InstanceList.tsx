import React from 'react';
import { DataTable, fromLegacyColumns } from '@/components/ui/data-table';

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
            <DataTable selectable data={instance} columns={fromLegacyColumns(columns) as any}/>
        );
    }
    else {return (
        <DataTable selectable data={[]} columns={fromLegacyColumns(columns) as any}
       />
    ); }

}
