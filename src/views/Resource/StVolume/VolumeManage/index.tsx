import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import volumeService from '@/service/stVolumeService';
import { useTranslation } from 'react-i18next';
import Attachment from './Attachment';
import Tags from './Tags';
import Snapshots from './Snapshots';
import Configure from './Configure';


const { TabPane } = Tabs;

export default function VolumeManage() {
    const { t } = useTranslation();
    const { volumeId } = useParams();
    const [ seletedTab,setSeletedTab ] = useState('Attachment');
    const volumeList = useSelector((state:RootState)=>state.storage.volumeList);
    const vol = volumeList.filter(vol=>vol.volumeId === volumeId)[0];
    return (
        <div className='m-4'>
            <div className='flex'>
                <Icon className='mr-8' icon="clarity:storage-line" color="#e9862e" width="100"/>
                <div className='flex grow'>
                    <div className='grow'>
                        <div className='text-2xl'>{vol.tagName ? vol.tagName : 'Unnamed disk'}</div>
                        <div className='my-2 text-xs text-gray-500'>
                            {volumeId}
                            <div>{vol.volumeType},{vol.volumeSize},{vol.volumeAz}</div>
                        </div>
                    </div>
                    <div className='self-center'>
                        <button className="w-32 btn-red"> Delete Disk</button>
                    </div>
                </div>
            </div>

            <Tabs className='pl-3' activeKey={seletedTab} onChange={(key=>setSeletedTab(key))}>
                <TabPane tab="Attachment" key="Attachment">
                    <Attachment {...vol}/>
                </TabPane>

                <TabPane tab="Config" key="Config">
                    <Configure />
                </TabPane>

                <TabPane tab="Snapshots" key="Disk">
                    <Snapshots />
                </TabPane>

                <TabPane tab="Tags" key="Tags">
                    <Tags/>
                </TabPane>
            </Tabs>
        </div>
    );
}
