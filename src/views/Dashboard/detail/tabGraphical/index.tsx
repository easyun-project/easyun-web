import React, { useEffect, useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { DashCard } from '@/components/DashboardCommon/DashCard';
import { GraphicalType } from '@/views/Dashboard/dashboard';

export const DashboardsTabGraphical = (props): JSX.Element => {
    const { listData } = props;
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
                        key: 'mysqlNum',
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
                    unit: 'Subnet(s)'
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
                    unit: 'Bucket(s)'
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
                    unit: 'TiB(Free)'
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
                        key: 'avlNum',
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
        st_files: {
            cardTitle: 'File Storage Summary',
            content: {
                leftData: {
                    key: 'sumNum',
                    value: null,
                    unit: 'FS(s)'
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
        listData && getGraphical();
    }, [listData]);

    const getGraphical = () => {
        const temp = { ...graphicalData };
        listData.forEach(item => {
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
    };

    return (
        <div className={classnames('grid', 'grid-cols-3', 'gap-4')}>
            {
                Object.keys(graphicalData).map((type) => {
                    return <DashCard key={type} type="Graphical" {...graphicalData[type]} />;
                })
            }
        </div>
    );
};
