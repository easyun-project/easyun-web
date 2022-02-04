import React from 'react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Tooltip, Switch, Input, Select } from 'antd';
import { QuestionCircleOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { classnames } from '@@/tailwindcss-classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function ExistDisk(props) {
    return (
        <div className={classnames('rounded-border', 'w-96', 'm-2')}>
            <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined} /> </span>
            <div className={classnames('mx-3','flex-grow')}>disk</div>
        </div>
    );
}



export default function Disk():JSX.Element {
    const [diskType, changeDiskType] = useState('Standard');
    const [encryption, changeEncryption] = useState(true);
    const [volumnSize, changeVolumnSize] = useState(8);
    const [volumnIOPS, changeVolumnIOPS] = useState(3000);
    const [volumnThruputs, changeVolumnThruputs] = useState(125);
    const { Option } = Select;
    const currentServerDisks = useSelector((state: RootState) => {
        if (state.server.currentServer)
        { return state.server.currentServer['BlockDeviceMappings']; }
    });
    console.log(currentServerDisks);
    return (
        <>
            <div className={classnames('flex','flex-row','flex-wrap')}> {currentServerDisks.map((disk) => <ExistDisk key={ disk['DeviceName']}/>)}</div>

            <div className='flex flex-row items-center'>
                <p>Block storage disk</p>
                <Tooltip placement="topLeft" title={'text'}>
                    <QuestionCircleOutlined />
                </Tooltip>
            </div>
            <div>
                <div className={classnames('w-96','border','border-dashed','border-yellow-550','rounded','flex','flex-col')}>
                    <div className={classnames('flex','flex-row','m-2')}>
                        <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                        <div className={classnames('mx-3','flex-grow')}>
                            <span >Disk type:</span>
                            <Select defaultValue={ 'Standard' } className={classnames('w-48')} onChange={value=>changeDiskType(value)} size='small'>
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
                            <span className={classnames('font-bold')}>{'dev/sdb'}</span>
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
            </div>

        </>
    );
}
