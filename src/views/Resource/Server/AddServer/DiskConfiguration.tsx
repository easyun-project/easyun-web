import { X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SimpleSelect as Select, SimpleOption as Option } from '@/components/ui/simple-select';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import { Icon } from '@iconify/react';
import { useState,useEffect } from 'react';
import { VolumeTypeInfo } from '@/constant/storage';

export interface DiskInfo {
    'DeviceName': string,
    'Ebs': {
            'DeleteOnTermination': true,
            'VolumeSize': number,
            'VolumeType': string,
            'VolumeIOPS'?: number,
            'VolumeThruputs'?: number,
            'Encrypted': boolean
    }
}

interface DiskProps {
    disk: DiskInfo
    disks: DiskInfo[]
    changeDisks: React.Dispatch<React.SetStateAction<DiskInfo[]>>
    index:number
}

const DiskConfiguration = (props:DiskProps) :JSX.Element=>{
        const { disks, disk, changeDisks,index } = props;
    const [diskType, changeDiskType] = useState('gp2');
    const [encryption, changeEncryption] = useState(true);
    const [volumeSize, changeVolumeSize] = useState(8);
    const [volumeIOPS, changeVolumeIOPS] = useState(3000);
    const [volumeThruputs, changeVolumeThruputs] = useState(125);
    const volumeTypeInfo = VolumeTypeInfo[diskType];
    useEffect(() => {
        // console.log({
        //     'DviceName': disk['DviceName'],
        //     'Ebs': {
        //         'DeleteOnTermination': true,
        //         'VolumeSize': volumnSize,
        //         'VolumeType': diskType,
        //         'VolumeIOPS': volumnIOPS,
        //         'VolumeThruputs': volumnThruputs,
        //         'VolumeEncryption': encryption }

        // });
        if (diskType === 'gp3' || diskType === 'gp2') {
            // console.log(disks[index]);
            disks[index] = {
                'DeviceName': disk['DeviceName'],
                'Ebs': {
                    'DeleteOnTermination': true,
                    'VolumeSize': volumeSize,
                    'VolumeType': diskType,
                    'VolumeIOPS': volumeIOPS,
                    'VolumeThruputs': volumeThruputs,
                    'Encrypted': encryption }

            };
            changeDisks([...disks]);

        }
        else if (diskType === 'io1' || diskType === 'io2') {
            // console.log(disks[index]);
            disks[index] =  {
                'DeviceName': disk['DeviceName'],
                'Ebs': {
                    'DeleteOnTermination': true,
                    'VolumeSize': volumeSize,
                    'VolumeType': diskType,
                    'VolumeIOPS': volumeIOPS,
                    // 'VolumeThruputs': volumnThruputs,
                    'Encrypted': encryption }

            };
            changeDisks([...disks]);
        }
        else {
            // console.log(disks[index]);
            disks[index] = {
                'DeviceName': disk['DeviceName'],
                'Ebs': {
                    'DeleteOnTermination': true,
                    'VolumeSize': volumeSize,
                    'VolumeType': diskType,
                    // 'VolumeIOPS': volumnIOPS,
                    // 'VolumeThruputs': volumnThruputs,
                    'Encrypted': encryption,
                }

            };
            changeDisks([...disks]);
        }

    },[diskType,encryption,volumeSize,volumeIOPS,volumeThruputs]);
    return(
        <div className={"w-4/5 rounded-border flex flex-col mt-2 mr-2"}>
            <div className={"flex flex-row m-2"}>
                <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                <div className='grow mx-3'>
                    <span >Disk type:</span>
                    <Select defaultValue={ diskType } className={"w-48"} onValueChange={value=>changeDiskType(value)}>
                        {Object.keys(VolumeTypeInfo).map(key=><Option value={key} key={key}>{VolumeTypeInfo[key].typeDesc}</Option>)}
                    </Select>
                    <div className={"flex mt-2 justify-between"}>
                        <div>
                            <span>size(GiB):</span>
                            <span title={`size: ${volumeTypeInfo.volumeSize?.at(0)}-${volumeTypeInfo.volumeSize?.at(1)}`}>
                                <Input type="number" className={"w-16"} min={volumeTypeInfo.volumeSize?.at(0)} max={volumeTypeInfo.volumeSize?.at(1)} defaultValue={8} onChange={(e)=>changeVolumeSize(Number(e.target.value)||0)}/>
                            </span>
                        </div>
                        <div>
                            <span>IOPS:</span>
                            <span title={`iops: ${volumeTypeInfo.volumeIops?.at(0)}-${volumeTypeInfo.volumeIops?.at(1)}`}>
                                <Input type="number" className={"w-16"} disabled={!volumeTypeInfo.volumeIops} min={volumeTypeInfo.volumeIops?.at(0)} max={volumeTypeInfo.volumeIops?.at(1)} defaultValue={3000}
                                    onChange={(e) => changeVolumeIOPS(Number(e.target.value)||0)} />
                            </span>

                        </div>
                        <div>
                            <span>Thruputs(MB/s):</span>
                            <span title={`thruput: ${volumeTypeInfo.volumeThruput?.at(0)}-${volumeTypeInfo.volumeThruput?.at(1)}`}>
                                <Input type="number" className={"w-16"} disabled={!volumeTypeInfo.volumeThruput} min={volumeTypeInfo.volumeThruput?.at(0)} max={volumeTypeInfo.volumeThruput?.at(1)} defaultValue={125}
                                    onChange={(e) => changeVolumeThruputs(Number(e.target.value)||0)} />
                            </span>

                        </div>
                    </div>
                </div>
                <Icon fr={undefined}
                    icon="clarity:times-line"
                    className={"inline-block mx-1 cursor-pointer"}
                    width="24" height="24"
                    color='#dd6b10'
                    onClick={() => {
                        if (disks.length > 1)
                        {const newDisks = [...disks];
                            newDisks.splice(index,1);
                            changeDisks(newDisks);}
                        else{alert('Every server should have at least one system disk.');}

                    } }/>
            </div>

            <div className={"flex flex-row justify-between border-t-2 border-gray-300 border-dashed ml-12 mr-6 p-2"}>
                <div>
                    <span>Disk path:</span>
                    <span className={"font-bold"}>{disk['DeviceName']}</span>
                </div>
                <div>
                    <span>Encryption</span>
                    <Switch
                       
                       
                        checked
                        onCheckedChange = {()=>
                            changeEncryption(!encryption)}
                    />
                </div>
            </div>
        </div>);
};

