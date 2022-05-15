import React,{ useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServerCard from '@/components/Logic/CCard/ServerCard';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { VolumeInfo } from '@/constant/storage';
import serverService from '@/service/serverService';
import { useDispatch } from 'react-redux';
import { listAllVolume } from '@/redux/storageSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

// TODO:挂载卸载的接口。
export default function Attachment(props:VolumeInfo) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { volumeAttach,volumeId } = props;
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const [attaching,changeAttaching] = useState(false);
    const [detaching,changeDetaching] = useState(false);
    return (
        <>
            <div>{t('volumeManageAttachment.title')}</div>
            <div>{t('volumeManageAttachment.tip')}</div>
            {volumeAttach.length === 0
                ? <div>
                添加一个
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
