import React from 'react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Tooltip, Switch, Input, Select } from 'antd';
import { QuestionCircleOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { classnames } from '@@/tailwindcss-classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Menu, Dropdown } from 'antd';

function ExistDisk(props) {
    console.log(props);
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
    return (
        <div className={classnames('rounded-border', 'w-1/2', 'm-2')}>
            <div className={classnames('flex','flex-row','m-2')}>
                <span><Icon icon={ props.index === 0 ? 'icon-park-outline:folder-settings' : 'icon-park-outline:solid-state-disk'} width="64" fr={undefined}/> </span>
                <div className={classnames('mx-3', 'flex-grow')}>
                    <div className={classnames('flex', 'flex-row')}>
                        <span className={classnames('flex-grow','font-bold')}>{ props.index === 0 ? 'System Disk' : 'User Disk'}</span>

                        { props.index === 0
                            ? undefined
                            : <Dropdown overlay={menu}>
                                <Icon
                                    icon="fluent:more-vertical-20-filled"
                                    fr={undefined}
                                    className={classnames('cursor-pointer', 'hover:bg-yellow-650')}
                                />
                            </Dropdown>}
                    </div>

                    <div className={classnames('flex','flex-row','mt-2','justify-between')}>
                        <div className={classnames('flex','flex-row')}>
                            <span>size(GiB):</span>
                            <span>16GB</span>
                        </div>
                        <div className={classnames('flex','flex-row')}>
                            <span>IOPS:</span>
                            <span>3000</span>
                        </div>
                        <div className={classnames('flex','flex-row')}>
                            <span>Thruputs(MB/s):</span>
                            <span>125</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classnames('flex','flex-row','justify-between','border-t-2','border-gray-300','border-dashed','ml-12','mr-6','p-2')}>
                <div>
                    <span>Disk path:</span>
                    <span className={classnames('font-bold')}>{ props['DeviceName']}</span>
                </div>
                {/* <div>
                    <span>Encryption</span>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                        onChange = {()=>
                            console.log('encrypt')}
                    />
                </div> */}
            </div>
        </div>
    );
}

interface NewDiskProps {
    changeIsAdding:React.Dispatch<React.SetStateAction<boolean>>
}

function NewDisk(props:NewDiskProps) {
    const { Option } = Select;
    const { changeIsAdding } = props;
    const [diskType, changeDiskType] = useState('Standard');
    const [encryption, changeEncryption] = useState(true);
    const [volumnSize, changeVolumnSize] = useState(8);
    const [volumnIOPS, changeVolumnIOPS] = useState(3000);
    const [volumnThruputs, changeVolumnThruputs] = useState(125);
    return (
        <div className={classnames('flex','flex-row','items-center')}>
            {/* 添加disk框体 */}
            <div className={classnames('active-border','w-1/2','m-2','flex','flex-col')}>
                <div className={classnames('flex','flex-row','m-2')}>
                    <span><Icon icon="icon-park-outline:solid-state-disk" width="64" fr={undefined}/> </span>
                    <div className={classnames('mx-3','flex-grow')}>
                        <span >Disk type:</span>
                        <Select defaultValue={ 'Standard' } onChange={value=>changeDiskType(value)} size='small'>
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
                        console.log({
                            diskType,
                            encryption,
                            volumnIOPS,
                            volumnSize,
                            volumnThruputs
                        });
                        changeIsAdding(false);
                    }} />
            </div>

        </div>
    );
}

export default function Disk():JSX.Element {
    const [isAdding, changeIsAdding] = useState(false);
    const currentServerDisks = useSelector((state: RootState) => {
        if (state.server.currentServer)
        { return state.server.currentServer['BlockDeviceMappings']; }
    });
    // console.log(currentServerDisks);
    return (
        <>
            <div className='flex flex-row items-center'>
                <p>Block storage disk</p>
                <Tooltip placement="topLeft" title={'text'}>
                    <QuestionCircleOutlined />
                </Tooltip>
            </div>
            <div className={classnames('flex', 'flex-row', 'flex-wrap')}> {currentServerDisks.map((disk, index) => <ExistDisk key={disk['DeviceName']} index={ index } {...disk} />)}</div>
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