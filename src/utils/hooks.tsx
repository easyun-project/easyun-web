import { Input } from '@/components/ui/input';
import { SimpleSelect as Select, SimpleOption as Option } from '@/components/ui/simple-select';
import { Switch } from '@/components/ui/switch';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { VolumeTypeInfo, SelectedVolumeTypeInfo } from '@/constant/storage';


// 初始化
export const useMount = (callback) => {
    useEffect(() => {
        callback();
    }, []);
};

// 添加新disk的钩子函数，需要传入可用的attach path
export const useNewDisk = (availablePaths:string[]) => {
        const [ volumeType, changeVolumeType ] = useState('standard');
    const [ isEncrypted, changeIsEncryption ] = useState(true);
    const [ volumeSize, changeVolumeSize ] = useState(8);
    const [ volumeIOPS, changeVolumeIOPS ] = useState(3000);
    const [ volumeThruputs, changeVolumeThruputs ] = useState(125);
    const [ attachPath, changeAttachPath ] = useState(availablePaths[0]);
    const selectedTypeInfo:SelectedVolumeTypeInfo = VolumeTypeInfo[volumeType];
    return {
        newDiskProps:{
            volumeType,
            isEncrypted,
            volumeSize,
            ...selectedTypeInfo.volumeIops && { volumeIOPS },
            ...selectedTypeInfo.volumeThruput && { volumeThruputs },
            attachPath
        },
        newDisk:(
            <div className= 'flex flex-col m-2 md:w-96 lg:w-1/2 2xl:w-1/3 active-border' key={undefined}>
                <div className= 'flex m-2'>
                    <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                    <div className='grow mx-3'>
                        <span >Disk type:</span>
                        <Select className= 'w-1/2' defaultValue={ 'standard' } onValueChange={value=>changeVolumeType(value)}>
                            {Object.keys(VolumeTypeInfo).map(key=><Option value={key} key={key}>{VolumeTypeInfo[key].typeDesc}</Option>)}
                        </Select>
                        <div className= 'flex justify-between mt-2'>
                            <div>
                                <span>size(GiB):</span>
                                <span title={`size: ${selectedTypeInfo.volumeSize?.at(0)}-${selectedTypeInfo.volumeSize?.at(1)}`}>
                                    <Input type="number" className= 'w-16' min={selectedTypeInfo.volumeSize?.at(0)} max={selectedTypeInfo.volumeSize?.at(1)} defaultValue={8} onChange={(e)=>changeVolumeSize(Number(e.target.value) || 0)}/>
                                </span>
                            </div>
                            <div>
                                <span>IOPS:</span>
                                <span title={`iops: ${selectedTypeInfo.volumeIops?.at(0)}-${selectedTypeInfo.volumeIops?.at(1)}`}>
                                    <Input type="number" className= 'w-16' disabled={!selectedTypeInfo.volumeIops} min={selectedTypeInfo.volumeIops?.at(0)} max={selectedTypeInfo.volumeIops?.at(1)} defaultValue={3000}
                                        onChange={(e) => changeVolumeIOPS(Number(e.target.value) || 0)} />
                                </span>
                            </div>
                            <div>
                                <span>Thruputs(MB/s):</span>
                                <span title={`thruput: ${selectedTypeInfo.volumeThruput?.at(0)}-${selectedTypeInfo.volumeThruput?.at(1)}`}>
                                    <Input type="number" className= 'w-16' disabled={!selectedTypeInfo.volumeThruput} min={selectedTypeInfo.volumeThruput?.at(0)} max={selectedTypeInfo.volumeThruput?.at(1)} defaultValue={125}
                                        onChange={(e) => changeVolumeThruputs(Number(e.target.value) || 0)} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className= 'flex justify-between p-2 mr-6 ml-12 border-t-2 border-gray-300 border-dashed'>
                    <div className= 'flex'>
                        <span>Disk path:</span>
                        <Select defaultValue={availablePaths[0]} onValueChange={(e)=>changeAttachPath(e)}>
                            {availablePaths.slice(0, 5).map((path)=><Option key ={path} value={path}>{path}</Option>)}
                        </Select>
                    </div>
                    <div>
                        <span className= 'mr-2'>Encryption</span>
                        <Switch
                           
                           
                            checked
                            onCheckedChange = {()=>
                                changeIsEncryption(!isEncrypted)}
                        />
                    </div>
                </div>
            </div>
        )
    };
};