import { TableConfig, TableProp } from '@/components/Common/CTable/AntdTable';
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

