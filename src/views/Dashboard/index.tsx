import React, { useEffect, useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { DashboardDetail } from '@/views/Dashboard/detail';
import { Button, Select } from 'antd';
import { DictListSelect } from '@/components/DashboardCommon/DictListSelect';
import './detail/index.less';
import { DoubleRightOutlined } from '@ant-design/icons';
import { TTailwindString } from 'tailwindcss-classnames';

const { Option } = Select;

export const Dashboard = (props): JSX.Element => {
    const [dcName, setDcName] = useState<string>('');
    const [detailShow, setDetailShow] = useState<boolean>(false);
    const buttonStyle: TTailwindString = classnames('bg-yellow-550', 'text-white', 'rounded-3xl', 'h-10', 'w-32', 'px-5', 'bg-yellow-550', 'block', 'text-white');

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
                        <div className={classnames('text-sm', 'm-1')}>
                            <span className={classnames('mr-2')}>Please select the data center you want to view</span>
                            <DictListSelect onChangeClick={changeDictName}/>
                        </div>
                        <Button className={classnames(buttonStyle)} disabled={!dcName} onClick={onShow}>Next</Button>
                    </div>
            }
        </div>
    );

};

export default Dashboard;
