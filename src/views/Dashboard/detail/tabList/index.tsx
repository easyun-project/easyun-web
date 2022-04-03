import React, { useEffect, useState } from 'react';
import { DashCard } from '@/components/DashboardCommon/DashCard';
import { AntdTable } from '@/components/Common/CTable/AntdTable';
import { TableType } from '@/views/Dashboard/dashboard';
import { classnames } from '@@/tailwindcss-classnames';
import TimeUtil from '@/utils/time';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

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
                        render: (text: string) => {
                            return <Link to={`/resource/server/${text}`}
                                className={classnames('text-blue-500', 'underline')}>{text}</Link>;
                        },
                        sorter: (a, b) => a.svrId?.localeCompare(b.svrId)
                    },
                    {
                        title: 'Name（tag）',
                        dataIndex: 'tagName',
                        key: 'tagName',
                        sorter: (a, b) => a.tagName?.localeCompare(b.tagName)
                    },
                    {
                        title: 'State',
                        dataIndex: 'svrState',
                        key: 'svrState',
                        render: (text: string) => {
                            if (text === 'running' || text === 'pending') {
                                return <span className={classnames('text-green-400')}>{text}</span>;
                            } else if (text === 'stopped' || text === 'shutting-down') {
                                return <span className={classnames('text-gray-500')}>{text}</span>;
                            } else {
                                return <span className={classnames('text-red-500')}>{text}</span>;
                            }
                        },
                        sorter: (a, b) => {
                            const order = ['pending', 'running', 'shutting-down', 'stopped', 'terminated'];
                            return order.indexOf(a.svrState) - order.indexOf(b.svrState);
                        },
                    },
                    {
                        title: 'Instance type',
                        dataIndex: 'insType',
                        key: 'insType',
                        sorter: (a, b) => a.insType?.localeCompare(b.insType)
                    },
                    {
                        title: 'vCPU',
                        dataIndex: 'vpuNum',
                        key: 'vpuNum',
                        sorter: (a, b) => a.vpuNum?.localeCompare(b.vpuNum)
                    },
                    {
                        title: 'RAM',
                        dataIndex: 'ramSize',
                        key: 'ramSize',
                        sorter: (a, b) => a.ramSize?.localeCompare(b.ramSize)
                    },
                    {
                        title: 'Storage（EBS）',
                        dataIndex: 'diskSize',
                        key: 'diskSize',
                        render: diskSize => {
                            return diskSize && <div>{diskSize} GiB</div>;
                        },
                        sorter: (a, b) => a.diskSize?.localeCompare(b.diskSize)
                    },
                    {
                        title: 'OS',
                        dataIndex: 'osName',
                        key: 'osName',
                        sorter: (a, b) => a.osName?.localeCompare(b.osName)
                    },
                    {
                        title: 'Region & AZ',
                        dataIndex: 'azName',
                        key: 'azName',
                        sorter: (a, b) => a.azName?.localeCompare(b.azName)
                    },
                    {
                        title: 'Public IPv4',
                        dataIndex: 'priIp',
                        key: 'priIp',
                        sorter: (a, b) => a.priIp?.localeCompare(b.priIp)
                    },
                    {
                        title: 'Launch time',
                        dataIndex: 'launchTime',
                        key: 'launchTime',
                        render: launchTime => {
                            return TimeUtil.utcConvertTimeZone({ date: launchTime });
                        },
                        sorter: (a, b) => a.launchTime?.localeCompare(b.launchTime)
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
                        render: (text: string) => {
                            return <Link to={`/resource/storage/block/${text}`}
                                className={classnames('text-blue-500', 'underline')}>{text}</Link>;
                        },
                        sorter: (a, b) => a.volumeId?.localeCompare(b.volumeId)
                    },
                    {
                        title: 'Name（tag）',
                        dataIndex: 'attachSvr',
                        key: 'attachSvr',
                        sorter: (a, b) => a.attachSvr?.localeCompare(b.attachSvr)
                    },
                    {
                        title: 'Type',
                        dataIndex: 'volumeType',
                        key: 'volumeType',
                        sorter: (a, b) => a.volumeType?.localeCompare(b.volumeType)
                    },
                    {
                        title: 'Size',
                        dataIndex: 'volumeSize',
                        key: 'volumeSize',
                        sorter: (a, b) => a.volumeSize?.localeCompare(b.volumeSize)
                    },
                    {
                        title: 'IOPS',
                        dataIndex: 'volumeIops',
                        key: 'volumeIops',
                        sorter: (a, b) => a.volumeIops?.localeCompare(b.volumeIops)
                    },
                    {
                        title: 'Throughput',
                        dataIndex: 'volumeThruput',
                        key: 'volumeThruput',
                        sorter: (a, b) => a.volumeThruput?.localeCompare(b.volumeThruput)
                    },
                    {
                        title: 'Encrypted',
                        dataIndex: 'isEncrypted',
                        key: 'isEncrypted',
                        render: (diskEncrypt) => {
                            return <div>{diskEncrypt?.toString()}</div>;
                        },
                        sorter: (a, b) => a.isEncrypted?.toString()?.localeCompare(b.isEncrypted?.toString())
                    },
                    {
                        title: 'State',
                        dataIndex: 'volumeState',
                        key: 'volumeState',
                        sorter: (a, b) => a.volumeState?.localeCompare(b.volumeState)
                    },
                    {
                        title: 'Attachment',
                        dataIndex: 'attachSvr',
                        key: 'attachSvr',
                        sorter: (a, b) => a.attachSvr?.localeCompare(b.attachSvr)
                    },
                    {
                        title: 'Device path',
                        dataIndex: 'attachPath',
                        key: 'attachPath',
                        sorter: (a, b) => a.attachPath?.localeCompare(b.attachPath)
                    },
                    {
                        title: 'Disk type',
                        dataIndex: 'diskType',
                        key: 'diskType',
                        sorter: (a, b) => a.diskType?.localeCompare(b.diskType)
                    },
                    {
                        title: 'Availability Zone',
                        dataIndex: 'volumeAz',
                        key: 'volumeAz',
                        sorter: (a, b) => a.volumeAz?.localeCompare(b.volumeAz)
                    },
                    {
                        title: 'Create time',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        render: createTime => {
                            return TimeUtil.utcConvertTimeZone({ date: createTime });
                        },
                        sorter: (a, b) => a.createTime?.localeCompare(b.createTime)
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
                        render: (text: string) => {
                            return <Link to={`/resource/storage/object/${text}`}
                                className={classnames('text-blue-500', 'underline')}>{text}</Link>;
                        },
                        sorter: (a, b) => a.bktId?.localeCompare(b.bktId)
                    },
                    {
                        title: 'Region',
                        dataIndex: 'bktRegion',
                        key: 'bktRegion',
                        sorter: (a, b) => a.bktRegion?.localeCompare(b.bktRegion)
                    },
                    {
                        title: 'Access',
                        dataIndex: 'bktAccess',
                        key: 'bktAccess',
                        sorter: (a, b) => a.bktAccess?.localeCompare(b.bktAccess)
                    },
                    {
                        title: 'Default encryption',
                        dataIndex: 'isEncrypted',
                        key: 'isEncrypted',
                        render: (bucketEncryption) => {
                            return <div>{bucketEncryption?.toString()}</div>;
                        },
                        sorter: (a, b) => a.isEncrypted?.toString()?.localeCompare(b.isEncrypted?.toString())
                    },
                    {
                        title: 'Versioning',
                        dataIndex: 'bktVersioning',
                        key: 'bktVersioning',
                        sorter: (a, b) => a.bktVersioning?.localeCompare(b.bktVersioning)
                    },
                    {
                        title: 'Create time',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        render: createTime => {
                            return TimeUtil.utcConvertTimeZone({ date: createTime });
                        },
                        sorter: (a, b) => a.createTime?.localeCompare(b.createTime)
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
                        sorter: (a, b) => a.dbiId?.localeCompare(b.dbiId)
                    },
                    {
                        title: 'Role',
                        dataIndex: 'rdsRole',
                        key: 'rdsRole',
                        sorter: (a, b) => a.rdsRole?.localeCompare(b.rdsRole)
                    },
                    {
                        title: 'Engine',
                        dataIndex: 'dbiEngine',
                        key: 'dbiEngine',
                        sorter: (a, b) => a.dbiEngine?.localeCompare(b.dbiEngine)
                    },
                    {
                        title: 'Version',
                        dataIndex: 'engineVer',
                        key: 'engineVer',
                        sorter: (a, b) => a.engineVer?.localeCompare(b.engineVer)
                    },
                    {
                        title: 'Status',
                        dataIndex: 'dbiStatus',
                        key: 'dbiStatus',
                        sorter: (a, b) => a.dbiStatus?.localeCompare(b.dbiStatus)
                    },
                    {
                        title: 'Size',
                        dataIndex: 'dbiSize',
                        key: 'dbiSize',
                        sorter: (a, b) => a.dbiSize?.localeCompare(b.dbiSize)
                    },
                    {
                        title: 'vCPU',
                        dataIndex: 'vcpuNum',
                        key: 'vcpuNum',
                        sorter: (a, b) => a.vcpuNum?.localeCompare(b.vcpuNum)
                    },
                    {
                        title: 'RAM',
                        dataIndex: 'ramSize',
                        key: 'ramSize',
                        sorter: (a, b) => a.ramSize?.localeCompare(b.ramSize)
                    },
                    {
                        title: 'Storage',
                        dataIndex: 'volumeSize',
                        key: 'volumeSize',
                        sorter: (a, b) => a.volumeSize?.localeCompare(b.volumeSize)
                    },
                    {
                        title: 'Region & AZ',
                        dataIndex: 'dbiAz',
                        key: 'dbiAz',
                        sorter: (a, b) => a.dbiAz?.localeCompare(b.dbiAz)
                    },
                    {
                        title: 'Multi-AZ',
                        dataIndex: 'multiAz',
                        key: 'multiAz',
                        render: (multiAz) => {
                            return <div>{multiAz?.toString()}</div>;
                        },
                        sorter: (a, b) => a.multiAz?.toString()?.localeCompare(b.multiAz?.toString())
                    },
                    {
                        title: 'Create Time',
                        dataIndex: 'createTime',
                        key: 'createTime',
                        render: createTime => {
                            return TimeUtil.utcConvertTimeZone({ date: createTime });
                        },
                        sorter: (a, b) => a.createTime?.localeCompare(b.createTime)
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
                        render: (text: string) => {
                            return <Link to={`/datacenter/subnet/${text}`}
                                className={classnames('text-blue-500', 'underline')}>{text}</Link>;
                        },
                        sorter: (a, b) => a.subnetId?.localeCompare(b.subnetId)
                    },
                    {
                        title: 'Name(tag)',
                        dataIndex: 'tagName',
                        key: 'tagName',
                        sorter: (a, b) => a.tagName?.localeCompare(b.tagName)
                    },
                    {
                        title: 'State',
                        dataIndex: 'subnetState',
                        key: 'subnetState',
                        sorter: (a, b) => a.subnetState?.localeCompare(b.subnetState)
                    },
                    {
                        title: 'Type',
                        dataIndex: 'subnetType',
                        key: 'subnetType',
                        sorter: (a, b) => a.subnetType?.localeCompare(b.subnetType)
                    },
                    {
                        title: 'IPv4 CIDR',
                        dataIndex: 'cidrBlock',
                        key: 'cidrBlock',
                        sorter: (a, b) => a.cidrBlock?.localeCompare(b.cidrBlock)
                    },
                    {
                        title: 'Available IPv4',
                        dataIndex: 'avlipNum',
                        key: 'avlipNum',
                        sorter: (a, b) => a.avlipNum?.localeCompare(b.avlipNum)
                    },
                    {
                        title: 'IPv6 CIDR',
                        dataIndex: 'cidrBlockv6',
                        key: 'cidrBlockv6',
                        sorter: (a, b) => a.cidrBlockv6?.localeCompare(b.cidrBlockv6)
                    },
                    {
                        title: 'Availability Zone',
                        dataIndex: 'subnetAz',
                        key: 'subnetAz',
                        sorter: (a, b) => a.subnetAz?.localeCompare(b.subnetAz)
                    },
                    {
                        title: 'Auto-assign Pub IP',
                        dataIndex: 'isMappubip',
                        key: 'isMappubip',
                        render: (isMappubip) => {
                            return <div>{isMappubip?.toString()}</div>;
                        },
                        sorter: (a, b) => a.isMappubip?.toString()?.localeCompare(b.isMappubip?.toString())
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
                        render: (text: string) => {
                            return <Link to={`/datacenter/security/${text}`}
                                className={classnames('text-blue-500', 'underline')}>{text}</Link>;
                        },
                        sorter: (a, b) => a.sgId?.localeCompare(b.sgId)
                    },
                    {
                        title: 'Name(tag)',
                        dataIndex: 'tagName',
                        key: 'tagName',
                        sorter: (a, b) => a.tagName?.localeCompare(b.tagName)
                    },
                    {
                        title: 'Security Group name',
                        dataIndex: 'sgName',
                        key: 'sgName',
                        sorter: (a, b) => a.sgName?.localeCompare(b.sgName)
                    },
                    {
                        title: 'Inbound rules count',
                        dataIndex: 'ibrulesNum',
                        key: 'ibrulesNum',
                        sorter: (a, b) => a.ibrulesNum?.localeCompare(b.ibrulesNum)
                    },
                    {
                        title: 'Outbound rules count',
                        dataIndex: 'obrulesNum',
                        key: 'obrulesNum',
                        sorter: (a, b) => a.obrulesNum?.localeCompare(b.obrulesNum)
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
            {
                !listShow && <Table/>
            }
        </div>
    );
};
