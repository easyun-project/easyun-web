import React from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Attachment from './Attachment';
import Tags from './Tags';
import Snapshots from './Snapshots';
import Configure from './Configure';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function VolumeManage() {
    const { volumeId } = useParams();
    const volumeList = useSelector((state: RootState) => state.stvolume.volumeList);
    const vol = volumeList.filter(v => v.volumeId === volumeId)[0];

    return (
        <div className="m-4">
            <div className="flex">
                <Icon className="mr-8" icon="clarity:storage-line" color="#e9862e" width="100" />
                <div className="flex grow">
                    <div className="grow">
                        <div className="text-2xl">{vol.tagName || 'Unnamed disk'}</div>
                        <div className="my-2 text-xs text-gray-500">
                            {volumeId}
                            <div>{vol.volumeType},{vol.volumeSize},{vol.volumeAz}</div>
                        </div>
                    </div>
                    <div className="self-center">
                        <button className="w-32 btn-red">Delete Disk</button>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="Attachment" className="pl-3">
                <TabsList>
                    <TabsTrigger value="Attachment">Attachment</TabsTrigger>
                    <TabsTrigger value="Config">Config</TabsTrigger>
                    <TabsTrigger value="Snapshots">Snapshots</TabsTrigger>
                    <TabsTrigger value="Tags">Tags</TabsTrigger>
                </TabsList>
                <TabsContent value="Attachment"><Attachment {...vol} /></TabsContent>
                <TabsContent value="Config"><Configure /></TabsContent>
                <TabsContent value="Snapshots"><Snapshots /></TabsContent>
                <TabsContent value="Tags"><Tags /></TabsContent>
            </Tabs>
        </div>
    );
}
