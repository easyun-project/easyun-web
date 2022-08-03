import React from 'react';
import { ElbModel } from '@/constant/loadbalancer';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import albIcon from '@@/src/assets/images/resource/res_aws_elb_alb.svg';
import nlbIcon from '@@/src/assets/images/resource/res_aws_elb_nlb.svg';


export default function LoadbalancerCard(props: ElbModel) {
    const { elbId, elbType, elbState, elbZones, createTime, dnsName } = props;
    let elbIcon: string;
    switch (elbType) {
    case 'application':
        elbIcon = albIcon;
        break;
    case 'network':
        elbIcon = nlbIcon;
        break;
    default:
        elbIcon = nlbIcon;
        break;
    }
    const menu = (
        <Menu>
            <Menu.Item key="manage" onClick={() => { console.log('Manage'); }}>
                Manage
            </Menu.Item>
            <Menu.Item key="delete" danger onClick={() => console.log('Delete')}>
                Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <div className='flex flex-col p-2 mx-8 w-96 bg-gray-200 rounded-border'>
            <div className='flex m-1 mb-2 '>
                <img src={elbIcon} alt="Load Balancer" width="50" className='inline' />
                <div className='grow ml-2'>
                    <Link to={elbId} className='text-lg text-blue-600'>{elbId}</Link>
                    <div className='mt-1 text-xs text-gray-500'>{dnsName.split('.')[0]}</div>
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
                    <div className='mt-4 text-xs text-gray-500'>{elbState}</div>
                </div>

            </div>
            <div className='flex justify-between items-center pt-1 mx-2 border-t-2 border-gray-300 border-dashed'>
                <div className='text-xs text-gray-500'>{elbType}</div>
                <div className='text-xs text-gray-500'>{createTime}</div>
            </div>
        </div>
    );
}