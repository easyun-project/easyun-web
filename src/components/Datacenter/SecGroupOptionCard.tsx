import React, { useState, useEffect } from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { Typography, Checkbox } from 'antd';
import { SecurityGroupParms } from '@/constant/dataCenter';

interface SecGroupProps {
    classes?: TTailwindString,
    ibList: JSX.Element | undefined,
    sg: SecurityGroupParms | undefined,
    setSg
}

const SecGroupOption = (props: SecGroupProps): JSX.Element => {
    const { sg, setSg, ibList, classes } = props;
    const [ checkedPing, setCheckedPing ] = useState(sg?.enablePing);
    const [ checkedSSH, setCheckedSSH ] = useState(sg?.enableSSH);
    const [ checkedRDP, setCheckedRDP ] = useState(sg?.enableRDP);

    useEffect(() => {
        setCheckedPing(sg?.enablePing);
        setCheckedSSH(sg?.enableSSH);
        setCheckedRDP(sg?.enableRDP);
        // console.log(sg);
    }, [sg]);


    return (
        <div className={classnames(classes)}>
            <div className={classnames('my-1', 'p-3', 'border-2', 'border-yellow-550', 'rounded-xl', 'w-56')}>
                <Icon className={classnames('inline-block', 'mr-2')} width="25" height="25" color='black'
                    icon="ant-design:lock-outlined" fr={undefined}/>
                {sg?.tagName}
            </div>

            <div className={classnames( 'border-2', 'border-dashed', 'border-yellow-550', 'rounded', 'w-56', 'p-3')}>
                <Typography.Text style={{ width: 150 }} className='inline-block'>Enable Ping:</Typography.Text>
                <Checkbox defaultChecked={checkedPing}
                    onChange={(e)=>setCheckedPing(e.target.checked)}>
                </Checkbox>
                <br />
                <Typography.Text style={{ width: 150 }} className='inline-block'>Enable SSH:</Typography.Text>
                <Checkbox defaultChecked={checkedSSH}
                    onChange={(e)=>setCheckedSSH(e.target.checked)}>
                </Checkbox>
                <br />
                <Typography.Text style={{ width: 150 }} className='inline-block'>Enable RDP:</Typography.Text>
                <Checkbox defaultChecked={checkedRDP}
                    onChange={(e)=>setCheckedRDP(e.target.checked)}>
                </Checkbox>

                <Typography.Text strong className={classnames('inline-block','mt-4')}>In Bound Port:</Typography.Text>
                {ibList}
            </div>

        </div>
    );
};

export default SecGroupOption;