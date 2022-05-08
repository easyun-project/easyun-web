/*
 * @Author: lishihao
 * @Description: one of bucketManage page tabs
 */

import React from 'react';
import permissionLogo from '@/assets/images/stbucket.png';
import { Tree } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { withEdit } from '@/utils/hoc';
import { Icon } from '@iconify/react';

const PermissionCard = ({ statusMsg, changePermission }) => {
    return (
        <div className='p-2  mb-2 w-7/12 rounded-lg border-2'>
            <div className='flex items-center'>
                <div className='w-20'>
                    <img src={permissionLogo} />
                </div>
                <div className='grow ml-5'>
                    <div className='font-bold'>{statusMsg}</div>
                    <div className='leading-tight text-gray-500'>Your objects are readable only by you or anyone you give access to.</div>
                </div>
                <div className='mr-5 text-yellow-600 cursor-pointer' onClick={() => changePermission()}>
                    <p><EditOutlined /> Change permissions</p>
                </div>
            </div>
        </div>
    );
};

const PermissionTree = ({ treeData, dashed }) => {
    return (
        <Tree className={`${dashed}`} treeData={treeData} autoExpandParent checkable defaultExpandedKeys={['0-0-0']} />
    );
};

// TODO 确定接口数据结构
const treeData = [
    {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
            {
                title: 'parent 1-1',
                key: '0-0-0-0',
            },
            {
                title: 'parent 1-2',
                key: '0-0-0-1',
            },
            {
                title: 'parent 1-3',
                key: '0-0-0-2',
            },
            {
                title: 'parent 1-4',
                key: '0-0-0-3',
            }
        ]
    }
];

export default function Permissions({ bucketData }) {
    const [PermissionTreeA, toggleShow] = withEdit(PermissionTree, () => { }, 'border-dashed border-2');
    return (
        <div className='p-2'>
            <p className='text-2xl'>Bucket access permissions</p>
            <p>Manage the anonymous access to objects in this bucket.You can make all objects private or public(read-only).Alternatively, you can keep your bucket private while making individual objects public(read-only).</p>
            <p className='mt-2 mb-1 font-semibold text-blue-500 cursor-pointer' onClick={() => { window.open('https://aws.amazon.com/cn/s3/?nc2=type_a'); }}>Learn more ablout bucket permissions <Icon className='inline' icon="ri:share-box-fill" fr={undefined} /></p>
            <PermissionCard statusMsg={bucketData.statusMsg} changePermission={toggleShow} />
            <PermissionTreeA treeData={treeData} />
        </div>
    );
}
