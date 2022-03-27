import React, { useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { DashboardDetail } from '@/views/Dashboard/detail';
import { Button } from 'antd';
import { DictListSelect } from '@/components/DashboardCommon/DictListSelect';
import './detail/index.less';
import { TTailwindString } from 'tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';


export const Dashboard = (props): JSX.Element => {
    const navigate = useNavigate();
    const [dcName, setDcName] = useState<string>('');
    const [detailShow, setDetailShow] = useState<boolean>(false);
    const buttonStyle: TTailwindString = classnames('bg-yellow-550', 'text-white', 'rounded-3xl', 'h-10', 'w-32', 'px-5', 'block');

    const changeDictName = (dcName) => {
        setDcName(dcName);
    };

    const onShow = () => {
        setDetailShow(true);
    };

    return (
        <div className={classnames('min-h-screen', 'p-3')}>
            {
                detailShow
                    ? <DashboardDetail propDcName={dcName}/>
                    : <div className={classnames('m-20', 'flex', 'flex-col', 'items-center', 'h-screen')}>
                        <div className={classnames('text-3xl', 'm-1')}>You have not selected a data center</div>
                        <div className={classnames('text-sm', 'm-1', 'space-x-2')}>
                            <span>Please select the data center you want to view</span>
                            <DictListSelect onChangeClick={changeDictName}/>
                        </div>
                        <div className={classnames('flex', 'items-center', 'text-sm', 'm-1', 'space-x-2')}>
                            <span>or create a data center</span>
                            <button className="btn-yellow" onClick={() => navigate('/datacenter/add')}> create new
                                datacenter
                            </button>
                        </div>
                        <Button className={classnames(buttonStyle)} disabled={!dcName} onClick={onShow}>Next</Button>
                    </div>
            }
        </div>
    );

};

export default Dashboard;
