import React from 'react';
import { Icon } from '@iconify/react';
import { useState,useEffect } from 'react';
import { Tooltip, Switch, Select,Skeleton,Popover,Menu, Dropdown,InputNumber,Modal,Radio,Space } from 'antd';
import { QuestionCircleOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { classnames } from '@@/tailwindcss-classnames';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { VolumeDetail,VolumeTypeInfo } from '@/constant/storage';
import { AddVolumeParams } from '@/constant/storage';
import { getServerDetail } from '@/redux/serverSlice';
import { LoadingOutlined } from '@ant-design/icons';
import serverService from '@/service/serverService';
import storageService from '@/service/storageService';
import { VolumeInfoSimple } from '@/constant/storage';

interface DiskProps{
    volumeId:string
    availablePaths:string[]
    changeAvaliablePaths:React.Dispatch<React.SetStateAction<string[]>>

}

function ExistDisk(props:DiskProps) {
    const { availablePaths, changeAvaliablePaths } = props;
    const svrId = useSelector((state: RootState) =>state.server.currentServer!.svrProperty.instanceId);
    const [diskInfo, changeDiskInfo] = useState<'loading'|VolumeDetail>('loading');
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDc.basicInfo!.dcName);
    const dispatch = useDispatch();
    useEffect(
        ()=>{
            storageService.getVolumeDetail(props.volumeId).then(
                res=>{
                    changeDiskInfo(res);
                },
                error=>console.log(error)
            );},[]);

    useEffect(
        ()=>{
            if(diskInfo !== 'loading')
            // 在获取到这块盘的attachpath后就把availablePaths中的去掉
            {
                const paths = [...availablePaths];
                const volumeAttachInfo = diskInfo.volumeAttach.filter((item)=>item.attachSvrId === svrId)[0];
                paths.splice(paths.indexOf(volumeAttachInfo?.attachPath),1);
                changeAvaliablePaths(paths);}
        },[diskInfo]);


    if(diskInfo === 'loading')
    {return(<Skeleton active />);}
    else {
        const { volumeConfig,volumeAttach } = diskInfo;
        const volumeAttachInfo = volumeAttach.filter((item)=>item.attachSvrId === svrId)[0];
        // const { volumeBasic,volumeConfig } = diskInfo;

        const detachDisk = ()=>{
            serverService.bindServerDisk({
                action:'detach',
                svrId,
                volumeId:diskInfo.volumeBasic.volumeId,
                diskPath:volumeAttachInfo.attachPath
            }).then(
                ()=>setTimeout(()=>dispatch(getServerDetail({ serverId: svrId })),2000)
            );
        };

        const deleteDisk = ()=>{
            serverService.bindServerDisk({
                action:'detach',
                svrId,
                volumeId:diskInfo.volumeBasic.volumeId,
                diskPath:volumeAttachInfo.attachPath
            }).then(
                ()=>{storageService.deleteVolume({ dcName,volumeIds:[props.volumeId] });}
            ).then(
                ()=>setTimeout(()=>dispatch(getServerDetail({ serverId: svrId })),2000)
            );
        };

        const menu = (
            <Menu>
                <Menu.Item key="detach"
                    onClick={detachDisk}>
            Detach
                </Menu.Item>
                <Menu.Item danger key="delete" onClick={deleteDisk}>
            Delete
                </Menu.Item>
            </Menu>);
        return (
            <div className={classnames('rounded-border', 'm-2','2xl:w-1/3','lg:w-1/2','md:w-96')}>
                <div className={classnames('flex','m-2')}>
                    <span><Icon icon={ volumeAttachInfo.diskType === 'system' ? 'icon-park-outline:folder-settings' : 'icon-park-outline:solid-state-disk'} width="64" fr={undefined}/> </span>
                    <div className={classnames('mx-3', 'flex-grow')}>
                        <div className={classnames('flex')}>
                            <span className={classnames('flex-grow','font-bold')}>{ volumeAttachInfo.diskType === 'system' ? 'System Disk' : 'User Disk'}</span>

                            { volumeAttachInfo.diskType  === 'system'
                                ? undefined
                                : <Dropdown overlay={menu}>
                                    <Icon
                                        icon="fluent:more-vertical-20-filled"
                                        fr={undefined}
                                        className={classnames('cursor-pointer', 'hover:bg-yellow-650')}
                                    />
                                </Dropdown>}
                        </div>

                        <div className={classnames('flex','mt-2','justify-between')}>
                            <div className={classnames('flex','flex-row')}>
                                <span>size(GiB):</span>
                                <span>{volumeConfig?.volumeSize}GB</span>
                            </div>
                            <div className={classnames('flex','flex-row')}>
                                <span>IOPS:</span>
                                <span>{volumeConfig?.volumeIops ? volumeConfig.volumeIops : 'Null'}</span>
                            </div>
                            <div className={classnames('flex','flex-row')}>
                                <span>Thruputs(MB/s):</span>
                                <span>{volumeConfig?.volumeThruput ? volumeConfig.volumeThruput : 'Null'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classnames('flex','justify-between','border-t-2','border-gray-300','border-dashed','ml-12','mr-6','p-2')}>
                    <div>
                        <span>Disk path:</span>
                        <span className={classnames('font-bold')}>{ volumeAttachInfo.attachPath}</span>
                    </div>
                </div>
            </div>
        );}
}

