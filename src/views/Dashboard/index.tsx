import React, { useEffect, useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { AntdTable, TableConfig, TableProp } from '@/components/Common/CTable/AntdTable';
import { Icon } from '@iconify/react';
import { DashCard, GraphicalData } from '@/components/DashboardCommon/DashCard';
import './index.less';
import dashboard from '@/service/dashboard';

type TableType = {
    [key: string]: {
        cardTitle?: string,
        config: TableConfig,
        data: TableProp
    }
}
type HealthType = {
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

type GraphicalType = {
    [key: string]: {
        showIcon?: boolean,
        cardTitle: string,
        content: GraphicalData
    }
}

export const Dashboard = (props): JSX.Element => {
    const [tableList, setTableList] = useState<TableType>({
        dataCenter: {
            cardTitle: 'DataCenter Summary',
            config: {
                showHeader: false,
                pagination: false,
            },
            data: {
                columns: [
                    {
                        title: '',
                        dataIndex: 'azName',
                        key: 'azName',
                    }, {
                        title: '',
                        dataIndex: 'dcRegion',
                        key: 'dcRegion',
                        render: dcRegion => {
                            return <div>
                                <span className={classnames('inline-block', 'pr-1', 'h-4')}>
                                    <Icon className={'ml-5'} icon={`twemoji:flag-for-flag-${dcRegion?.icon}`}
                                        color='#5c6f9a'
                                        width='25' height='25'
                                        fr={undefined}/>
                                </span>
                                <span>{dcRegion?.name}</span>
                            </div>;
                        }
                    }, {
                        title: '',
                        dataIndex: 'azStatus',
                        key: 'azStatus',
                        render: (azStatus) => {
                            const color = {
                                running: '#92d050',
                                empty: '#afabab'
                            };
                            return <Icon icon='akar-icons:circle-fill' color={color[azStatus]} width='20'
                                height='20'/>;
                        },
                    }, {
                        title: '',
                        dataIndex: 'subnetNum',
                        key: 'subnetNum',
                        render: (subnetNum) => {
                            return subnetNum ? `${subnetNum} Subnet` : '-';
                        }
                    },
                ],
                dataSource: []
            }
        },
        // server: {
        //     cardTitle: 'Server List',
        // },
        // Database: {},
        // storageList: {}
    });
    const [health, setHealth] = useState<HealthType>({
        alarms: { iaNum: 0, isNum: 0, okNum: 0 },
        dashboards: []
    });
    const graphicalData: GraphicalType = {
        Server: {
            cardTitle: 'Sever Summary',
            showIcon: true,
            content: {
                leftData: {
                    value: '1111',
                    unit: 'VM(S)'
                },
                rightData: [
                    {
                        icon: {
                            name: 'akar-icons:circle-fill',
                            color: '#92d050'
                        },
                        label: 'Running',
                        value: 15
                    },
                    {
                        icon: {
                            name: 'akar-icons:circle-fill',
                            color: '#afabab'
                        },
                        label: 'Stop',
                        value: 15
                    },
                    {
                        label: 'vCPU',
                        value: 15
                    },
                    {
                        label: 'RAM',
                        value: 15
                    },
                ]
            }
        },
        Database: {
            cardTitle: 'Database Summary',
            content: {
                leftData: {
                    value: '7',
                    unit: 'Instance(s)'
                },
                rightData: [
                    {
                        label: 'RDS MySQL',
                        value: 3
                    },
                    {
                        label: 'RDS MariaDB',
                        value: 15
                    },
                ]
            }
        },
        Network: {
            cardTitle: 'Network Summary',
            content: {
                leftData: {
                    value: '7',
                    unit: 'Instance(s)'
                },
                rightData: [
                    {
                        label: 'RDS MySQL',
                        value: 3
                    },
                    {
                        label: 'RDS MariaDB',
                        value: 15
                    },
                ]
            }
        },
    };


    useEffect(() => {
        getDatacenter();
        getHealth();
    }, []);

    const getDatacenter = () => {
        const temp = { ...tableList };
        dashboard.getDatacenter().then(res => {
            temp['dataCenter']['data']['dataSource'] = res;
            setTableList(temp);
        });
    };

    const getHealth = () => {
        dashboard.getHealth().then(res => {
            setHealth(res);
        });
    };

    const tableView = (type) => {
        return <AntdTable key={type}
            config={tableList[type]['config']}
            data={tableList[type]['data']}/>;
    };

    const healthyView = () => {
        return <div className={classnames('grid', 'grid-cols-2', 'h-full')}>
            <div className={classnames('text-base')}>
                <div className={classnames('text-lg')}>Alarms:</div>
                <div className="Alarms">
                    <div>In alarm({health.alarms.iaNum})</div>
                    <div>Insufficient data({health.alarms.isNum})</div>
                    <div>OK({health.alarms.okNum})</div>
                </div>
            </div>
            <div className={classnames('text-base')}>
                <div className={classnames('text-lg')}>CloudWatch Dashboards(Favorite):</div>
                <ul className="CloudWatch">
                    {health.dashboards.map((item, index) => (
                        <li key={index}>
                            <div className={classnames('flex','items-center')}>
                                <Icon
                                    icon="akar-icons:link-out"
                                    width="20"
                                    height="20"
                                    fr={undefined}
                                />
                                <p>{item.title}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>;
    };

    return (
        <div className={classnames('min-h-screen', 'p-3', 'space-y-4')}>
            <div className={classnames('grid', 'grid-cols-2', 'gap-4')}>
                <DashCard cardTitle={tableList['dataCenter']['cardTitle']} content={tableView('dataCenter')}/>
                <DashCard cardTitle={'healthy Summary'} content={healthyView()}/>
            </div>
            <div className={classnames('grid', 'grid-cols-3', 'gap-4')}>
                <DashCard type='Graphical' {...graphicalData['Server']} />
                <DashCard type='Graphical' {...graphicalData['Database']} />
            </div>
        </div>
    );

};

export default Dashboard;
