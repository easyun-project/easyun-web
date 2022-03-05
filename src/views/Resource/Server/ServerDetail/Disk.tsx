import React from 'react';
import { Icon } from '@iconify/react';
import { useState,useEffect } from 'react';
import { Tooltip, Switch, Select,Skeleton,Popover } from 'antd';
import { QuestionCircleOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { classnames } from '@@/tailwindcss-classnames';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Menu, Dropdown,InputNumber,Input } from 'antd';
import storageService from '@/service/storageService';
import { VolumeDetail,VolumeTypeInfo } from '@/constant/storage';
import { AddVolumeParams } from '@/constant/storage';
import { getServerDetail } from '@/redux/serverSlice';

interface DiskProps{
    volumeId:string
}

function ExistDisk(props:DiskProps) {
    const [diskInfo, changeDiskInfo] = useState<'loading'|VolumeDetail>('loading');
    useEffect(
        ()=>{storageService.getVolumeDetail(props.volumeId).then(
            res=>changeDiskInfo(res),
            error=>console.log(error)
        );},[]);
    const menu = (
        <Menu>
            <Menu.Item key="detach"
                onClick={() => { console.log('detach');}}>
            Detach
            </Menu.Item>
            <Menu.Item danger key="delete"
                onClick={()=>console.log('delete')}
            >
            Delete
            </Menu.Item>
        </Menu>
    );
    if(diskInfo === 'loading')
    {return(<Skeleton active />);}
    else {
        const { volumeBasic,volumeConfig } = diskInfo;
        return (
            <div className={classnames('rounded-border', 'm-2','2xl:w-1/3','lg:w-1/2','md:w-96')}>
                <div className={classnames('flex','m-2')}>
                    <span><Icon icon={ diskInfo.volumeAttach?.diskType === 'system' ? 'icon-park-outline:folder-settings' : 'icon-park-outline:solid-state-disk'} width="64" fr={undefined}/> </span>
                    <div className={classnames('mx-3', 'flex-grow')}>
                        <div className={classnames('flex')}>
                            <span className={classnames('flex-grow','font-bold')}>{ diskInfo.volumeAttach?.diskType === 'system' ? 'System Disk' : 'User Disk'}</span>

                            { diskInfo.volumeAttach?.diskType  === 'system'
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
                                <span>{volumeConfig?.volumeIops}</span>
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
                        <span className={classnames('font-bold')}>{ volumeBasic?.attachPath}</span>
                    </div>
                </div>
            </div>
        );}
}

interface NewDiskProps {
    changeIsAdding:React.Dispatch<React.SetStateAction<boolean>>
}

function NewDisk(props:NewDiskProps) {
    const dispatch = useDispatch();
    const { Option } = Select;
    const { changeIsAdding } = props;
    const InstanceId = useSelector((state: RootState) => {
        return state.server.currentServer!.svrProperty.instanceId;
    });
    const [diskType, changeDiskType] = useState('standard');
    const [encryption, changeEncryption] = useState(true);
    const [volumnSize, changeVolumnSize] = useState(8);
    const [volumnIOPS, changeVolumnIOPS] = useState(3000);
    const [volumnThruputs, changeVolumnThruputs] = useState(125);
    const [devicePath, changeDevicePath] = useState('dev/sdb');
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
                                    <InputNumber className={classnames('w-16')} size='small' min={volumeTypeInfo.volumeSize?.at(0)} max={volumeTypeInfo.volumeSize?.at(1)} defaultValue={8} onChange={(value)=>changeVolumnSize(value)}/>
                                </Popover>
                            </div>
                            <div>
                                <span>IOPS:</span>
                                <Popover content={
                                    `max:${volumeTypeInfo.volumeIops?.at(1)} min:${volumeTypeInfo.volumeIops?.at(0)}`
                                } title="Tips">
                                    <InputNumber className={classnames('w-16')} disabled={!volumeTypeInfo.volumeIops} size='small' min={volumeTypeInfo.volumeIops?.at(0)} max={volumeTypeInfo.volumeIops?.at(1)} defaultValue={3000}
                                        onChange={(value) => changeVolumnIOPS(value)} />
                                </Popover>

                            </div>
                            <div>
                                <span>Thruputs(MB/s):</span>
                                <Popover content={
                                    `max:${volumeTypeInfo.volumeThruput?.at(1)} min:${volumeTypeInfo.volumeThruput?.at(0)}`
                                } title="Tips">
                                    <InputNumber className={classnames('w-16')} disabled={!volumeTypeInfo.volumeThruput} size='small' min={volumeTypeInfo.volumeThruput?.at(0)} max={volumeTypeInfo.volumeThruput?.at(1)} defaultValue={125}
                                        onChange={(value) => changeVolumnThruputs(value)} />
                                </Popover>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={classnames('flex','justify-between','border-t-2','border-gray-300','border-dashed','ml-12','mr-6','p-2')}>
                    <div className={classnames('flex')}>
                        <span>Disk path:</span>
                        <Input className={classnames('w-24')} type="text" size='small' defaultValue={'dev/sdb'} onChange={(e)=>changeDevicePath(e.target.value)}/>
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
                            VolumeType:diskType,
                            Encrypted:encryption,
                            Size:volumnSize,
                            InstanceId,
                            Device:devicePath
                        };
                        switch (diskType){
                        case 'io1':
                        case 'io2':
                            params.Iops = volumnIOPS;
                            break;
                        case 'gp3':
                            params.Iops = volumnIOPS;
                            params.Throughput = volumnThruputs;
                            break;
                        }
                        storageService.addVolume(params).then(
                            res=>console.log(res),
                            error=>console.log(error)
                        );
                        dispatch(getServerDetail({
                            serverId: InstanceId
                        }));


                        changeIsAdding(false);
                    }} />
            </div>

        </div>
    );
}

export default function Disk():JSX.Element {
    const [isAdding, changeIsAdding] = useState(false);
    const currentServerDisks = useSelector((state: RootState) => state.server.currentServer?.svrDisk);
    // console.log(currentServerDisks);
    return (
        <>
            <div className='flex flex-row items-center'>
                <p>Block storage disk</p>
                <Tooltip placement="topLeft" title={'text'}>
                    <QuestionCircleOutlined />
                </Tooltip>
            </div>
            <div > {currentServerDisks?.volumeIds.map((volumeId) => <ExistDisk key={volumeId} volumeId={volumeId}/>)}</div>
            {isAdding
                ? <NewDisk changeIsAdding={ changeIsAdding }/>
                : <button onClick={() => changeIsAdding(true)}
                    className={classnames('inline', 'text-yellow-550')}>
                    <Icon icon="carbon:add"
                        className={classnames('inline-block', 'mx-1')}
                        width="15"
                        height="15"
                        fr={undefined} />
                    Create new disk
                </button>
            }

        </>
    );
}
