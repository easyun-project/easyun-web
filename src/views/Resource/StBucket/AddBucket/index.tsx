import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import bucketManage from '@/service/stBucketService';
import { Switch, Input, Select, Card, Tooltip, message } from 'antd';
import { useTranslation, Trans } from 'react-i18next';
import FlagUtil from '@/utils/flagUtil';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddBucket = (): JSX.Element => {
    //hooks and utils
    const navigate = useNavigate();
    const { t } = useTranslation();
    const flagUtil = new FlagUtil();
    const defaultBucketName = 'bucket-easyun-test' + parseInt(Math.random() * 900 + 100 + '', 10);
    //redux state
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const currentRegion = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.regionCode);
    const regionList = useSelector((state: RootState) => state.dataCenter.regionList!);
    //component state
    const [ region, setRegion ] = useState(regionList.filter(region => region.regionCode === currentRegion)[0]);
    const [ bucketId, setBucketId ] = useState(defaultBucketName);
    const [ encryption, setEncryption ] = useState(false);
    const [ versioning, setVersioning ] = useState(true);
    const [ valid, setValid ] = useState(false);
    const [ creating, setCreating ] = useState(false);
    //life cycle
    //由于timer不能在在重新渲染时被重置，因此需要用useRef保存
    const refTimer = useRef<NodeJS.Timeout>(setTimeout(() => undefined, 1000));
    useEffect(()=>{
        clearTimeout(refTimer.current);
        // 重新开启一个定时器
        refTimer.current = setTimeout(
            () => bucketManage.validateBucketId({ dcName, bucketId }).then(res => setValid(res)), 1000);
    }, [ bucketId ]);

    return (
        <>
            <div id="add-s3bucket-title" className= 'my-8 mx-5 text-3xl '>
                <Icon
                    className= 'inline-block mx-5 '
                    icon="fluent:add-circle-20-regular"
                    width="50"
                    height="50"
                />
                {t('addBucket.title')}
            </div>
            <Card className='w-max rounded-border' title={t('addBucket.locationTitle')}>
                <div className= 'flex flex-row items-center mx-5'>
                    <div className= 'flex flex-row items-center mx-5'>
                        <Icon icon={flagUtil.getFlagIconByRegion(region.regionCode)}
                            color="#5c6f9a"
                            width="60" height="60"/>
                        <div>
                            <div className= 'mx-2 font-bold '>{region.regionCode}</div>
                            <div className= 'mx-2 '>{region.regionName}</div>
                        </div>
                    </div>
                    <div>
                        <div className= 'mx-5 '>
                            <Trans i18nKey={'addBucket.locationTip'} values={{ regionCity:region.regionName, region:region.regionCode }}/>
                        </div>
                        <Select className='mx-5 w-96' placeholder={t('addBucket.locationButton')} onChange={(value)=>setRegion(regionList.filter(region=>region.regionCode === value)[0])}>
                            {regionList.map(region=> <Option key={region.regionCode} value={region.regionCode}>{`${region.regionCode} - ${region.regionName}`}</Option>)}
                        </Select>
                    </div>
                </div>
            </Card>
            <Card className='my-4 w-max rounded-border' title={t('addBucket.urlTitle')}>
                <div className= 'mx-5 '>{t('addBucket.tip')}</div>
                <div className= 'flex items-center mx-2 mt-2 mb-5'>
                    {/* bucketname输入框 */}
                    <Input
                        maxLength={30}
                        className='mx-5 w-96'
                        type="text"
                        defaultValue={defaultBucketName}
                        onInput={(e) => {
                            setBucketId(e.currentTarget.value);
                        }}
                    />
                    {valid
                        ? <Tooltip title='valid'><Icon icon="icons8:checked" width="24" height="24" color="green"/></Tooltip>
                        : <Tooltip title='unvalid'><Icon icon="icons8:cancel" width="24" height="24" color='red'/></Tooltip>
                    }
                </div>
                <div className= 'mx-5 text-gray-400 '>{t('addBucket.bucketUrlHint')}</div>
                <div
                    className= 'mx-5 font-bold text-black '
                >{`${bucketId}.s3.${region.regionCode}.amazonaws.com`}</div>
                {/* 加密管理组件 */}
                <div className= 'flex flex-row my-4 '>
                    <Switch
                        checked={encryption}
                        onChange={()=>setEncryption(!encryption)}
                    />
                    <div className= 'flex flex-col '>
                        <div className= 'mx-5 font-bold text-black '>
                            {encryption ? t('bucketManageProperties.encryptionOnTitle') : t('bucketManageProperties.encryptionOffTitle')}
                        </div>
                        <div className= 'mx-5 max-w-lg text-gray-400 '>
                            {encryption ? t('bucketManageProperties.encryptionOnTip') : t('bucketManageProperties.encryptionOffTip')}

                        </div>
                    </div>
                    {/* 版本管理组件 */}
                    <Switch
                        checked={versioning}
                        onChange={()=>setVersioning(!versioning)}
                    />
                    <div className= 'flex flex-col '>
                        <div className= 'mx-5 font-bold text-black '>
                            {versioning ? t('bucketManageProperties.versioningOnTitle') : t('bucketManageProperties.versioningOffTitle')}
                        </div>
                        <div className= 'mx-5 max-w-lg text-gray-400 '>
                            {versioning ? t('bucketManageProperties.versioningOnTip') : t('bucketManageProperties.versioningOffTip')}
                        </div>
                    </div>
                </div>
            </Card>
            <div className='ml-48'>
                <button className='btn-gray' onClick={()=>navigate(-1)}>
          Back
                </button>
                <button className='ml-8 btn-yellow'
                    onClick={ () => {
                        setCreating(true);
                        const params = {
                            bucketCreateParm: {
                                bucketACL: 'private',
                                isEncryption: encryption,
                                isVersioning: versioning,
                                pubBlockConfig: {
                                    BlockPublicAcls: true,
                                    BlockPublicPolicy: true,
                                    IgnorePublicAcls: true,
                                    RestrictPublicBuckets: true
                                },
                                regionCode: region.regionCode
                            },
                            bucketId: bucketId,
                            dcName
                        };
                        bucketManage.addBucket(params).then(()=>{
                            setCreating(false);
                            message.success('Create success');
                            navigate('/resource/object');
                        }, ()=>setCreating(false));
                    }
                    }
                >
                    Create{creating ? <LoadingOutlined /> : undefined}
                </button>
            </div>
        </>
    );
};

export default AddBucket;
