/*
 * @Author: lishihao
 * @Description: one of bucketManage page tabs
 */

import React, { useState } from 'react';
import permissionLogo from '@/assets/images/stbucket.png';
import { Tree } from 'antd';
import { EditOutlined } from '@ant-design/icons';
// import { withEdit } from '@/utils/hoc';
// import { Icon } from '@iconify/react';
import { useTranslation, Trans } from 'react-i18next';

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

export default function Permissions() {
    const { t } = useTranslation(['translation', 'bucketManagePermissions']);
    const [changing, setChanging] = useState(false);
    const [settings, setSettings] = useState<Record<string,boolean>>({});
    const treeData = [
        {
            title: <Trans i18nKey={'bucketManagePermissions.blockAll'}/>,
            key: '0-0',
            children: [
                {
                    title: <Trans i18nKey={'bucketManagePermissions.blockNewACLs'}/>,
                    key: 'newAcl',
                },
                {
                    title: <Trans i18nKey={'bucketManagePermissions.blockAnyACLs'}/>,
                    key: 'allAcl',
                },
                {
                    title: <Trans i18nKey={'bucketManagePermissions.blockNewPublic'}/>,
                    key: 'newPolicy',
                },
                {
                    title: <Trans i18nKey={'bucketManagePermissions.blockAnyPublic'}/>,
                    key: 'allPolicy',
                },
            ]
        },
    ];

    return (
        <div className='p-2'>
            <div className='text-2xl'>{t('bucketManagePermissions.title')}</div>
            <Trans i18nKey={'bucketManagePermissions.tip'}/>
            <div>{t('bucketManagePermissions.href')}</div>
            <div className='flex'>
                <div>
                    <div>{t('bucketManagePermissions.infoTitle')}</div>
                    <div>{t('bucketManagePermissions.infoTip')}</div>
                </div>
                <button onClick={()=>setChanging(!changing)}>{t('bucketManagePermissions.infoButton')}</button>
            </div>
            <Tree
                disabled={!changing}
                checkable
                defaultExpandedKeys={['allAcl']}
                defaultCheckedKeys={['0-0']}
                onCheck={
                    checkedKeys=>
                    {
                        const keys = checkedKeys as React.Key[];
                        setSettings({
                            allPolicy: keys.includes('allPolicy'),
                            allAcl: keys.includes('allAcl'),
                            newAcl: keys.includes('newAcl'),
                            newPolicy: keys.includes('newPolicy')
                        });
                    }

                }
                treeData={treeData}
            />
        </div>
    );
}
