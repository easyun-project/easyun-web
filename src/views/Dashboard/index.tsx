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
    const [graphicalData, setGraphicalData] = useState<GraphicalType>({
        server: {
            cardTitle: 'Sever Summary',
            showIcon: true,
            content: {
                leftData: {
                    key: 'sumNum',
                    value: null,
                    unit: 'VM(S)'
                },
                rightData: [
                    {
                        key: 'runNum',
                        icon: {
                            name: 'akar-icons:circle-fill',
                            color: '#92d050'
                        },
                        label: 'Running',
                        value: null
                    },
                    {
                        key: 'stopNum',
                        icon: {
                            name: 'akar-icons:circle-fill',
                            color: '#afabab'
                        },
                        label: 'Stop',
                        value: null
                    },
                    {
                        key: 'vcpuNum',
                        label: 'vCPU',
                        value: null
                    },
                    {
                        key: 'ramSize',
                        label: 'RAM',
                        value: null
                    },
                ]
            }
        },
        database: {
            cardTitle: 'Database Summary',
            content: {
                leftData: {
                    key: 'sumNum',
                    value: null,
                    unit: 'Instance(s)'
                },
                rightData: [
                    {
                        key: 'mysqlNmb',
                        label: 'RDS MySQL',
                        value: null
                    },
                    {
                        key: 'mariaNum',
                        label: 'RDS MariaDB',
                        value: null
                    }, {
                        key: 'postgreNum',
                        label: 'RDS PostgresSQL',
                        value: null
                    }, {
                        key: 'auroraNum',
                        label: 'Aurora Provisioned',
                        value: null
                    }, {
                        key: 'cacheNum',
                        label: 'ElasticCache',
                        value: null
                    },
                ]
            }
        },
        network: {
            cardTitle: 'Network Summary',
            content: {
                leftData: {
                    key: 'sumNum',
                    value: null,
                    unit: 'Instance(s)'
                },
                rightData: [
                    {
                        key: 'pubNum',
                        label: 'Public subnet',
                        value: null
                    },
                    {
                        key: 'priNum',
                        label: 'Private subnet',
                        value: null
                    }, {
                        key: 'igwNum',
                        label: 'Internet Gateway',
                        value: null
                    }, {
                        key: 'natNum',
                        label: 'NAT Gateway',
                        value: null
                    }, {
                        key: 'sgNum',
                        label: 'Security Group',
                        value: null
                    },
                ]
            }
        },
        st_object: {
            cardTitle: 'Object Storage Summary',
            content: {
                leftData: {
                    key: 'sumNum',
                    value: null,
                    unit: 'Instance(s)'
                },
                rightData: [
                    {
                        key: 'objSize',
                        label: 'Total storage',
                        value: null
                    },
                    {
                        key: 'objNum',
                        label: 'Object count',
                        value: null
                    }, {
                        key: 'pubNum',
                        label: 'Public Access',
                        value: null
                    }, {
                        key: 'encNum',
                        label: 'Encryption',
                        value: null
                    }
                ]
            }
        },
        st_block: {
            cardTitle: 'Block Storage Summary',
            content: {
                leftData: {
                    key: 'sumNum',
                    value: null,
                    unit: 'Instance(s)'
                },
                rightData: [
                    {
                        key: 'blcSize',
                        label: 'Total Capacity',
                        value: null
                    },
                    {
                        key: 'useNum',
                        label: 'In-use',
                        value: null
                    },
                    {
                        key: 'avaNum',
                        label: 'Available',
                        value: null
                    },
                    {
                        key: 'encNum',
                        label: 'Encryption',
                        value: null
                    },
                ]
            }
        },
        st_file: {
            cardTitle: 'File Storage Summary',
            content: {
                leftData: {
                    key: 'sumNum',
                    value: null,
                    unit: 'Instance(s)'
                },
                rightData: [
                    {
                        key: 'efsNum',
                        label: 'EFS(Linux)',
                        value: null
                    },
                    {
                        key: 'efsSize',
                        label: 'Total size',
                        value: null
                    }, {
                        key: 'fsxNum',
                        label: 'FSx(Windows)',
                        value: null
                    }, {
                        key: 'fsxSize',
                        label: 'Total size',
                        value: null
                    },
                ]
            }
        },
    });


    useEffect(() => {
        getDatacenter();
        getHealth();
        getGraphical();
    }, []);

    /**
     * 获取首行数据 DataCenter
     */
    const getDatacenter = () => {
        const temp = { ...tableList };
        dashboard.getDatacenter().then(res => {
            temp['dataCenter']['data']['dataSource'] = res;
            setTableList(temp);
        });
    };

    /**
     * 获取首行数据 Health
     */
    const getHealth = () => {
        dashboard.getHealth().then(res => {
            setHealth(res);
        });
    };

    const getGraphical = () => {
        const temp = { ...graphicalData };
        dashboard.getGraphical().then(res => {
            res.forEach(item => {
                const { leftData, rightData } = temp[item.type]['content'];
                leftData.value = item.data.sumNum;
                // 循环匹配对应的key值
                Object.keys(item.data).map(dataItem => {
                    rightData.map(rightItem => {
                        if (rightItem.key === dataItem) {
                            rightItem.value = item.data[dataItem];
                        }
                    });
                });
            });
            setGraphicalData(temp);
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
                        <li key={index} onClick={() => goView(item.url)}>
                            <div className={classnames('py-1', 'text-blue-400')}>
                                <span>{item.title}</span>
                                <Icon
                                    className={classnames('inline')}
                                    icon="akar-icons:link-out"
                                    width="20"
                                    height="20"
                                    fr={undefined}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>;
    };

    const goView = (url) => {
        window.location.href = url;
    };

    return (
        <div className={classnames('min-h-screen', 'p-3', 'space-y-4')}>
            <div className={classnames('grid', 'grid-cols-2', 'gap-4')}>
                <DashCard cardTitle={tableList['dataCenter']['cardTitle']} content={tableView('dataCenter')}/>
                <DashCard cardTitle={'healthy Summary'} content={healthyView()}/>
            </div>
            <div className={classnames('grid', 'grid-cols-3', 'gap-4')}>
                <DashCard type='Graphical' {...graphicalData['server']} />
                <DashCard type='Graphical' {...graphicalData['database']} />
                <DashCard type='Graphical' {...graphicalData['network']} />
                <DashCard type='Graphical' {...graphicalData['st_object']} />
                <DashCard type='Graphical' {...graphicalData['st_block']} />
                <DashCard type='Graphical' {...graphicalData['st_file']} />
            </div>
        </div>
    );

};

export default Dashboard;
