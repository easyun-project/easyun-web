import React,{ useState } from 'react';
import { Icon } from '@iconify/react';
import { Card,Input,Select } from 'antd';
import CTags from '@/components/Logic/CTags';

export default function AddSubnet() {
    const [subnetName,changeSubnetName] = useState('my-subnet');
    const [zone, changeZone] = useState('us-east-1a');
    const [cidr, changeCidr] = useState('10.0.0.0/24');
    const [tags, changeTags] = useState<Record<string,string>>({ he:'llo' });
    const { Option } = Select;
    return (
        <div>
            <div className='flex items-center'>
                <Icon icon="fluent:add-circle-20-regular" width="30" height="30"/>
                <span>Add Subnet</span>
            </div>
            <Card title="Identify your subnet" className='mt-5 rounded-border'>
                <Input className='w-72' type="text" defaultValue={subnetName} size='middle'
                    onChange={e=>changeSubnetName(e.target.value)}/>
                <div>The name can be up to 256 characters long.</div>
            </Card>
            <Card title="Availability Zone" className='mt-5 rounded-border'>
                <div>Choose the zone in which your subnet will reside.</div>
                <Select className='w-96' onChange={(value=>changeZone(value))} defaultValue={zone}>
                    <Option value='us-east-1a'> US East(N. Virginia)/ us-east-1a</Option>
                    <Option value='us-east-1b'> US East(N. Virginia)/ us-east-1b</Option>
                </Select>
            </Card>
            <Card title="IPv4 CIDR block" className='mt-5 rounded-border'>
                <Input className='w-72' type="text" defaultValue={cidr} size='middle'
                    onChange={e=>changeCidr(e.target.value)}/>
            </Card>
            <Card className='mt-5 rounded-border' title={
                <div className='flex items-center'>
                    <Icon icon="fluent:add-circle-20-regular" width="30" height="30"/>
                    <div>Tags - optional</div>
                </div>} >
                <CTags tags={tags} changeTags={changeTags}/>
            </Card>
            <div className='flex justify-center mt-5'>
                <button className='btn-yellow' onClick={()=>console.log({
                    subnetName,
                    zone,
                    cidr,
                    tags
                })}> Add subnet</button>
            </div>
        </div>
    );
}
