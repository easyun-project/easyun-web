import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation, Trans } from 'react-i18next';
import { Card, Switch, Select } from 'antd';
import CTags from '@/components/Logic/CTags';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useNewDisk } from '@/utils/hooks';
import volumeService from '@/service/stVolumeService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddVolume = (): JSX.Element => {
    const navigate = useNavigate();
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const [ creating, changeCreating ] = useState(false);
    const { t } = useTranslation();
    const [ tags, changeTags ] = useState<Record<string, string>>({});
    const [ multiattch, changeMultiattch ] = useState(false);
    const { newDiskProps, newDisk } = useNewDisk([ 'a', 'b', 'c' ]);
    const [ azName, changeAzName ] = useState('');
    const availableZones = [ 'us-east-1a', 'us-east-1b' ];

    useEffect(()=>console.log({
        ...newDiskProps,
        multiattch,
    }), [ newDiskProps ]);
    return (
        <>
            <div className= 'my-8 mx-5 text-3xl '>
                <Icon
                    className= 'inline-block mx-5 '
                    icon="fluent:add-circle-20-regular"
                    width="50"
                    height="50"
                    fr={undefined}
                />
                Add Cloud Storage(S3 Bucket)
            </div>
            <Card title={t('addVolume.zone.title')} className='mt-5 rounded-border'>
                <div>{t('addVolume.zone.tip')}</div>
                <Select defaultValue={availableZones[0]} size='small' style={{ width: 120 }} onChange={(e)=>changeAzName(e)}>
                    {availableZones.map((zone)=><Option key ={zone} value={zone}>{zone}</Option>)}
                </Select>
            </Card>

            <Card title={t('addVolume.configuration.title')} className='mt-5 rounded-border'>
                {newDisk}
                <div className='flex'>
                    <Switch
                        className='mt-2'
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        defaultChecked = {false}
                        onChange = {()=>
                            changeMultiattch(!multiattch)}
                    />
                    <div className='ml-4'>
                        <div className='text-lg font-bold'>{ multiattch
                            ? t('addVolume.configuration.multiattachConfiguration.abledTitle')
                            : t('addVolume.configuration.multiattachConfiguration.disabledTitle')}</div>

                        <Trans i18nKey={'addVolume.configuration.multiattachConfiguration.disabledTip'}
                            components={{ bold:<strong/>, a:<a href="http://baidu.com" target='_blank' rel="noreferrer" className='text-blue-500 underline'/> }} />
                    </div>
                </div>


            </Card>

            <Card title={t('addVolume.tags.title')} className='mt-5 rounded-border'>
                <CTags tags={tags} changeTags={changeTags}/ >
            </Card>

            <button className='m-5 w-32 btn-gray' onClick={()=>navigate(-1)}>Back</button>
            <button className='m-5 w-32 btn-yellow' onClick={()=>{
                changeCreating(true);
                // TODO:跟后端沟通接口后修改
                volumeService.addVolume({
                    ...newDiskProps,
                    // multiattch,
                    azName,
                    dcName,
                    svrId:'1234',
                    tagName:'1234'
                }).then(
                    () => {
                        changeCreating(false);
                        alert('创建成功');
                        navigate('/resource/volume');
                    },
                    () => {changeCreating(false);
                        alert('创建失败');},
                );
            }
            }> {creating ? <LoadingOutlined className='align-middle' /> : undefined} Create</button>
        </>
    );
};


export default AddVolume;