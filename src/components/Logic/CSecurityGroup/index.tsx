import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { SecurityGroup } from '@/constant/dataCenter';

interface CSecurityGroupProps {
    classes?: TTailwindString;
    sg: SecurityGroup | undefined
}

const CSecurityGroup = (props: CSecurityGroupProps): JSX.Element => {
    const sg = props.sg;
    return (
        <div className={classnames(props.classes)}>
            <div className={classnames('my-3', 'p-3', 'border-2', 'border-yellow-550', 'rounded-xl', 'w-56')}>
                <Icon className={classnames('inline-block', 'mr-2')} width="25" height="25" color='black'
                    icon="ant-design:lock-outlined" fr={undefined}/>
                {sg?.tagName}
            </div>

            <div
                className={classnames('my-3', 'p-3', 'border-2', 'border-dashed', 'border-yellow-550', 'rounded', 'w-56')}>
                <div>Enable Ping:
                    <input type='checkbox' className={classnames('ml-10')} defaultChecked={sg?.enablePing}/>
                </div>
                <div>Enable SSH:
                    <input type='checkbox' className={classnames('ml-10')} defaultChecked={sg?.enableSSH}/>
                </div>
                <div className={classnames('pb-5')}>
                    Enable RDP:
                    <input type='checkbox' className={classnames('ml-10')} defaultChecked={sg?.enableRDP}/>
                </div>

                <div>In Bound Port:</div>
                <div>TCP 660: 0.0.0.0/0</div>
            </div>

        </div>
    );
};


export default CSecurityGroup;