import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { DashboardDetail } from '@/views/Dashboard/detail';
import { DictListSelect } from '@/components/DashboardCommon/DictListSelect';
import './detail/index.css';
import { useNavigate } from 'react-router-dom';
import { postApiV1Datacenter, getApiV1DatacenterTask, getApiV1DatacenterList, deleteApiV1Datacenter } from '@/api-client';


export const Dashboard = (props): JSX.Element => {
    const navigate = useNavigate();
    const [dcName, setDcName] = useState<string>('');
    const [detailShow, setDetailShow] = useState<boolean>(false);
    const buttonStyle: string = "bg-yellow-550 text-white rounded-3xl h-10 w-32 px-5 block";

    useEffect(() => {
        getDataCenterList();
    });

    /**
     * 获取数据中心列表，且默认选中第一个
     */
    const getDataCenterList = () => {
        getApiV1DatacenterList().then(({ data }) => {
            const res = (data?.detail || []) as any[];
            res.length > 0 && setDcName(res[0].dcName);
        });
    };

    return (
        <div className={"p-3"}>
            {
                dcName
                    ? <DashboardDetail propDcName={dcName}/>
                    : <div className={"m-20 flex flex-col items-center space-y-2"}>
                        <div className={"text-3xl m-1"}>You have not a data center</div>
                        <div className={"flex items-center text-sm m-1 space-x-2"}>
                            <span>Please create a data center</span>
                        </div>
                        <Button className={clsx(buttonStyle)} onClick={() => navigate('/datacenter/add')}>Next</Button>
                    </div>
            }
        </div>
    );

};

export default Dashboard;
