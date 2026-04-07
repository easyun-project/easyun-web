import { Loader2 } from 'lucide-react';
import { SimpleSelect as Select, SimpleOption as Option } from '@/components/ui/simple-select';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServerCard from '@/components/Logic/CCard/ServerCard';
import { Icon } from '@iconify/react';
import { StVolumeInfo } from '@/constant/storage';
import { postApiV1ServerAction, deleteApiV1Server, postApiV1ServerConfig, putApiV1ServerName, putApiV1ServerDisk, putApiV1ServerEip, putApiV1ServerSecgroup, getApiV1ServerParamImage, getApiV1ServerParamInstypeList, getApiV1ServerParamInstypeFamily, postApiV1Server, getApiV1ServerDetailBySvrId, deleteApiV1ServerTagsBySvrId, putApiV1ServerTagsBySvrId } from '@/api-client';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { listAllVolume } from '@/redux/stvolumeSlice';
import { listAllServer } from '@/redux/serverSlice';
import { RootState } from '@/redux/store';
import getAvaliablePaths from '@/utils/pathTool';


// TODO:挂载卸载的接口。
export default function Attachment(props:StVolumeInfo) {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { volumeAttach, volumeId } = props;
    const vols = useSelector((state: RootState) => state.stvolume.volumeList);
    const dcName = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
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
                    <Select placeholder="Select a cloud server..." className='mb-4 w-96' onValueChange={value=>setSeletedSvr(value)}>
                        {servers.map(server=><Option key={server.svrId} value={server.svrId}>{`${server.tagName} : ${server.svrId}`}</Option>)}
                    </Select>
                    {selectedSvr
                        ? <>
                            <ServerCard serverId={selectedSvr} active>
                                <button className='flex items-center self-start text-green-700' onClick={() => {
                                    changeAttaching(true);
                                    putApiV1ServerDisk({ body: {
                                        action:'attach',
                                        svrId:selectedSvr,
                                        volumeId: volumeId || '',
                                        diskPath:attachPath
                                    } }).then(()=>{
                                        dispatch(listAllServer({ dc:dcName }));
                                        dispatch(listAllVolume({ dc:dcName }));
                                        changeAttaching(false);
                                    },
                                    ()=>changeAttaching(false));
                                }}>
                                    {attaching
                                        ? <Loader2 className='mx-1'/>
                                        : <Icon fr={undefined}
                                            icon="icons8:checked"
                                            className='mx-1'
                                            width="24" height="24"
                                        />}
                                    <span>Attach</span>
                                </button>
                            </ServerCard>
                            <Select className='w-96' value={attachPath} onValueChange={value=>setAttachPath(value)}>
                                {getAvaliablePaths(selectedSvr, vols).slice(0, 5).map(path=><Option key={path} value={path}>{path}</Option>)}
                            </Select>
                        </>
                        : undefined}
                </div>
                : volumeAttach.map(vol=><ServerCard key={vol.svrId} serverId={vol.svrId}>
                    <button className='flex items-center self-start text-yellow-550' onClick={() => {
                        changeDetaching(true);
                        putApiV1ServerDisk({ body: {
                            action:'detach',
                            svrId:vol.svrId || '',
                            volumeId: volumeId || '',
                            diskPath:vol.attachPath || ''
                        } }).then(
                            ()=>{
                                changeDetaching(false);
                                dispatch(listAllVolume({ dc: dcName }));
                            }
                        );
                    }}>
                        {detaching
                            ? <Loader2 className='mx-1'/>
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
