import React from 'react';
import { DbiModel } from '@/constant/database';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import defaultIcon from '@@/src/assets/images/resource/database.png';
import auroraIcon from '@@/src/assets/images/resource/res_aws_db_aurora.svg';
import mysqlIcon from '@@/src/assets/images/resource/res_aws_db_mysql.svg';
import mariaIcon from '@@/src/assets/images/resource/res_aws_db_mariadb.svg';
import postgresIcon from '@@/src/assets/images/resource/res_aws_db_postgres.svg';
import oracleIcon from '@@/src/assets/images/resource/res_aws_db_oracle.svg';
import sqlserverIcon from '@@/src/assets/images/resource/res_aws_db_sqlserver.svg';


export default function DatabaseCard(props: DbiModel) {
    const { dbiId, dbiStatus, dbiEngine, engineVer, dbiSize, ramSize, vcpuNum, volumeSize, dbiAz } = props;
    let dbIcon: string;
    switch (dbiEngine) {
    case 'aurora': dbIcon = auroraIcon;
        break;
    case 'mysql': dbIcon = mysqlIcon;
        break;
    case 'postgres': dbIcon = postgresIcon;
        break;
    case 'maria': dbIcon = mariaIcon;
        break;
    case 'oracle': dbIcon = oracleIcon;
        break;
    case 'sqlserver': dbIcon = sqlserverIcon;
        break;
    default: dbIcon = defaultIcon;
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
        <div className={dbiStatus === 'available'
            ? 'flex flex-col p-2 mx-8 w-96 bg-gray-200 rounded-border'
            : 'flex flex-col p-2 mx-8 w-96 bg-amber-50 rounded-border'}>
            <div className='flex m-1 mb-2 '>
                <img src={dbIcon} alt="Database" width="50" className='inline' />
                <div className='grow ml-2'>
                    <Link to={dbiId} className='text-lg text-blue-600'>{dbiId}</Link>
                    <div className='mt-1 text-xs text-gray-500'>version: {engineVer}</div>
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
                <div className='text-xs text-gray-500'>{dbiSize} ({vcpuNum}*vCPU, {ramSize}GB, {volumeSize}GiB)</div>
                <div className='text-xs text-gray-500'>{dbiAz}</div>
            </div>
        </div>
    );
}