interface DisksProps {
    disks: DiskInfo[]
    changeDisks: React.Dispatch<React.SetStateAction<DiskInfo[]>>
}

const DiskConfigurations = (props: DisksProps): JSX.Element => {
    const { disks, changeDisks } = props;
    return (
        <>
            <div className={"grid grid-cols-2 gap-4 justify-items-center"}>
                {disks.map((disk, index) => <DiskConfiguration index={ index } disk={disk} key={disk.DeviceName} disks={disks} changeDisks={changeDisks} />)}
            </div>

            <button onClick={() => {
                const lastDisk = disks[disks.length - 1].DeviceName;
                const lastNum = parseInt(lastDisk.replace('/dev/sda',''));
                const newDisk = '/dev/sda' + (lastNum + 1).toString();
                changeDisks([...disks,{
                    'DeviceName': newDisk,
                    'Ebs': {
                        'DeleteOnTermination': true,
                        'VolumeSize': 16,
                        'VolumeType': 'gp2',
                        'VolumeIOPS': 3000,
                        'VolumeThruputs': 125,
                        'Encrypted': true
                    } }]);
            }} className={"inline text-yellow-550 ml-12 mt-2"}>
                <Icon fr={undefined}
                    icon="carbon:add"
                    className={"inline-block mx-1"}
                    width="15"
                    height="15"
                />
                Create new disk
            </button>
        </>
    );
};

export default DiskConfigurations;