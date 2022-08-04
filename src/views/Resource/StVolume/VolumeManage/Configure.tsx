import React, { useEffect, useState } from 'react';
import { useNewDisk } from '@/utils/hooks';
import { Icon } from '@iconify/react';
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
import { useParams } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function Configure() {
    const { volumeId } = useParams();
    const thisVolume = useSelector((state:RootState)=>state.stvolume.volumeList.filter(vol=>vol.volumeId === volumeId)[0]);
    const { volumeType, volumeSize, volumeIops, volumeThruput, isEncrypted } = thisVolume;
    const { newDiskProps, newDisk } = useNewDisk([ 'haha' ]);
    const [ changing, setChanging ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    useEffect(()=>console.log(newDiskProps), [ newDiskProps ]);
    return (
        <div>
            <span className='text-2xl font-bold'>Change Disk Configuration</span>
            <Switch
                checked={changing}
                onChange={()=>setChanging(!changing)}
                checkedChildren={<CheckOutlined/>}
                unCheckedChildren={<CloseOutlined/>}/>
            {changing
                ? <div className='flex'>
                    {newDisk}
                    <div className='self-end mb-4'>
                        {
                            loading
                                ? <LoadingOutlined />
                                : <>
                                    <Icon
                                        icon="icons8:cancel"
                                        className='mx-1 cursor-pointer'
                                        width="24" height="24"
                                        color='red'
                                        onClick={()=>setChanging(false)}
                                    />
                                    <Icon
                                        icon="icons8:checked"
                                        className='mx-1 cursor-pointer'
                                        width="24" height="24"
                                        color="green"
                                        onClick={()=>{
                                            setLoading(true);
                                            setTimeout(()=>{
                                                setLoading(false);
                                                setChanging(false);
                                            }, 2000);
                                        }}
                                    />
                                </>
                        }
                    </div>
                </div>
                : <div className='m-2 w-96 rounded-border'>
                    <div className= 'flex m-2'>
                        <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                        <div className='grow mx-3'>
                            <span >Disk type: {volumeType}</span>
                            <div className= 'flex justify-between mt-2'>
                                <div>
                                    <span>size(GiB): {volumeSize}</span>
                                </div>
                                <div>
                                    {volumeIops ? <span>IOPS: {volumeIops}</span> : undefined}
                                </div>
                                <div>
                                    {volumeThruput ? <span>Thruputs(MB/s): {volumeThruput}</span> : undefined}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className= 'flex justify-between p-2 mr-6 ml-12 border-t-2 border-gray-300 border-dashed'>
                        <div className= 'flex'>
                            <span>Disk path:</span>
                        </div>
                        <div>
                            <span className= 'mr-2'>Encryption:{isEncrypted ? 'On' : 'Off'}</span>
                        </div>
                    </div>
                </div>}
        </div>
    );
}
