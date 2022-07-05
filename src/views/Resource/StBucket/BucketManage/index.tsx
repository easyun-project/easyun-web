import CBucketCard from '@/components/Logic/CBucketCard';
import { Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getBucketDetail } from '@/redux/storageSlice';
import Objects from './Objects';
import Permissions from './Permissions';
import Properties from './Properties';
import CTags from '@/components/Logic/CTags';


export default function BucketManage() {
    const params = useParams();
    const bucketId  = params.bucketId as string;
    const dispatch = useDispatch();
    const { state } = useLocation();
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const bucketList = useSelector((state: RootState) => state.storage.bucketList);
    // just for test
    const demoBucket = bucketList[0];
    const [ tags, changeTags ] = useState<Record<string, string>>({
        dev:'test'
    });
    useEffect(()=>{
        dispatch(getBucketDetail({ bucketId, dcName }));
    }, []);

    const { TabPane } = Tabs;
    return (
        <>
            <CBucketCard {...demoBucket} />
            <Tabs defaultActiveKey="Objects">
                <TabPane tab="Objects" key="Objects">
                    <Objects />
                </TabPane>
                <TabPane tab="Permissions" key="Permissions">
                    <Permissions />
                </TabPane>
                <TabPane tab="Properties" key="Properties">
                    <Properties />
                </TabPane>
                <TabPane tab="Tags" key="Tags">
                    <CTags tags={tags} changeTags={changeTags}/>
                </TabPane>
            </Tabs>
        </>
    );
}
