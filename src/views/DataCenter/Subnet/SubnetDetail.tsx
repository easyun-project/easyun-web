import React,{ useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Switch,Select } from 'antd';
import { CheckOutlined,CloseOutlined } from '@ant-design/icons';

export default function SubnetDetail() {
    const params = useParams();
    const { subnetId } = params;
    const subnet = useSelector((state:RootState)=>state.dataCenter.currentDC.subnet?.filter(subnet=>subnet.subnetId === subnetId).at(0));
    const [seletedRoute,changeSeletedRoute] = useState('');
    const [autoAssign, changeAutoAssign] = useState(true);
    const { Option } = Select;
    return (
        <div className='flex m-4'>
            {subnet?.subnetType === 'public'
                ? <Icon className='mr-8' icon="gis:globe-alt-o" width="100" color='#686868' inline={true} />
                : <Icon className='mr-8' icon="teenyicons:lock-circle-outline" color='#686868' width="100" inline={true} />}
            <div className='grow'>
                {/* static information */}
                <div className='flex border-b-2 border-dashed'>
                    <div className='grow'>
                        <div className='text-2xl'>{subnet?.tagName}</div>
                        <div className='my-2 text-xs text-gray-500'>
                            <div>ID: {subnetId}</div>
                            <div>AZ: {subnet?.subnetAz}</div>
                        </div>
                    </div>
                    <div className='self-center'>
                        <button className="w-32 btn-red"> Delete Subnet</button>
                    </div>
                </div>
                <div className='my-2'>
                    <div className='text-lg font-bold'>Auto-assign IP settings</div>
                    <div className='text-xs text-gray-500'>Enable the auto-assign Ip setting to automatically request a public IPv4 or IPv6 address for a new network interface in this subnet.</div>
                    <div className='flex items-center my-2'>
                        <Switch
                            // checkedChildren={<CheckOutlined className='align-middle'/>}
                            // unCheckedChildren={<CloseOutlined className='align-middle'/>}
                            checkedChildren={<CheckOutlined/>}
                            unCheckedChildren={<CloseOutlined/>}
                            defaultChecked
                            onChange = {()=>
                                changeAutoAssign(!autoAssign)}
                        />
                        <div>{autoAssign ? 'Enable' : 'Disable'} auto-assign public IPv4 address</div>
                    </div>
                </div>

                <div className='text-lg font-bold'>Subnet route table settings</div>
                <div>Route table ID</div>
                <Select className='w-96' placeholder='slect a route table' onChange={value=>changeSeletedRoute(value)}>
                    <Option value='rtb-1'>rtb-1</Option>
                    <Option value='rtb-2'>rtb-2</Option>
                </Select>
            </div>
        </div>
    );
}
