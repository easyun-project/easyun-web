import { classnames } from '@@/tailwindcss-classnames';
import { Select } from 'antd';
import { DashCard } from '@/components/DashboardCommon/DashCard';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import FlagUtil from '@/utils/flagUtil';
import TimeUtil from '@/utils/time';
import dashboard from '@/service/dashboard';
import { AntdTable } from '@/components/Common/CTable/AntdTable';
import { DictListSelect } from '@/components/DashboardCommon/DictListSelect';
import './index.less';
import { GraphicalType, HealthType, TableType } from '@/views/Dashboard/dashboard';
import { DashboardsTabList } from '@/views/Dashboard/detail/tabList';
import { DashboardsTabGraphical } from '@/views/Dashboard/detail/tabGraphical';
import { DashboardsHealthCard } from '@/views/Dashboard/detail/healthCard';

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
                                        color="#5c6f9a"
                                        width="25" height="25"
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
                            return <Icon icon="akar-icons:circle-fill" color={color[azStatus]} width="20"
                                height="20" fr={undefined}/>;
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
    });
    const [health, setHealth] = useState<HealthType>({
        alarms: { iaNum: 0, isNum: 0, okNum: 0 },
        dashboards: []
    });
    const [graphicalData, setGraphicalData] = useState();
    const [tabListData, setTabListData] = useState();
    // tabs切换，true-Graphical面板,false-list面板
    const [isShowGraphical, setIsShowGraphical] = useState<boolean>(true);
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
     * 变更当前选择数据中心
     * @param dcName
     */
    const changeDictName = (dcName) => {
        setDcName(dcName);
    };

    /**
     * 控制展示面板
     * @param item : Graphical-展示Graphical面板
     *               List - 展示list面板
     */
    const changeShow = (item) => {
        setIsShowGraphical(item === 'Graphical');
    };

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
        dashboard.getGraphical({ dcName }).then(res => {
            setGraphicalData(res);
        });
    };

    /**
     * 获取list面板数据
     */
    const getInventory = () => {
        dashboard.getInventory({ dcName }).then(res => {
            setTabListData(res);
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

    return (
        <div className={classnames('space-y-4')}>
            <div className={classnames('flex', 'justify-end', 'items-center')}>
                <span>当前数据中心：</span>
                <DictListSelect propDcName={dcName} onChangeClick={changeDictName}/>
            </div>
            <div className={classnames('grid', 'grid-cols-2', 'gap-4')}>
                <DashCard height={'h-60'} cardTitle={tableList['dataCenter']['cardTitle']}
                    content={tableView('dataCenter')}/>
                <DashboardsHealthCard health={health}/>
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
                    <DashboardsTabGraphical listData={graphicalData}/>
                    :
                    <DashboardsTabList listData={tabListData}/>
            }
        </div>
    );
};
