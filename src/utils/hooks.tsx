import React,{ useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import {  Switch, Select,Popover,InputNumber } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { VolumeTypeInfo } from '@/constant/storage';


// 初始化
export const useMount = (callback) => {
    useEffect(() => {
        callback();
    }, []);
};

// 添加新disk的钩子函数，需要传入可用的path
export const useNewDisk = (availablePaths:string[]) => {
    const { Option } = Select;
    const [volumeType, changeVolumeType] = useState('standard');
    const [isEncrypted, changeIsEncryption] = useState(true);
    const [volumeSize, changeVolumeSize] = useState(8);
    const [volumeIOPS, changeVolumeIOPS] = useState(3000);
    const [volumeThruputs, changeVolumeThruputs] = useState(125);
    const [attachPath, changeAttachPath] = useState(availablePaths[0]);
    const volumeTypeInfo = VolumeTypeInfo[volumeType];
    return {
        newDiskProps:{
            volumeType,
            isEncrypted,
            volumeSize,
            ...volumeTypeInfo.volumeIOPS && { volumeIOPS } ,
            ...volumeTypeInfo.volumeThruputs && { volumeThruputs },
            attachPath
        },
        newDisk:(
            <div className= 'flex flex-col m-2 md:w-96 lg:w-1/2 2xl:w-1/3 active-border' key={undefined}>
                <div className= 'flex m-2'>
                    <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                    <div className='grow mx-3'>
                        <span >Disk type:</span>
                        <Select className= 'w-1/2' defaultValue={ 'standard' } onChange={value=>changeVolumeType(value)} size='small'>
                            {Object.keys(VolumeTypeInfo).map(key=><Option value={key} key={key}>{VolumeTypeInfo[key].typeDesc}</Option>)}
                        </Select>
                        <div className= 'flex justify-between mt-2'>
                            <div>
                                <span>size(GiB):</span>
                                <Popover content={
                                    `max:${volumeTypeInfo.volumeSize?.at(1)} min:${volumeTypeInfo.volumeSize?.at(0)}`
                                } title="Tips">
                                    <InputNumber className= 'w-16' size='small' min={volumeTypeInfo.volumeSize?.at(0)} max={volumeTypeInfo.volumeSize?.at(1)} defaultValue={8} onChange={(value)=>changeVolumeSize(value)}/>
                                </Popover>
                            </div>
                            <div>
                                <span>IOPS:</span>
                                <Popover content={
                                    `max:${volumeTypeInfo.volumeIops?.at(1)} min:${volumeTypeInfo.volumeIops?.at(0)}`
                                } title="Tips">
                                    <InputNumber className= 'w-16' disabled={!volumeTypeInfo.volumeIops} size='small' min={volumeTypeInfo.volumeIops?.at(0)} max={volumeTypeInfo.volumeIops?.at(1)} defaultValue={3000}
                                        onChange={(value) => changeVolumeIOPS(value)} />
                                </Popover>
                            </div>
                            <div>
                                <span>Thruputs(MB/s):</span>
                                <Popover content={
                                    `max:${volumeTypeInfo.volumeThruput?.at(1)} min:${volumeTypeInfo.volumeThruput?.at(0)}`
                                } title="Tips">
                                    <InputNumber className= 'w-16' disabled={!volumeTypeInfo.volumeThruput} size='small' min={volumeTypeInfo.volumeThruput?.at(0)} max={volumeTypeInfo.volumeThruput?.at(1)} defaultValue={125}
                                        onChange={(value) => changeVolumeThruputs(value)} />
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div className= 'flex justify-between p-2 mr-6 ml-12 border-t-2 border-gray-300 border-dashed'>
                    <div className= 'flex'>
                        <span>Disk path:</span>
                        <Select defaultValue={availablePaths[0]} size='small' style={{ width: 120 }} onChange={(e)=>changeAttachPath(e)}>
                            {availablePaths.slice(0,5).map((path)=><Option key ={path} value={path}>{path}</Option>)}
                        </Select>
                    </div>
                    <div>
                        <span className= 'mr-2'>Encryption</span>
                        <Switch
                            checkedChildren={<CheckOutlined className= 'align-middle'/>}
                            unCheckedChildren={<CloseOutlined className= 'align-middle'/>}
                            defaultChecked
                            onChange = {()=>
                                changeIsEncryption(!isEncrypted)}
                        />
                    </div>
                </div>
            </div>
        )
    };
};