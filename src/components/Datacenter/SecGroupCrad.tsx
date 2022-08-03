import React from 'react';
import { SecurityGroupInfo } from '@/constant/dataCenter';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import sgIcon from '@@/src/assets/images/resource/res_aws_security.svg';


export default function SecGroupCard(props: SecurityGroupInfo) {
    const { tagName, sgId, sgName, sgDesc, ibRulesNum, obRulesNum } = props;
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={() => { console.log('Manage'); }}>
                Manage
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() => console.log('Delete')}
            >
                Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <div className={'flex flex-col p-2 w-96 bg-gray-200 rounded-border'}>
            <div className='flex m-1 mb-2 '>
                <img src={sgIcon} alt="Easyun" width="50" className='inline' />
                <div className='grow ml-2'>
                    <Link to={sgId} className='text-lg text-blue-600'>{sgName}</Link>
                    <div className='mt-1 text-xs text-gray-500'>{sgId}</div>
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
                    <div className='mt-4 text-xs text-gray-500'></div>
                </div>

            </div>
            <div className='flex justify-between items-center pt-1 mx-2 border-t-2 border-gray-300 border-dashed'>
                <div className='text-xs text-gray-500'>{sgDesc}</div>
                <div className='text-xs text-gray-500'>[In:{ibRulesNum} / Out:{obRulesNum}]</div>
            </div>
        </div>
    );
}
