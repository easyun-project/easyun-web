import CBucketCard from '@/components/Logic/CBucketCard';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { getBucketDetail } from '@/redux/stbucketSlice';
import Objects from './Objects';
import Permissions from './Permissions';
import Properties from './Properties';
import CTags from '@/components/Logic/CTags';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BucketManage() {
    const { bucketId } = useParams() as { bucketId: string };
    const dispatch = useDispatch<AppDispatch>();
    const dcName = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
    const bucketList = useSelector((state: RootState) => state.stbucket.bucketList);
    const demoBucket = bucketList[0];
    const [tags, changeTags] = useState<Record<string, string>>({ dev: 'test' });

    useEffect(() => { dispatch(getBucketDetail({ bucketId, dc: dcName })); }, []);

    return (
        <>
            <CBucketCard {...demoBucket as any} />
            <Tabs defaultValue="Objects">
                <TabsList>
                    <TabsTrigger value="Objects">Objects</TabsTrigger>
                    <TabsTrigger value="Permissions">Permissions</TabsTrigger>
                    <TabsTrigger value="Properties">Properties</TabsTrigger>
                    <TabsTrigger value="Tags">Tags</TabsTrigger>
                </TabsList>
                <TabsContent value="Objects"><Objects /></TabsContent>
                <TabsContent value="Permissions"><Permissions /></TabsContent>
                <TabsContent value="Properties"><Properties /></TabsContent>
                <TabsContent value="Tags"><CTags tags={tags} changeTags={changeTags} /></TabsContent>
            </Tabs>
        </>
    );
}