interface NewDiskProps {
    changeIsAdding:React.Dispatch<React.SetStateAction<boolean>>
    availablePaths:string[]
    changeAvaliablePaths:React.Dispatch<React.SetStateAction<string[]>>
}

function NewDisk(props:NewDiskProps) {
    const dispatch = useDispatch();
    const { Option } = Select;
    const { changeIsAdding,availablePaths } = props;
    const InstanceId = useSelector((state: RootState) => {
        return state.server.currentServer!.svrProperty.instanceId;
    });
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDc.basicInfo!.dcName);
    const azName = useSelector((state: RootState) => state.dataCenter.currentDc.basicInfo!.dcRegion);
    const instanceName = useSelector((state: RootState) => state.server.currentServer!.svrProperty.instanceName);
    const [diskType, changeDiskType] = useState('standard');
    const [encryption, changeEncryption] = useState(true);
    const [volumeSize, changeVolumeSize] = useState(8);
    const [volumeIOPS, changeVolumeIOPS] = useState(3000);
    const [volumeThruputs, changeVolumeThruputs] = useState(125);
    const [devicePath, changeDevicePath] = useState('dev/sdb');
    const [creating,changeCreating] = useState(false);
    const volumeTypeInfo = VolumeTypeInfo[diskType];
    return (
        <div className={classnames('flex','items-center')}>
            {/* 添加disk框体 */}
            <div className={classnames('active-border','m-2','flex','flex-col','2xl:w-1/3','lg:w-1/2','md:w-96')}>
                <div className={classnames('flex','m-2')}>
                    <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                    <div className={classnames('mx-3','flex-grow')}>
                        <span >Disk type:</span>
                        <Select className={classnames('w-1/2')} defaultValue={ 'standard' } onChange={value=>changeDiskType(value)} size='small'>
                            {Object.keys(VolumeTypeInfo).map(key=><Option value={key} key={key}>{VolumeTypeInfo[key].typeDesc}</Option>)}
                        </Select>
                        <div className={classnames('flex','mt-2','justify-between')}>
                            <div>
                                <span>size(GiB):</span>
                                <Popover content={
                                    `max:${volumeTypeInfo.volumeSize?.at(1)} min:${volumeTypeInfo.volumeSize?.at(0)}`
                                } title="Tips">
                                    <InputNumber className={classnames('w-16')} size='small' min={volumeTypeInfo.volumeSize?.at(0)} max={volumeTypeInfo.volumeSize?.at(1)} defaultValue={8} onChange={(value)=>changeVolumeSize(value)}/>
                                </Popover>
                            </div>
                            <div>
                                <span>IOPS:</span>
                                <Popover content={
                                    `max:${volumeTypeInfo.volumeIops?.at(1)} min:${volumeTypeInfo.volumeIops?.at(0)}`
                                } title="Tips">
                                    <InputNumber className={classnames('w-16')} disabled={!volumeTypeInfo.volumeIops} size='small' min={volumeTypeInfo.volumeIops?.at(0)} max={volumeTypeInfo.volumeIops?.at(1)} defaultValue={3000}
                                        onChange={(value) => changeVolumeIOPS(value)} />
                                </Popover>

                            </div>
                            <div>
                                <span>Thruputs(MB/s):</span>
                                <Popover content={
                                    `max:${volumeTypeInfo.volumeThruput?.at(1)} min:${volumeTypeInfo.volumeThruput?.at(0)}`
                                } title="Tips">
                                    <InputNumber className={classnames('w-16')} disabled={!volumeTypeInfo.volumeThruput} size='small' min={volumeTypeInfo.volumeThruput?.at(0)} max={volumeTypeInfo.volumeThruput?.at(1)} defaultValue={125}
                                        onChange={(value) => changeVolumeThruputs(value)} />
                                </Popover>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={classnames('flex','justify-between','border-t-2','border-gray-300','border-dashed','ml-12','mr-6','p-2')}>
                    <div className={classnames('flex')}>
                        <span>Disk path:</span>
                        <Select defaultValue={availablePaths[0]} size='small' style={{ width: 120 }} onChange={(e)=>changeDevicePath(e)}>
                            {availablePaths.slice(0,5).map((path)=><Option key ={path} value={path}>{path}</Option>)}
                        </Select>
                    </div>
                    <div>
                        <span className={classnames('mr-2')}>Encryption</span>
                        <Switch
                            checkedChildren={<CheckOutlined className={classnames('align-middle')}/>}
                            unCheckedChildren={<CloseOutlined className={classnames('align-middle')}/>}
                            defaultChecked
                            onChange = {()=>
                                changeEncryption(!encryption)}
                        />
                    </div>
                </div>
            </div>
            {/* 确认模组 */}
            <div className={classnames('items-center','justify-center')}>
                {creating
                    ? <LoadingOutlined/>
                    : <>
                        <Icon fr={undefined}
                            icon="icons8:cancel"
                            className={classnames('mx-1', 'cursor-pointer')}
                            width="24" height="24"
                            color='red'
                            onClick={() => changeIsAdding(false)}/>

                        <Icon fr={undefined}
                            icon="icons8:checked"
                            className={classnames('mx-1','cursor-pointer')}
                            width="24" height="24"
                            color="green"
                            onClick={() => {
                                const params:AddVolumeParams = {
                                    volumeType:diskType,
                                    isEncrypted:encryption,
                                    volumeSize,
                                    svrId:InstanceId,
                                    attachPath:devicePath,
                                    dcName,
                                    azName,
                                    tagName:instanceName
                                };
                                switch (diskType){
                                case 'io1':
                                case 'io2':
                                    params.volumeIops = volumeIOPS;
                                    break;
                                case 'gp3':
                                    params.volumeIops = volumeIOPS;
                                    params.volumeThruput = volumeThruputs;
                                    break;
                                }
                                changeCreating(true);
                                storageService.addVolume(params).then(
                                    ()=>{dispatch(getServerDetail({
                                        serverId: InstanceId
                                    }));
                                    changeCreating(false);
                                    changeIsAdding(false);},
                                    error=>{changeCreating(false);
                                        console.log(error);}
                                );
                            }} />
                    </>}

            </div>

        </div>
    );
}

