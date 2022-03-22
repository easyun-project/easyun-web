import React, { useEffect, useState } from 'react';
import { DashCard } from '@/components/DashboardCommon/DashCard';
import { AntdTable } from '@/components/Common/CTable/AntdTable';
import { TableType } from '@/views/Dashboard/dashboard';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import FlagUtil from '@/utils/flagUtil';
import TimeUtil from '@/utils/time';
import dashboard from '@/service/dashboard';

export const DashboardsTabList = (props): JSX.Element => {
    const { listData } = props;
    const [tableList, setTableList] = useState<TableType>({
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
    const [listShow, setListShow] = useState<Array<string>>([]);

    useEffect(() => {
        listData && getInventory();
    }, [listData]);

    /**
     * 获取list面板数据
     * 根据接口返回type,存入tableList对应字段的dataSource
     * 后端接口有数据且tableList存在相应字段，存入showList进行展示
     */
    const getInventory = () => {
        const temp = { ...tableList };
        const showList: Array<string> = [];
        listData.forEach(item => {
            if (item.data.length > 0 && temp[item.type]) {
                showList.push(item.type);
                temp[item.type].data.dataSource = item.data;
            }
        });
        setTableList(temp);
        setListShow(showList);
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

    return (
        <div className={classnames('space-y-4')}>
            {
                listShow && listShow.map((item, index) => (
                    <DashCard key={item} cardTitle={tableList[item]['cardTitle']}
                        content={tableView(item)}/>
                ))
            }
        </div>
    );
};
