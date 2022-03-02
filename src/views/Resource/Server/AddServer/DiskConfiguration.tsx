import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import { useState,useEffect } from 'react';
import { Switch, Input, Select } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

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
    const { Option } = Select;
    const { disks, disk, changeDisks,index } = props;
    const [diskType, changeDiskType] = useState('gp2');
    const [encryption, changeEncryption] = useState(true);
    const [volumeSize, changeVolumeSize] = useState(8);
    const [volumeIOPS, changeVolumeIOPS] = useState(3000);
    const [volumeThruputs, changeVolumeThruputs] = useState(125);
    useEffect(() => {
        // console.log({
        //     'DviceName': disk['DviceName'],
        //     'Ebs': {
        //         'DeleteOnTermination': true,
        //         'VolumnSize': volumnSize,
        //         'VolumnType': diskType,
        //         'VolumnIOPS': volumnIOPS,
        //         'VolumnThruputs': volumnThruputs,
        //         'VolumnEncryption': encryption }

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
                    // 'VolumnThruputs': volumnThruputs,
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
                    // 'VolumnIOPS': volumnIOPS,
                    // 'VolumnThruputs': volumnThruputs,
                    'Encrypted': encryption,
                }

            };
            changeDisks([...disks]);
        }

    },[diskType,encryption,volumeSize,volumeIOPS,volumeThruputs]);
    return(
        <div className={classnames('w-4/5','rounded-border','flex','flex-col','mt-2','mr-2')}>
            <div className={classnames('flex','flex-row','m-2')}>
                <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                <div className={classnames('mx-3','flex-grow')}>
                    <span >Disk type:</span>
                    <Select defaultValue={ diskType } className={classnames('w-48')} onChange={value=>changeDiskType(value)} size='small'>
                        <Option value="standard">Magnetic(standard)</Option>
                        <Option value="gp2">General Purpose SSD(gp2)</Option>
                        <Option value="gp3">General Purpose SSD(gp3)</Option>
                        <Option value="io1">Provisioned IOPS SSD(io1)</Option>
                        <Option value="io2">Provisioned IOPS SSD(io2)</Option>
                    </Select>
                    <div className={classnames('flex','mt-2','justify-between')}>
                        <div className={classnames('flex')}>
                            <span>size(GiB):</span>
                            <Input className={classnames('w-12')} type="text" size='small' maxLength={2} defaultValue={8} onChange={(e)=>changeVolumeSize(parseInt(e.target.value))}/>
                        </div>
                        <div className={classnames('flex')}>
                            <span>IOPS:</span>
                            <Input className={classnames('w-12')} disabled={diskType === 'standard'} type="text" size='small' maxLength={5} defaultValue={3000}
                                onChange={(e) => changeVolumeIOPS(parseInt(e.target.value))} />
                        </div>
                        <div className={classnames('flex')}>
                            <span>Thruputs(MB/s):</span>
                            <Input className={classnames('w-12')} disabled={['standard', 'Io1', 'Io2'].includes(diskType)} type="text" size='small' maxLength={5} defaultValue={125}
                                onChange={(e) => changeVolumeThruputs(parseInt(e.target.value))} />
                        </div>
                    </div>
                </div>
                <Icon fr={undefined}
                    icon="clarity:times-line"
                    className={classnames('inline-block','mx-1', 'cursor-pointer')}
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

            <div className={classnames('flex','flex-row','justify-between','border-t-2','border-gray-300','border-dashed','ml-12','mr-6','p-2')}>
                <div>
                    <span>Disk path:</span>
                    <span className={classnames('font-bold')}>{disk['DeviceName']}</span>
                </div>
                <div>
                    <span>Encryption</span>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        onChange = {()=>
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
            <div className={classnames('grid','grid-cols-2','gap-4','justify-items-center')}>
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
            }} className={classnames('inline', 'text-yellow-550','ml-12','mt-2')}>
                <Icon fr={undefined}
                    icon="carbon:add"
                    className={classnames('inline-block', 'mx-1')}
                    width="15"
                    height="15"
                />
                Create new disk
            </button>
        </>




    );
};

export default DiskConfigurations;