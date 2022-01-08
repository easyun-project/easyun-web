import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import { useState } from 'react';
import { Switch, Input, Select } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const DiskConfiguration = () :JSX.Element=>{
    const { Option } = Select;
    const [diskType, changeDiskType] = useState('Standard');
    const [encryption, changeEncryption] = useState(true);
    return(
        <div id="disk-configuration">
            <div className={classnames('w-1/2','border','rounded','flex','flex-col')}>
                <div className={classnames('flex','flex-row','m-2')}>
                    <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                    <div className={classnames('mx-3','flex-grow')}>
                        <span >Disk type:</span>
                        <Select defaultValue="Standard" className={classnames('w-48')} onChange={value=>changeDiskType(value)} size='small'>
                            <Option value="Standard">Magnetic(standard)</Option>
                            <Option value="Gp2">General Purpose SSD(gp2)</Option>
                            <Option value="Gp3">General Purpose SSD(gp3)</Option>
                            <Option value="Io1">Provisioned IOPS SSD(io1)</Option>
                            <Option value="Io2">Provisioned IOPS SSD(io2)</Option>
                        </Select>
                        <div className={classnames('flex','flex-row','mt-2','justify-between')}>
                            <div className={classnames('flex','flex-row')}>
                                <span>size(GiB):</span>
                                <Input className={classnames('w-12')} type="text" size='small' maxLength={2} defaultValue={8}/>
                            </div>
                            <div className={classnames('flex','flex-row')}>
                                <span>IOPS:</span>
                                <Input className={classnames('w-12')} disabled={diskType === 'Standard'} type="text" size='small' maxLength={5} defaultValue={3000}/>
                            </div>
                            <div className={classnames('flex','flex-row')}>
                                <span>Thruputs(MB/s):</span>
                                <Input className={classnames('w-12')} disabled={['Standard', 'Io1', 'Io2'].includes(diskType)} type="text" size='small' maxLength={5} defaultValue={125}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classnames('flex','flex-row','justify-between','border-t-2','border-gray-300','border-dashed','ml-12','mr-6','p-2')}>
                    <div>
                        <span>Disk path:</span>
                        <span className={classnames('font-bold')}>/dev/sda1</span>
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
        </div>);};

export default DiskConfiguration;