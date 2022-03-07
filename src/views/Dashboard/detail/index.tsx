import { classnames } from '@@/tailwindcss-classnames';
import { Select } from 'antd';
import { DashCard, GraphicalData } from '@/components/DashboardCommon/DashCard';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import FlagUtil from '@/utils/flagUtil';
import TimeUtil from '@/utils/time';
import DataCenterService from '@/service/dataCenterService';
import dashboard from '@/service/dashboard';
import { AntdTable, TableConfig, TableProp } from '@/components/Common/CTable/AntdTable';
import './index.less';
import { DictListSelect } from '@/components/DashboardCommon/DictListSelect';

const { Option } = Select;

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

export const DashboardDetail = (props): JSX.Element => {
    const { propDcName } = props;
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
                                    <Icon className={'ml-5'} icon={FlagUtil.getFlagIcon(dcRegion?.icon)}
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
                                height='20' fr={undefined}/>;
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
        server: {
            cardTitle: 'Server List',
            config: {
                pagination: false,
                bordered: true,
                scroll: {
                    y: 300
                }
            },
            data: {
                columns: [
                    {
                        title: 'Server ID',
                        dataIndex: 'svrId',
                        key: 'svrId',
                    },
                    {
                        title: 'Name（tag）',
                        dataIndex: 'tagName',
                        key: 'tagName',
                    },
                    {
                        title: 'State',
                        dataIndex: 'svrState',
                        key: 'svrState',
                    },
                    {
                        title: 'Instance type',
                        dataIndex: 'insType',
                        key: 'insType',
                    },
                    {
                        title: 'vCPU',
                        dataIndex: 'vpuNum',
                        key: 'vpuNum',
                    },
                    {
                        title: 'RAM',
                        dataIndex: 'ramSize',
                        key: 'ramSize',
                    },
                    {
                        title: 'Storage（EBS）',
                        dataIndex: 'diskSize',
                        key: 'diskSize',
                        render: diskSize => {
                            return diskSize && <div>{diskSize} GiB</div>;
                        }
                    },
                    {
                        title: 'OS',
                        dataIndex: 'osName',
                        key: 'osName',
                    },
                    {
                        title: 'Region & AZ',
                        dataIndex: 'azName',
                        key: 'azName',
                    },
                    {
                        title: 'Public IPv4',
                        dataIndex: 'priIp',
                        key: 'priIp',
                    },
                    {
                        title: 'Launch time',
                        dataIndex: 'launchTime',
                        key: 'launchTime',
                        render: launchTime => {
                            return TimeUtil.utcConvertTimeZone({ date: launchTime });
                        }
                    }
                ],
                dataSource: []
            }
        },
        st_block: {
            cardTitle: 'Block Storage list',
            config: {
                pagination: false,
                bordered: true,
                scroll: {
                    y: 300
                }
            },
            data: {
                columns: [
                    {
                        title: 'Volume ID',
                        dataIndex: 'volumeId',
                        key: 'volumeId',
                    },
                    {
                        title: 'Name（tag）',
                        dataIndex: 'attachSvr',
                        key: 'attachSvr',
                    },
                    {
                        title: 'Type',
                        dataIndex: 'volumeType',
                        key: 'volumeType',
                    },
                    {
                        title: 'Size',
                        dataIndex: 'volumeSize',
                        key: 'volumeSize',
                    },
                    {
                        title: 'IOPS',
                        dataIndex: 'volumeIops',
                        key: 'volumeIops',
                    },
                    {
                        title: 'Throughput',
                        dataIndex: 'volumeThruput',
                        key: 'volumeThruput',
                    },
                    {
                        title: 'Encrypted',
                        dataIndex: 'isEncrypted',
                        key: 'isEncrypted',
                        render: (diskEncrypt) => {
                            return <div>{diskEncrypt?.toString()}</div>;
                        }
                    },
                    {
                        title: 'State',
                        dataIndex: 'volumeState',
                        key: 'volumeState',
                    },
                    {
                        title: 'Attachment',
                        dataIndex: 'attachSvr',
                        key: 'attachSvr',
                    },
                    {
                        title: 'Device path',
                        dataIndex: 'attachPath',
                        key: 'attachPath',
                    },
                    {
                        title: 'Disk type',
                        dataIndex: 'diskType',
                        key: 'diskType',
                    },
                    {
                        title: 'Availability Zone',
                        dataIndex: 'volumeAz',
                        key: 'volumeAz',
                    },
                    {
                        title: 'Create time',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        render: createTime => {
                            return TimeUtil.utcConvertTimeZone({ date: createTime });
                        }
                    }
                ],
                dataSource: []
            }
        },
        st_object: {
            cardTitle: 'Object Storage list',
            config: {
                pagination: false,
                bordered: true,
                scroll: {
                    y: 300
                }
            },
            data: {
                columns: [
                    {
                        title: 'Bucket Identifier',
                        dataIndex: 'bktId',
                        key: 'bktId',
                    },
                    {
                        title: 'Region',
                        dataIndex: 'bktRegion',
                        key: 'bktRegion',
                    },
                    {
                        title: 'Access',
                        dataIndex: 'bktAccess',
                        key: 'bktAccess',
                    },
                    {
                        title: 'Default encryption',
                        dataIndex: 'isEncrypted',
                        key: 'isEncrypted',
                        render: (bucketEncryption) => {
                            return <div>{bucketEncryption?.toString()}</div>;
                        }
                    },
                    {
                        title: 'Versioning',
                        dataIndex: 'bktVersioning',
                        key: 'bktVersioning',
                    },
                    {
                        title: 'Create time',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        render: createTime => {
                            return TimeUtil.utcConvertTimeZone({ date: createTime });
                        }
                    },
                ],
                dataSource: []
            }
        },
        database: {
            cardTitle: 'Database list',
            config: {
                pagination: false,
                bordered: true,
                scroll: {
                    y: 300
                }
            },
            data: {
                columns: [
                    {
                        title: 'DB Identifier',
                        dataIndex: 'dbiId',
                        key: 'dbiId',
                    },
                    {
                        title: 'Role',
                        dataIndex: 'rdsRole',
                        key: 'rdsRole',
                    },
                    {
                        title: 'Engine',
                        dataIndex: 'dbiEngine',
                        key: 'dbiEngine',
                    },
                    {
                        title: 'Version',
                        dataIndex: 'engineVer',
                        key: 'engineVer',
                    },
                    {
                        title: 'Status',
                        dataIndex: 'dbiStatus',
                        key: 'dbiStatus',
                    },
                    {
                        title: 'Size',
                        dataIndex: 'dbiSize',
                        key: 'dbiSize',
                    },
                    {
                        title: 'vCPU',
                        dataIndex: 'vcpuNum',
                        key: 'vcpuNum',
                    },
                    {
                        title: 'RAM',
                        dataIndex: 'ramSize',
                        key: 'ramSize',
                    },
                    {
                        title: 'Storage',
                        dataIndex: 'volumeSize',
                        key: 'volumeSize',
                    },
                    {
                        title: 'Region & AZ',
                        dataIndex: 'dbiAz',
                        key: 'dbiAz',
                    },
                    {
                        title: 'Multi-AZ',
                        dataIndex: 'multiAz',
                        key: 'multiAz',
                        render: (multiAz) => {
                            return <div>{multiAz?.toString()}</div>;
                        }
                    },
                    {
                        title: 'Create Time',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        render: createTime => {
                            return TimeUtil.utcConvertTimeZone({ date: createTime });
                        }
                    },
                ],
                dataSource: []
            }
        },
        nw_subnet: {
            cardTitle: 'Networking-subnet',
            config: {
                pagination: false,
                bordered: true,
                scroll: {
                    y: 300
                }
            },
            data: {
                columns: [
                    {
                        title: 'Subnet ID',
                        dataIndex: 'subnetId',
                        key: 'subnetId',
                    },
                    {
                        title: 'Name(tag)',
                        dataIndex: 'tagName',
                        key: 'tagName',
                    },
                    {
                        title: 'State',
                        dataIndex: 'subnetState',
                        key: 'subnetState',
                    },
                    {
                        title: 'Type',
                        dataIndex: 'subnetType',
                        key: 'subnetType',
                    },
                    {
                        title: 'IPv4 CIDR',
                        dataIndex: 'cidrBlock',
                        key: 'cidrBlock',
                    },
                    {
                        title: 'Available IPv4',
                        dataIndex: 'avlipNum',
                        key: 'avlipNum',
                    },
                    {
                        title: 'IPv6 CIDR',
                        dataIndex: 'cidrBlockv6',
                        key: 'cidrBlockv6',
                    },
                    {
                        title: 'Availability Zone',
                        dataIndex: 'subnetAz',
                        key: 'subnetAz',
                    },
                    {
                        title: 'Auto-assign Pub IP',
                        dataIndex: 'isMappubip',
                        key: 'isMappubip',
                        render: (isMappubip) => {
                            return <div>{isMappubip?.toString()}</div>;
                        }
                    },
                ],
                dataSource: []
            }
        },
        nw_secgroup: {
            cardTitle: 'Security Group list',
            config: {
                pagination: false,
                bordered: true,
                scroll: {
                    y: 300
                }
            },
            data: {
                columns: [
                    {
                        title: 'Security Group ID',
                        dataIndex: 'sgId',
                        key: 'sgId',
                    },
                    {
                        title: 'Name(tag)',
                        dataIndex: 'tagName',
                        key: 'tagName',
                    },
                    {
                        title: 'Security Group name',
                        dataIndex: 'sgName',
                        key: 'sgName',
                    },
                    {
                        title: 'Inbound rules count',
                        dataIndex: 'ibrulesNum',
                        key: 'ibrulesNum',
                    },
                    {
                        title: 'Outbound rules count',
                        dataIndex: 'obrulesNum',
                        key: 'obrulesNum',
                    },
                    // TODO: 保留字段
                    // {
                    //     title: 'ibPermissions',
                    //     dataIndex: 'ibPermissions',
                    //     key: 'ibPermissions',
                    // },
                    // {
                    //     title: 'obPermissions',
                    //     dataIndex: 'obPermissions',
                    //     key: 'obPermissions',
                    // },
                ],
                dataSource: []
            }
        },
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
    // tabs切换，true-Graphical面板,false-list面板
    const [isShowGraphical, setIsShowGraphical] = useState<boolean>(true);
    const [listShow, setListShow] = useState<Array<string>>([]);
    const [dcName, setDcName] = useState<string>(propDcName);

    useEffect(() => {
        if (dcName) {
            getDatacenter();
            getHealth();
            getGraphical();
            getInventory();
        }
    }, [dcName]);

    /**
     * 获取首行数据 DataCenter
     */
    const getDatacenter = () => {
        const temp = { ...tableList };
        dashboard.getDatacenter({ dcName }).then(res => {
            temp['dataCenter']['data']['dataSource'] = res;
            setTableList(temp);
        });
    };

    /**
     * 获取首行数据 Health
     */
    const getHealth = () => {
        dashboard.getHealth({ dcName }).then(res => {
            setHealth(res);
        });
    };
    /**
     * 获取Graphical面板
     */
    const getGraphical = () => {
        const temp = { ...graphicalData };
        dashboard.getGraphical({ dcName }).then(res => {
            res.forEach(item => {
                console.log(item.type);
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

    /**
     * 获取list面板数据
     * 根据接口返回type,存入tableList对应字段的dataSource
     * 后端接口有数据且tableList存在相应字段，存入showList进行展示
     */
    const getInventory = () => {
        const temp = { ...tableList };
        dashboard.getInventory({ dcName }).then(res => {
            const showList: Array<string> = [];
            res.forEach(item => {
                if (item.data.length > 0 && temp[item.type]) {
                    showList.push(item.type);
                    temp[item.type].data.dataSource = item.data;
                }
            });
            setListShow(showList);
        });
    };

    /**
     * 展示表格数据
     * @param type ：对应tableList中key值
     */
    const tableView = (type) => {
        return <AntdTable key={type}
            config={tableList[type]['config']}
            data={tableList[type]['data']}/>;
    };

    /**
     * 首行数据healthy面板展示
     */
    const healthyView = () => {
        return <div className={classnames('grid', 'grid-cols-2', 'h-full')}>
            <div className={classnames('text-base')}>
                <div className={classnames('text-lg', 'font-bold')}>Alarms:</div>
                <div className="Alarms">
                    <div className={classnames('flex', 'items-center', 'text-red-600')}>
                        <Icon
                            icon="bi:exclamation-triangle"
                            width="20"
                            height="20"
                            fr={undefined}
                        />
                        <span className={classnames('pl-1')}>In alarm({health.alarms.iaNum})</span>
                    </div>
                    <div className={classnames('flex', 'items-center', 'text-gray-400')}>
                        <Icon
                            icon="ic:outline-more"
                            width="20"
                            height="20"
                            rotate={2}
                            fr={undefined}
                        />
                        <span className={classnames('pl-1')}>Insufficient data({health.alarms.isNum})</span>
                    </div>
                    <div className={classnames('flex', 'items-center', 'text-green-600')}>
                        <Icon
                            icon="bi:check-circle"
                            width="20"
                            height="20"
                            fr={undefined}
                        />
                        <span className={classnames('pl-1')}>OK({health.alarms.okNum})</span>
                    </div>
                </div>
            </div>
            <div className={classnames('text-base')}>
                <div className={classnames('text-lg', 'font-bold')}>
                    CloudWatch Dashboards(<span className={'font-normal'}>Favorite</span>):
                </div>
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

    /**
     * 跳转外部链接
     * @param url
     */
    const goView = (url) => {
        window.location.href = url;
    };

    /**
     * 控制展示面板
     * @param item : Graphical-展示Graphical面板
     *               List - 展示list面板
     */
    const changeShow = (item) => {
        setIsShowGraphical(item === 'Graphical');
    };

    const changeDictName = (dcName) => {
        setDcName(dcName);
    };

    return (
        <div className={classnames('space-y-4')}>
            <div className={classnames('flex', 'justify-end', 'items-center')}>
                <span>当前数据中心：</span>
                <DictListSelect propDcName={dcName} onChangeClick={changeDictName}/>
            </div>
            <div className={classnames('grid', 'grid-cols-2', 'gap-4')}>
                <DashCard height={'h-60'} cardTitle={tableList['dataCenter']['cardTitle']}
                    content={tableView('dataCenter')}/>
                <DashCard height={'h-60'} cardTitle={'healthy Summary'} content={healthyView()}/>
            </div>
            <div className={classnames('flex', 'justify-end')}>
                <div
                    className={classnames('flex', 'justify-end', 'items-center', 'border', 'border-gray-300', 'rounded-md', 'p-2')}>
                    <div>View:</div>
                    <div className={classnames('p-2', { 'font-semibold': isShowGraphical })}
                        onClick={() => changeShow('Graphical')}>Graphical
                    </div>
                    <div>|</div>
                    <div className={classnames('pl-2', { 'font-semibold': !isShowGraphical })}
                        onClick={() => changeShow('List')}>List
                    </div>
                </div>
            </div>
            {
                isShowGraphical ?
                    <div className={classnames('grid', 'grid-cols-3', 'gap-4')}>
                        {
                            Object.keys(graphicalData).map((type) => {
                                return <DashCard key={type} type='Graphical' {...graphicalData[type]} />;
                            })
                        }
                    </div>
                    :
                    <div className={classnames('space-y-4')}>
                        {
                            listShow && listShow.map((item, index) => (
                                <DashCard key={item} cardTitle={tableList[item]['cardTitle']}
                                    content={tableView(item)}/>
                            ))
                        }
                    </div>
            }
        </div>
    );
};
