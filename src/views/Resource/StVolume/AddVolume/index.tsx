import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation, Trans } from 'react-i18next';
import { Card,Switch } from 'antd';
import CTags from '@/components/Logic/CTags';
import { CheckOutlined,CloseOutlined } from '@ant-design/icons';
import { useNewDisk } from '@/utils/hooks';


const AddVolume = (): JSX.Element => {
    const { t } = useTranslation();
    const [tags , changeTags] = useState<Record<string,string>>({});
    const [multiattch , changeMultiattch] = useState(false);
    const { newDiskProps, newDisk } = useNewDisk(['a','b','c']);
    useEffect(()=>console.log(newDiskProps),[newDiskProps]);
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
                <div onClick={()=>console.log(newDiskProps)}>us-east-1</div>
            </Card>

            <Card title={t('addVolume.configuration.title')} className='mt-5 rounded-border'>
                {newDisk}
                <div className='flex'>
                    <Switch
                        className='mt-2'
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        defaultChecked={false}
                        onChange = {()=>
                            changeMultiattch(!multiattch)}
                    />
                    <div className='ml-4'>
                        <div className='text-lg font-bold'>{ multiattch
                            ? t('addVolume.configuration.multiattachConfiguration.abledTitle')
                            : t('addVolume.configuration.multiattachConfiguration.disabledTitle')}</div>

                        <Trans i18nKey={'addVolume.configuration.multiattachConfiguration.disabledTip'}
                            components={{ bold:<strong/>,a:<a href="http://baidu.com" target='_blank' rel="noreferrer" className='text-blue-500 underline'/> }} />
                    </div>
                </div>


            </Card>

            <Card title={t('addVolume.tags.title')} className='mt-5 rounded-border'>
                <CTags tags={tags} changeTags={changeTags}/ >
            </Card>
        </>
    );
};


export default AddVolume;