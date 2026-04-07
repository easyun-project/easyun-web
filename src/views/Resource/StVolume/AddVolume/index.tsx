import { Loader2 } from "lucide-react";
import { X, Check } from 'lucide-react';
import { SimpleSelect as Select, SimpleOption as Option } from '@/components/ui/simple-select';
import { Switch } from '@/components/ui/switch';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation, Trans } from 'react-i18next';
import CTags from '@/components/Logic/CTags';
import { postApiV1StorageVolume, getApiV1StorageVolumeByVolumeId, deleteApiV1StorageVolume } from '@/api-client';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNewDisk } from '@/utils/hooks';


const AddVolume = (): JSX.Element => {
    const navigate = useNavigate();
    const dcName = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
    const [ creating, changeCreating ] = useState(false);
    const { t } = useTranslation();
    const [ tags, changeTags ] = useState<Record<string, string>>({});
    const [ multiattch, changeMultiattch ] = useState(false);
    const { newDiskProps, newDisk } = useNewDisk([ 'a', 'b', 'c' ]);
    const [ azName, changeAzName ] = useState('');
    const availableZones = [ 'us-east-1a', 'us-east-1b' ];

    useEffect(() => console.log({
        ...newDiskProps,
        multiattch,
    }), [ newDiskProps ]);
    return (
        <>
            <div className="my-8 mx-5 text-3xl ">
                <Icon
                    className="inline-block mx-5 "
                    icon="fluent:add-circle-20-regular"
                    width="50"
                    height="50"
                    fr={undefined}
                />
                Add Cloud Storage(S3 Bucket)
            </div>
            <div className="mt-5 rounded-border"><h5 className="font-semibold mb-2">{t('addVolume.zone.title')}</h5>
                <div>{t('addVolume.zone.tip')}</div>
                <Select defaultValue={availableZones[0]}
                    onValueChange={(e) => changeAzName(e)}>
                    {availableZones.map((zone) => <Option key={zone} value={zone}>{zone}</Option>)}
                </Select>
            </div>

            <div className="mt-5 rounded-border"><h5 className="font-semibold mb-2">{t('addVolume.configuration.title')}</h5>
                {newDisk}
                <div className="flex">
                    <Switch
                        className="mt-2"
                       
                       
                        checked={false}
                        onCheckedChange ={() =>
                            changeMultiattch(!multiattch)}
                    />
                    <div className="ml-4">
                        <div className="text-lg font-bold">{multiattch
                            ? t('addVolume.configuration.multiattachConfiguration.abledTitle')
                            : t('addVolume.configuration.multiattachConfiguration.disabledTitle')}</div>

                        <Trans i18nKey={'addVolume.configuration.multiattachConfiguration.disabledTip'}
                            components={{ bold: <strong/>,
                                a: <a href="http://baidu.com" target="_blank" rel="noreferrer"
                                    className="text-blue-500 underline"/>
                            }}/>
                    </div>
                </div>


            </div>

            <div className="mt-5 rounded-border"><h5 className="font-semibold mb-2">{t('addVolume.tags.title')}</h5>
                <CTags tags={tags} changeTags={changeTags}/>
            </div>

            <button className="m-5 w-32 btn-gray" onClick={() => navigate(-1)}>Back</button>
            <button className="m-5 w-32 btn-yellow" onClick={() => {
                changeCreating(true);
                // TODO:跟后端沟通接口后修改
                (postApiV1StorageVolume as any)({ body: {
                    ...newDiskProps,
                    // multiattch,
                    azName: azName || '',
                    dcName,
                    svrId: '1234',
                    tagName: '1234'
                } }).then(
                    () => {
                        changeCreating(false);
                        alert('创建成功');
                        navigate('/resource/volume');
                    },
                    () => {
                        changeCreating(false);
                        alert('创建失败');
                    },
                );
            }
            }> {creating ? <Loader2 className="align-middle"/> : undefined} Create
            </button>
        </>
    );
};


export default AddVolume;
