/*
 * @Author: lishihao
 * @Description: one of bucketManage page tabs
 */

import React, { useState } from 'react';
import permissionLogo from '@/assets/images/stbucket.png';
import { Tree,Spin,Empty,Switch } from 'antd';
import { CheckOutlined, CloseOutlined, EditOutlined, } from '@ant-design/icons';
// import { withEdit } from '@/utils/hoc';
// import { Icon } from '@iconify/react';
import { useTranslation, Trans } from 'react-i18next';
import WithEdit from './WithEdit';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
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

export default function Permissions() {
    const { t } = useTranslation(['translation', 'bucketManagePermissions']);
    const initSettings = useSelector((state:RootState)=>state.storage.currentBucket);
    const [changing, setChanging] = useState(false);
    const [settings, setSettings] = useState<Record<string,boolean>>({});
    const dynamicIcon = ( { checked } ) => (
        checked
            ? <Icon icon="bxs:lock-alt" width='24' className='mr-2 text-red-500'/>
            : <Icon icon="bxs:lock-open-alt" width='24' className='mr-2 text-green-500 '/>);
    const treeData = [
        {
            title: <Trans i18nKey={'bucketManagePermissions.blockAll'}/>,
            key: '0-0',
            children: [
                {
                    title: <Trans i18nKey={'bucketManagePermissions.blockNewACLs'}/>,
                    key: 'newAcl',
                    icon: dynamicIcon
                },
                {
                    title: <Trans i18nKey={'bucketManagePermissions.blockAnyACLs'}/>,
                    key: 'allAcl',
                    icon: dynamicIcon
                },
                {
                    title: <Trans i18nKey={'bucketManagePermissions.blockNewPublic'}/>,
                    key: 'newPolicy',
                    icon: dynamicIcon
                },
                {
                    title: <Trans i18nKey={'bucketManagePermissions.blockAnyPublic'}/>,
                    key: 'allPolicy',
                    icon: dynamicIcon
                },
            ]
        },
    ];
    const defaultCheckedKeys:string[] = [];
    if(typeof initSettings !== 'string'){
        for(const key in initSettings.bucketPermission.pubBlockConfig){
            if(initSettings.bucketPermission.pubBlockConfig[key])defaultCheckedKeys.push(key);
        }
    }

    return (
        <Spin spinning={initSettings === 'loading'}>
            <div className='p-2'>
                <div className='text-2xl'>{t('bucketManagePermissions.title')}</div>
                <Trans i18nKey={'bucketManagePermissions.tip'}/>
                <div>
                    <a className='text-blue-500' href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                        {t('bucketManagePermissions.href')}
                        <Icon
                            icon="akar-icons:link-out"
                            className='inline-block mx-1'
                            width="15"
                            height="15"
                        />
                    </a>
                </div>
                <div className='flex items-center p-2 my-2 w-max max-w-full rounded-border'>
                    <Icon icon="teenyicons:lock-circle-outline" width='50' className='ml-2'/>
                    <div className='ml-4'>
                        <div className='font-bold'>{t('bucketManagePermissions.infoTitle')}</div>
                        <div>{t('bucketManagePermissions.infoTip')}</div>
                    </div>
                    <div className='ml-8 font-semibold text-yellow-550'>
                        <Switch
                            checked={changing}
                            onChange={()=>setChanging(!changing)}
                            checkedChildren={<CheckOutlined/>}
                            unCheckedChildren={<CloseOutlined/>}/>
                        <span>{t('bucketManagePermissions.infoButton')}</span>

                    </div>

                </div>
                {initSettings === 'failed'
                    ? <Empty/>
                    : <WithEdit visible={changing} onCancel={()=>setChanging(!changing)}>
                        <Tree
                            showIcon
                            disabled={!changing}
                            checkable
                            defaultExpandedKeys={['allAcl']}
                            defaultCheckedKeys={defaultCheckedKeys}
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
                    </WithEdit>}
            </div>
        </Spin>
    );
}
