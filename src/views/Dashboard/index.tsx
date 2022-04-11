import React, { useEffect, useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { DashboardDetail } from '@/views/Dashboard/detail';
import { Button } from 'antd';
import { DictListSelect } from '@/components/DashboardCommon/DictListSelect';
import './detail/index.less';
import { TTailwindString } from 'tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';
import DataCenterService from '@/service/dataCenterService';


export const Dashboard = (props): JSX.Element => {
    const navigate = useNavigate();
    const [dcName, setDcName] = useState<string>('');
    const [detailShow, setDetailShow] = useState<boolean>(false);
    const buttonStyle: TTailwindString = classnames('bg-yellow-550', 'text-white', 'rounded-3xl', 'h-10', 'w-32', 'px-5', 'block');

    useEffect(() => {
        getDataCenterList();
    });

    /**
     * 获取数据中心列表，且默认选中第一个
     */
    const getDataCenterList = () => {
        DataCenterService.getDataCenterList().then(res => {
            res.length > 0 && setDcName(res[0].dcName);
        });
    };

    return (
        <div className={classnames('p-3')}>
            {
                dcName
                    ? <DashboardDetail propDcName={dcName}/>
                    : <div className={classnames('m-20', 'flex', 'flex-col', 'items-center','space-y-2')}>
                        <div className={classnames('text-3xl', 'm-1')}>You have not a data center</div>
                        <div className={classnames('flex', 'items-center', 'text-sm', 'm-1', 'space-x-2')}>
                            <span>Please create a data center</span>
                        </div>
                        <Button className={classnames(buttonStyle)} onClick={() => navigate('/datacenter/add')}>Next</Button>
                    </div>
            }
        </div>
    );

};

export default Dashboard;
