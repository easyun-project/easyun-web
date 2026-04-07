interface TableConfig {
    pagination?: false | { pageSize?: number };
    [key: string]: any;
}

interface TableProp {
    columns: { title?: string; dataIndex?: string; key?: string; render?: (text: any, record: any, index: number) => any; [k: string]: any }[];
    dataSource: any[];
}
import { GraphicalData } from '@/components/DashboardCommon/DashCard';

export type TableType = {
    [key: string]: {
        cardTitle?: string,
        config: TableConfig,
        data: TableProp
    }
}
export type HealthType = {
    alarms: {
        iaNum: number,
        isNum: number,
        okNum: number,
    },
    dashboards: Array<{
        title: string,
        url: string
    }>
}
export type GraphicalType = {
    [key: string]: {
        showIcon?: boolean,
        cardTitle: string,
        content: GraphicalData
    }
}

