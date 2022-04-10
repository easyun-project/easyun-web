import CBucketCard from '@/components/Logic/CBucketCard';
import bucketService from '@/service/stBucketService';
import { useMount } from '@/utils/hooks';
import { Tabs } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLocation, useParams } from 'react-router-dom';
import Objects from './Objects';
import Permissions from './Permissions';
import Properties from './Properties';

export default function BucketManage() {
    const params = useParams()
    const { state } = useLocation()

    const [bucketData, setBucketData] = useState(null)
    const bucketList = useSelector((state: RootState) => state.storage.storageList)
    // just for test
    const demoBucket = bucketList[0]

    const { TabPane } = Tabs;

    useMount(() => {
        // TODO 接口 获取bktDetail 更换 子组件的state
        // bucketService.getBucket(bktId).then(res => {
        //     setBucketData(res)
        // })
    })
    return (
        <>
            <CBucketCard bktDetail={demoBucket} />
            <Tabs defaultActiveKey="Objects">
                <TabPane tab="Objects" key="Objects">
                    <Objects bucketData={state} />
                </TabPane>
                <TabPane tab="Permissions" key="Permissions">
                    <Permissions bucketData={state} />
                </TabPane>
                <TabPane tab="Properties" key="Properties">
                    <Properties bucketData={state} />
                </TabPane>
            </Tabs>
        </>
    )
}
