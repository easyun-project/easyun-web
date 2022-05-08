import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { Typography, Checkbox } from 'antd';
import { SecurityGroupParms } from '@/constant/dataCenter';

interface CSecurityGroupProps {
    classes?: TTailwindString;
    sg: SecurityGroupParms | undefined
    ibList: JSX.Element | undefined
}

const CSecurityGroup = (props: CSecurityGroupProps): JSX.Element => {
    const sg = props.sg;
    return (
        <div className={classnames(props.classes)}>
            <div className={classnames('my-1', 'p-3', 'border-2', 'border-yellow-550', 'rounded-xl', 'w-56')}>
                <Icon className={classnames('inline-block', 'mr-2')} width="25" height="25" color='black'
                    icon="ant-design:lock-outlined" fr={undefined}/>
                {sg?.tagName}
            </div>

            <div className={classnames( 'border-2', 'border-dashed', 'border-yellow-550', 'rounded', 'w-56', 'p-3')}>
                <Typography.Text style={{ width: 150 }} className='inline-block'>Enable Ping:</Typography.Text>
                <Checkbox defaultChecked={sg?.enablePing}> </Checkbox>
                <br />
                <Typography.Text style={{ width: 150 }} className='inline-block'>Enable SSH:</Typography.Text>
                <Checkbox defaultChecked={sg?.enableSSH}> </Checkbox>
                <br />
                <Typography.Text style={{ width: 150 }} className='inline-block'>Enable RDP:</Typography.Text>
                <Checkbox defaultChecked={sg?.enableRDP}> </Checkbox>

                <Typography.Text strong className={classnames('inline-block','mt-4')}>In Bound Port:</Typography.Text>
                {props.ibList}
            </div>

        </div>
    );
};


export default CSecurityGroup;