import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';

/**
 * 兼容 antd Table API 的包装组件
 * 支持两种调用方式:
 * 1. <AntdTable config={...} data={{ columns, dataSource }} />  (旧 Dashboard 用法)
 * 2. <AntdTable columns={...} dataSource={...} />  (直接 antd Table 用法)
 */

interface AntdColumn {
    title?: string;
    dataIndex?: string;
    key?: string;
    render?: (text: any, record: any, index: number) => any;
    [key: string]: any;
}

interface PropsType {
    config?: { pagination?: false | { pageSize?: number }; [key: string]: any };
    data?: { columns: AntdColumn[]; dataSource: any[] };
    // Direct antd Table API
    columns?: AntdColumn[];
    dataSource?: any[];
    bordered?: boolean;
    pagination?: false | { pageSize?: number };
    rowSelection?: any;
    [key: string]: any;
}

function convertColumns(antdCols: AntdColumn[]): ColumnDef<any>[] {
    return antdCols.map(col => ({
        header: col.title || '',
        accessorKey: col.dataIndex || col.key || '',
        cell: col.render
            ? ({ row, getValue }) => col.render!(getValue(), row.original, row.index)
            : undefined,
    }));
}

export const AntdTable = (props: PropsType): JSX.Element => {
    const cols = props.columns || props.data?.columns || [];
    const data = props.dataSource || props.data?.dataSource || [];
    const pagination = props.pagination ?? props.config?.pagination;
    const pageSize = pagination === false ? 0 : (pagination?.pageSize || 0);

    return <DataTable
        columns={convertColumns(cols)}
        data={data}
        pageSize={pageSize}
        selectable={!!props.rowSelection}
    />;
};
