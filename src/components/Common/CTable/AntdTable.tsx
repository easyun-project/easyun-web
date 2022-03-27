import React from 'react';
import { Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table/interface';


export interface TableConfig {
    showHeader?: boolean,
    pagination?: false | TablePaginationConfig,
    scroll?: {
        x?: number | true | string;
        y?: number | string;
    },
    bordered?: boolean
}

export interface TableProp {
    columns: Array<object>,
    dataSource: Array<object>,
}

export interface PropsType {
    config?: TableConfig,
    data: TableProp
}

export const AntdTable = (props: PropsType): JSX.Element => {
    const { config, data } = props;
    return (
        <Table
            rowKey={record => JSON.stringify(record)}
            {...data}
            {...config}
        />
    );
};
