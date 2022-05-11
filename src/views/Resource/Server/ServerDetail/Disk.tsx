import React from 'react';
import { Icon } from '@iconify/react';
import { useState,useEffect } from 'react';
import { Tooltip, Skeleton,Menu, Dropdown,Modal,Radio,Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { classnames } from '@@/tailwindcss-classnames';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { StVolumeModel,AddVolumeParams,VolumeInfo } from '@/constant/storage';
import { getServerDetail } from '@/redux/serverSlice';
import { listAllVolume } from '@/redux/storageSlice';
import { LoadingOutlined } from '@ant-design/icons';
import serverService from '@/service/serverService';
import volumeService from '@/service/stVolumeService';
import { useNewDisk } from '@/utils/hooks';


interface DiskProps{
    volumeId:string
    availablePaths:string[]
    changeAvaliablePaths:React.Dispatch<React.SetStateAction<string[]>>

}

function ExistDisk(props:DiskProps) {
    const dispatch = useDispatch();
    const { availablePaths, changeAvaliablePaths } = props;
    const svrId = useSelector((state: RootState) =>state.server.currentServer!.svrProperty.instanceId);
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const [diskInfo, changeDiskInfo] = useState<'loading'|StVolumeModel>('loading');
    const [detaching, changeDetaching] = useState(false);
    const svrStatus = useSelector((state: RootState) =>state.server.currentServer!.svrProperty.status);
    useEffect(
        ()=>{
            volumeService.getStVolumeModel(props.volumeId).then(
                res=>changeDiskInfo(res),
                error=>console.log(error)
            );},[]);

    useEffect(
        ()=>{
            if(Object.keys(diskInfo).length !== 0 && diskInfo !== 'loading')
            // 在获取到这块盘的attachpath后就把availablePaths中的去掉
            {
                const paths = [...availablePaths];
                const volumeAttachInfo = diskInfo.volumeAttach.filter((item)=>item.svrId === svrId)[0];
                paths.splice(paths.indexOf(volumeAttachInfo?.attachPath),1);
                changeAvaliablePaths(paths);}
        },[diskInfo]);

    useEffect(()=>{dispatch(listAllVolume({ dc:dcName }));},[svrStatus]);


    if( diskInfo === 'loading')
    { return(<Skeleton active />); }
    else if (Object.keys(diskInfo).length === 0){ return <></>; }
    else {
        const { volumeConfig,volumeAttach } = diskInfo;
        const volumeAttachInfo = volumeAttach.filter((item)=>item.svrId === svrId)[0];
        const detachDisk = ()=>{
            changeDetaching(true);
            serverService.bindServerDisk({
                action:'detach',
                svrId,
                volumeId:diskInfo.volumeBasic.volumeId,
                diskPath:volumeAttachInfo.attachPath
            }).then(()=>
            {
                dispatch(listAllVolume({ dc:dcName }));
                return dispatch(getServerDetail({ serverId: svrId }));
            }
            ).then(()=>changeDetaching(false));
        };

        const deleteDisk = ()=>{
            changeDetaching(true);
            serverService.bindServerDisk({
                action:'detach',
                svrId,
                volumeId:diskInfo.volumeBasic.volumeId,
                diskPath:volumeAttachInfo.attachPath
            }).then(
                ()=>{volumeService.deleteVolume({ dcName,volumeIds:[props.volumeId] });}
            ).then(
                ()=> dispatch(getServerDetail({ serverId: svrId }))
            ).then(()=>()=>changeDetaching(false));
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
                    <div className='grow mx-3'>
                        <div className={classnames('flex')}>
                            <span className='grow font-bold'>{ volumeAttachInfo.diskType === 'system' ? 'System Disk' : 'User Disk'}</span>
                            <span className='w-4 h-4'>
                                { volumeAttachInfo.diskType  === 'system' && svrStatus !== 'stopped'
                                    ? undefined
                                    : detaching
                                        ? <LoadingOutlined className='align-middle'/>
                                        : <Dropdown overlay={menu}>
                                            <Icon
                                                icon="fluent:more-vertical-20-filled"
                                                fr={undefined}
                                                className={classnames('cursor-pointer', 'hover:text-yellow-650')}
                                            />
                                        </Dropdown>}
                            </span>
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
    const { changeIsAdding,availablePaths } = props;
    const InstanceId = useSelector((state: RootState) => {
        return state.server.currentServer!.svrProperty.instanceId;
    });
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const azName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcRegion);
    const instanceName = useSelector((state: RootState) => state.server.currentServer!.svrProperty.instanceName);
    const [creating,changeCreating] = useState(false);
    const { newDiskProps, newDisk } = useNewDisk(availablePaths);
    return (
        <div className={classnames('flex','items-center')}>
            {/* 添加disk框体 */}
            {newDisk}
            {/* 确认模组 */}
            <div className={classnames('items-center','justify-center')}>
                {creating
                    ? <LoadingOutlined/>
                    : <>
                        <Icon
                            icon="icons8:cancel"
                            className={classnames('mx-1', 'cursor-pointer')}
                            width="24" height="24"
                            color='red'
                            onClick={() => changeIsAdding(false)}/>

                        <Icon
                            icon="icons8:checked"
                            className={classnames('mx-1','cursor-pointer')}
                            width="24" height="24"
                            color="green"
                            onClick={() => {
                                const params:AddVolumeParams = {
                                    svrId:InstanceId,
                                    dcName,
                                    azName,
                                    tagName:instanceName,
                                    ...newDiskProps
                                };
                                changeCreating(true);
                                volumeService.addVolume(params).then(
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

    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const currentServerDisks = useSelector((state: RootState) => state.server.currentServer!.svrDisk);
    const svrId = useSelector((state: RootState) => state.server.currentServer!.svrProperty.instanceId);
    const allDisks = useSelector((state: RootState) => state.storage.volumeList!);
    const allServers = useSelector((state: RootState) => state.server.servers);

    const [isAdding, changeIsAdding] = useState(false);
    const [availablePaths, changeAvaliablePaths] = useState<string[]>(getEN());
    const [isModalVisible, changeIsModalVisible] = useState(false);
    const [seletedDisk, changeSeletedDisk] = useState('');
    const [confirmLoading,changeConfirmLoading] = useState(false);
    // this function is used to judge a disk can be attached
    const isAvailable = (disk:VolumeInfo) =>{
        const svrAz = allServers.filter(svr => svr.svrId === svrId)[0].azName;
        const diskAz = disk.volumeAz;
        if (svrAz !== diskAz) { return false; }
        else if (disk.volumeAttach.length === 0) { return true; }
        else { return false; }
        // TODO:disk multiattach featrue
        // else if(!VolumeTypeInfo[disk.volumeType].isMultiattach) { return false; }
        // else{
        //     for (let i = 0; i < disk.volumeAttach.length; i++){
        //         // if a disk is other servers' system disk
        //         // or it has been attached to current server ,then it can't be attached again
        //         if(disk.volumeAttach[i].diskType === 'system' || disk.volumeAttach[i].attachSvrId === svrId){return false;}
        //     }
        //     return true;
        // }
    };
    return (
        <>
            <div className='flex flex-row items-center'>
                <p>Block storage disk</p>
                <Tooltip placement="topLeft" title={'text'}>
                    <QuestionCircleOutlined />
                </Tooltip>
            </div>
            <div > {currentServerDisks?.volumeIds.map(volumeId => <ExistDisk key={volumeId} volumeId={volumeId} availablePaths={availablePaths} changeAvaliablePaths={changeAvaliablePaths}/>)}</div>
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
                        changeConfirmLoading(true);
                        serverService.bindServerDisk({
                            action:'attach',
                            svrId,
                            volumeId:seletedDisk,
                            diskPath:availablePaths[0]
                        }).then(()=>{
                            dispatch(listAllVolume({ dc:dcName }));
                            return dispatch(getServerDetail({ serverId: svrId }));
                        },
                        ()=>changeConfirmLoading(false)
                        ).then(()=>{
                            changeConfirmLoading(false);
                            changeIsModalVisible(false);
                        });
                    }} onCancel={()=>changeIsModalVisible(false)}
                    confirmLoading={confirmLoading}>
                        {
                            allDisks.filter((item)=>isAvailable(item)).length === 0
                                ? <div className='flex justify-center'>
                                    <button onClick={()=>{
                                        changeIsModalVisible(false);
                                        changeIsAdding(true);
                                    }} className='btn-yellow'>No available disks, create a new one</button>
                                </div>
                                : <Radio.Group onChange={(e)=>{changeSeletedDisk(e.target.value);}} value={seletedDisk}>
                                    <Space direction="vertical">
                                        { allDisks.filter((item)=>{
                                            return isAvailable(item);
                                        }).map((item:VolumeInfo)=>
                                            <Radio value={item.volumeId} key={item.volumeId}>
                                                {item.volumeId}({item.tagName})
                                            </Radio>)}
                                    </Space>
                                </Radio.Group>
                        }
                    </Modal>
                </>
            }
        </>
    );
}
