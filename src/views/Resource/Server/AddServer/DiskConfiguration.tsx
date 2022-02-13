import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import { useState,useEffect } from 'react';
import { Switch, Input, Select } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export interface DiskInfo {
    'DviceName': string,
    'Ebs': {
            'DeleteOnTermination': true,
            'VolumnSize': number,
            'VolumnType': string,
            'VolumnIOPS'?: number,
            'VolumnThruputs'?: number,
            'VolumnEncryption': boolean
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
    const [diskType, changeDiskType] = useState('Standard');
    const [encryption, changeEncryption] = useState(true);
    const [volumnSize, changeVolumnSize] = useState(8);
    const [volumnIOPS, changeVolumnIOPS] = useState(3000);
    const [volumnThruputs, changeVolumnThruputs] = useState(125);
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
                'DviceName': disk['DviceName'],
                'Ebs': {
                    'DeleteOnTermination': true,
                    'VolumnSize': volumnSize,
                    'VolumnType': diskType,
                    'VolumnIOPS': volumnIOPS,
                    'VolumnThruputs': volumnThruputs,
                    'VolumnEncryption': encryption }

            };
            changeDisks([...disks]);

        }
        else if (diskType === 'io1' || diskType === 'io2') {
            // console.log(disks[index]);
            disks[index] =  {
                'DviceName': disk['DviceName'],
                'Ebs': {
                    'DeleteOnTermination': true,
                    'VolumnSize': volumnSize,
                    'VolumnType': diskType,
                    'VolumnIOPS': volumnIOPS,
                    // 'VolumnThruputs': volumnThruputs,
                    'VolumnEncryption': encryption }

            };
            changeDisks([...disks]);
        }
        else {
            // console.log(disks[index]);
            disks[index] = {
                'DviceName': disk['DviceName'],
                'Ebs': {
                    'DeleteOnTermination': true,
                    'VolumnSize': volumnSize,
                    'VolumnType': diskType,
                    // 'VolumnIOPS': volumnIOPS,
                    // 'VolumnThruputs': volumnThruputs,
                    'VolumnEncryption': encryption }

            };
            changeDisks([...disks]);
        }

    },[diskType,encryption,volumnSize,volumnIOPS,volumnThruputs]);
    return(
        <div>
            <div className={classnames('w-96','border','rounded','flex','flex-col')}>
                <div className={classnames('flex','flex-row','m-2')}>
                    <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                    <div className={classnames('mx-3','flex-grow')}>
                        <span >Disk type:</span>
                        <Select defaultValue={ diskType } className={classnames('w-48')} onChange={value=>changeDiskType(value)} size='small'>
                            <Option value="Standard">Magnetic(standard)</Option>
                            <Option value="gp2">General Purpose SSD(gp2)</Option>
                            <Option value="gp3">General Purpose SSD(gp3)</Option>
                            <Option value="io1">Provisioned IOPS SSD(io1)</Option>
                            <Option value="io2">Provisioned IOPS SSD(io2)</Option>
                        </Select>
                        <div className={classnames('flex','flex-row','mt-2','justify-between')}>
                            <div className={classnames('flex','flex-row')}>
                                <span>size(GiB):</span>
                                <Input className={classnames('w-12')} type="text" size='small' maxLength={2} defaultValue={8} onChange={(e)=>changeVolumnSize(parseInt(e.target.value))}/>
                            </div>
                            <div className={classnames('flex','flex-row')}>
                                <span>IOPS:</span>
                                <Input className={classnames('w-12')} disabled={diskType === 'Standard'} type="text" size='small' maxLength={5} defaultValue={3000}
                                    onChange={(e) => changeVolumnIOPS(parseInt(e.target.value))} />
                            </div>
                            <div className={classnames('flex','flex-row')}>
                                <span>Thruputs(MB/s):</span>
                                <Input className={classnames('w-12')} disabled={['Standard', 'Io1', 'Io2'].includes(diskType)} type="text" size='small' maxLength={5} defaultValue={125}
                                    onChange={(e) => changeVolumnThruputs(parseInt(e.target.value))} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classnames('flex','flex-row','justify-between','border-t-2','border-gray-300','border-dashed','ml-12','mr-6','p-2')}>
                    <div>
                        <span>Disk path:</span>
                        <span className={classnames('font-bold')}>{disk['DviceName']}</span>
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
        <div>
            {disks.map((disk, index) => <DiskConfiguration index={ index } disk={disk} key={disk['DviceName']} disks={disks} changeDisks={changeDisks} />)}
            <button onClick={() => {
                const lastDisk = disks[disks.length - 1]['DviceName'];
                const lastNum = lastDisk[lastDisk.length - 1];
                const newDisk = lastDisk.replace(lastNum,'') + (parseInt(lastNum) + 1).toString();
                changeDisks([...disks,{
                    'DviceName': newDisk,
                    'Ebs': {
                        'DeleteOnTermination': true,
                        'VolumnSize': 16,
                        'VolumnType': 'gp2',
                        'VolumnIOPS': 3000,
                        'VolumnThruputs': 125,
                        'VolumnEncryption': true
                    } }]);
            }} disabled>dianwo</button>
        </div>
    );
};

export default DiskConfigurations;