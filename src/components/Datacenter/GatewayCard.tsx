import React from 'react';
import { IntGatewayInfo, NatGatewayInfo } from '@/constant/dataCenter';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import igwIcon from '@@/src/assets/images/resource/res_aws_igw.svg';
import natgwIcon from '@@/src/assets/images/resource/res_aws_natgw.svg';


export function InternetGWCard(props: IntGatewayInfo) {
    const { igwId, state, vpcId, tagName } = props;
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={() => { console.log('Manage'); }}>
                Manage
            </Menu.Item>
            <Menu.Item key="delete" danger onClick={() => console.log('Delete')}>
                Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <div className={state === 'available'
            ? 'flex flex-col p-2 w-96 bg-gray-200 rounded-border'
            : 'flex flex-col p-2 w-96 bg-amber-50 rounded-border'}>
            <div className='flex m-1 mb-2 '>
                <img src={igwIcon} alt="Easyun" width="50" className='inline' />
                <div className='grow ml-2'>
                    <Link to={igwId} className='text-lg text-blue-600'>{tagName}</Link>
                    <div className='mt-1 text-xs text-gray-500'>{igwId}</div>
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
                    <div className='mt-4 text-xs text-gray-500'>{state}</div>
                </div>

            </div>
            <div className='flex justify-between items-center pt-1 mx-2 border-t-2 border-gray-300 border-dashed'>
                <div className='text-xs text-gray-500'>{vpcId}</div>
            </div>
        </div>
    );
}


export function NatGWCrad(props: NatGatewayInfo) {
    const { natgwId, state, vpcId, connectType, createTime, tagName  } = props;
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={() => { console.log('Manage'); }}>
                Manage
            </Menu.Item>
            <Menu.Item key="delete" danger onClick={() => console.log('Delete')}>
                Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <div className={state === 'available'
            ? 'flex flex-col p-2 w-96 bg-gray-200 rounded-border'
            : 'flex flex-col p-2 w-96 bg-amber-50 rounded-border'}>
            <div className='flex m-1 mb-2 '>
                <img src={natgwIcon} alt="Easyun" width="50" className='inline' />
                <div className='grow ml-2'>
                    <Link to={natgwId} className='text-lg text-blue-600'>{tagName}</Link>
                    <div className='mt-1 text-xs text-gray-500'>{natgwId}</div>
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
                    <div className='mt-4 text-xs text-gray-500'>{connectType}</div>
                </div>

            </div>
            <div className='flex justify-between items-center pt-1 mx-2 border-t-2 border-gray-300 border-dashed'>
                <div className='text-xs text-gray-500'>{vpcId}</div>
                <div className='text-xs text-gray-500'>{createTime}</div>
            </div>
        </div>
    );
}