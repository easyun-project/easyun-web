import React from 'react';
import { DbiModel } from '@/constant/database';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import databaseIcon from '@@/src/assets/images/resource/database.png';


export default function DatabaseCard(props: DbiModel) {
    const { dbiId, dbiStatus, dbiEngine, dbiSize } = props;
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
        <div className={dbiStatus === 'available'
            ? 'flex flex-col p-2 mx-8 w-96 bg-gray-200 rounded-border'
            : 'flex flex-col p-2 mx-8 w-96 bg-amber-50 rounded-border'}>
            <div className='flex m-1 mb-2 '>
                <img src={databaseIcon} alt="Database" width="50" className='inline' />
                <div className='grow ml-2'>
                    <Link to={dbiId} className='text-lg text-blue-600'>{dbiId}</Link>
                    <div className='mt-1 text-xs text-gray-500'>{dbiEngine}</div>
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
                    <div className='mt-4 text-xs text-gray-500'>{dbiStatus}</div>
                </div>

            </div>
            <div className='flex justify-between items-center pt-1 mx-2 border-t-2 border-gray-300 border-dashed'>
                <div className='text-xs text-gray-500'>{dbiSize}</div>
            </div>
        </div>
    );
}