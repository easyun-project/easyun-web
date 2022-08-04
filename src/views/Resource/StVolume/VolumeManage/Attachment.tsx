import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServerCard from '@/components/Logic/CCard/ServerCard';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { StVolumeInfo } from '@/constant/storage';
import serverService from '@/service/serverService';
import { useDispatch, useSelector } from 'react-redux';
import { listAllVolume } from '@/redux/stvolumeSlice';
import { listAllServer } from '@/redux/serverSlice';
import { RootState } from '@/redux/store';
import { Select } from 'antd';
import getAvaliablePaths from '@/utils/pathTool';

const { Option } = Select;

// TODO:挂载卸载的接口。
export default function Attachment(props:StVolumeInfo) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { volumeAttach, volumeId } = props;
    const vols = useSelector((state: RootState) => state.stvolume.volumeList);
    const dcName = useSelector((state: RootState) => state.dataCenter.current!.dcName);
    const { servers } = useSelector((state:RootState)=>state.server);
    const [ attaching, changeAttaching ] = useState(false);
    const [ detaching, changeDetaching ] = useState(false);
    const [ selectedSvr, setSeletedSvr ] = useState('');
    const [ attachPath, setAttachPath ] = useState<string>(getAvaliablePaths(selectedSvr, vols)[0]);

    return (
        <>
            <div className='text-2xl font-bold'>{t('volumeManageAttachment.title')}</div>
            <div>{t('volumeManageAttachment.tip')}</div>
            {volumeAttach.length === 0
                ? <div>
                    <Select placeholder="Select a cloud server..." className='mb-4 w-96' onChange={value=>setSeletedSvr(value)}>
                        {servers.map(server=><Option key={server.svrId} value={server.svrId}>{`${server.tagName} : ${server.svrId}`}</Option>)}
                    </Select>
                    {selectedSvr
                        ? <>
                            <ServerCard serverId={selectedSvr} active>
                                <button className='flex items-center self-start text-green-700' onClick={() => {
                                    changeAttaching(true);
                                    serverService.bindServerDisk({
                                        action:'attach',
                                        svrId:selectedSvr,
                                        volumeId,
                                        diskPath:attachPath
                                    }).then(()=>{
                                        dispatch(listAllServer({ dc:dcName }));
                                        dispatch(listAllVolume({ dc:dcName }));
                                        changeAttaching(false);
                                    },
                                    ()=>changeAttaching(false));
                                }}>
                                    {attaching
                                        ? <LoadingOutlined className='mx-1'/>
                                        : <Icon fr={undefined}
                                            icon="icons8:checked"
                                            className='mx-1'
                                            width="24" height="24"
                                        />}
                                    <span>Attach</span>
                                </button>
                            </ServerCard>
                            <Select className='w-96' value={attachPath} onChange={value=>setAttachPath(value)}>
                                {getAvaliablePaths(selectedSvr, vols).slice(0, 5).map(path=><Option key={path}>{path}</Option>)}
                            </Select>
                        </>
                        : undefined}
                </div>
                : volumeAttach.map(vol=><ServerCard key={vol.svrId} serverId={vol.svrId}>
                    <button className='flex items-center self-start text-yellow-550' onClick={() => {
                        changeDetaching(true);
                        serverService.bindServerDisk({
                            action:'detach',
                            svrId:vol.svrId,
                            volumeId,
                            diskPath:vol.attachPath
                        }).then(
                            ()=>{
                                changeDetaching(false);
                                dispatch(listAllVolume({ dc: dcName }));
                            }
                        );
                    }}>
                        {detaching
                            ? <LoadingOutlined className='mx-1'/>
                            : <Icon fr={undefined}
                                icon="clarity:times-line"
                                className='mx-1'
                                width="24" height="24"
                            />}
                        <span>Detach</span>
                    </button>
                </ServerCard>)}

            <div>{t('volumeManageAttachment.extraTip')}</div>
            <div>{t('volumeManageAttachment.href')}</div>
        </>

    );
}
