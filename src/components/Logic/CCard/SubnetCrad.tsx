import React from 'react';
import { SubnetInfo } from '@/constant/dataCenter';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Dropdown,Menu } from 'antd';

export default function SubnetCrad(props:SubnetInfo) {
    const { subnetType,tagName,subnetId,cidrBlock,avlipNum,subnetAz } = props;
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={()=>{console.log('123');}}>
          Detail
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() =>console.log('123')}
            >
        Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <div className={subnetType === 'public'
            ? 'flex flex-col p-2 w-96 bg-green-50 rounded-border'
            : 'flex flex-col p-2 w-96 bg-amber-50 rounded-border'}>
            <div className='flex m-1 mb-2 '>
                {subnetType === 'public'
                    ? <Icon icon="gis:globe-alt-o" width="50" color='#686868' inline={true} />
                    : <Icon icon="teenyicons:lock-circle-outline" width="50" color='#686868' inline={true} />}
                <div className='grow ml-2'>
                    <Link to={subnetId}  className='text-lg text-blue-600'>{tagName}</Link>
                    <div className='mt-1 text-xs text-gray-500'>{subnetId}</div>
                </div>
                <div className='flex flex-col items-end '>
                    <Dropdown overlay={menu}>
                        <Icon
                            icon="fluent:more-vertical-20-filled"
                            width="20"
                            fr={undefined}
                            className='hover:text-yellow-550 cursor-pointer'
                        />
                    </Dropdown>
                    <div className='mt-4 text-xs text-gray-500'>{subnetType}</div>
                </div>

            </div>
            <div className='flex justify-between items-center pt-1 mx-2 border-t-2 border-gray-300 border-dashed'>
                <div className='text-xs text-gray-500'>CIDR:{cidrBlock} [{avlipNum}/251]</div>
                <div className='text-xs text-gray-500'>{subnetAz}</div>
            </div>
        </div>
    );
}
