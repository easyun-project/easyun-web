/*
 * @Author: lishihao
 * @Description: one of bucketManage page tabs
 */

import React, { useEffect, useState } from 'react';
import { Tree, Spin, Empty, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import WithEdit from '@/components/Logic/CWithEdit';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';

// TODO 添加对接口的支持

export default function Permissions() {
    const { t } = useTranslation();
    const currentBucket  = useSelector((state: RootState) => state.stbucket.currentBucket) ;
    const [ changing, setChanging ] = useState(false);
    const [ settings, setSettings ] = useState<Record<string, boolean>>({});
    useEffect(()=>console.log(settings), [ settings ]);
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
    if(typeof currentBucket !== 'string'){
        for(const key in currentBucket.bucketPermission.pubBlockConfig){
            if(currentBucket.bucketPermission.pubBlockConfig[key])defaultCheckedKeys.push(key);
        }
    }

    return (
        <Spin spinning={currentBucket === 'loading'}>
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
                {currentBucket === 'failed'
                    ? <Empty/>
                    : <WithEdit visible={changing} onCancel={()=>setChanging(!changing)} onOk={()=>setChanging(!changing)}>
                        <Tree
                            showIcon
                            disabled={!changing}
                            checkable
                            defaultExpandedKeys={[ 'allAcl' ]}
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