export default function Disk():JSX.Element {
    const getEN = ()=>{
        const arr:string[] = [];
        for (let i = 3; i < 26; i++) {
            arr.push('/dev/sd' + String.fromCharCode(97 + i));
        }
        return arr;
    };
    const dispatch = useDispatch();
    const [isAdding, changeIsAdding] = useState(false);
    const currentServerDisks = useSelector((state: RootState) => state.server.currentServer?.svrDisk);
    const svrId = useSelector((state: RootState) => state.server.currentServer!.svrProperty.instanceId);
    const [availablePaths, changeAvaliablePaths] = useState<string[]>(getEN());
    const [isModalVisible, changeIsModalVisible] = useState(false);
    const [availableDisks, changeAvailableDisks] = useState<VolumeInfoSimple[]>([]);
    const [seletedDisk, changeSeletedDisk] = useState('');

    useEffect(
        ()=>{storageService.listVolume().then(res=>changeAvailableDisks(res));},[]
    );
    return (
        <>
            <div className='flex flex-row items-center'>
                <p>Block storage disk</p>
                <Tooltip placement="topLeft" title={'text'}>
                    <QuestionCircleOutlined />
                </Tooltip>
            </div>
            <div > {currentServerDisks?.volumeIds.map((volumeId) => <ExistDisk key={volumeId} volumeId={volumeId} availablePaths={availablePaths} changeAvaliablePaths={changeAvaliablePaths}/>)}</div>
            {isAdding
                ? <NewDisk changeIsAdding={ changeIsAdding } availablePaths={availablePaths} changeAvaliablePaths={changeAvaliablePaths}/>
                : <>
                    <button onClick={() => changeIsAdding(true)}
                        className={classnames('inline', 'text-yellow-550')}>
                        <Icon icon="carbon:add"
                            className={classnames('inline-block', 'mx-1')}
                            width="15"
                            height="15"
                            fr={undefined} />
                    Create new disk
                    </button>
                    <button onClick={() => changeIsModalVisible(true)}
                        className={classnames('inline', 'text-yellow-550')}>
                        <Icon icon="carbon:add"
                            className={classnames('inline-block', 'mx-1')}
                            width="15"
                            height="15"
                            fr={undefined} />
                    Attach new disk
                    </button>
                    <Modal title="Select a disk to attach" visible={isModalVisible} onOk={()=>{
                        serverService.bindServerDisk({
                            action:'attach',
                            svrId,
                            volumeId:seletedDisk,
                            diskPath:availablePaths[0]
                        }).then(()=>{
                            changeIsModalVisible(false);
                            dispatch(getServerDetail({ serverId: svrId }));
                        });
                    }} onCancel={()=>changeIsModalVisible(false)}>
                        <Radio.Group onChange={(e)=>{changeSeletedDisk(e.target.value);}} value={seletedDisk}>
                            <Space direction="vertical">
                                {availableDisks.filter((item)=>item.isAvailable).map((item:VolumeInfoSimple)=>
                                    <Radio value={item.volumeId} key={item.volumeId} disabled={!item.isAvailable}>
                                        {item.volumeId}({item.tagName})
                                    </Radio>)}
                            </Space>
                        </Radio.Group>

                    </Modal>
                </>

            }

        </>
    );
}
