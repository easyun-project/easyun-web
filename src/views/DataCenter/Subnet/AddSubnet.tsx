import { SimpleSelect as Select, SimpleOption as Option } from '@/components/ui/simple-select';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import CTags from '@/components/Logic/CTags';

export default function AddSubnet() {
    const [subnetName, changeSubnetName] = useState('my-subnet');
    const [zone, changeZone] = useState('us-east-1a');
    const [cidr, changeCidr] = useState('10.0.0.0/24');
    const [tags, changeTags] = useState<Record<string, string>>({ he: 'llo' });
        return (
        <div>
            <div className='flex items-center'>
                <Icon icon="fluent:add-circle-20-regular" width="30" height="30" />
                <span>Add Subnet</span>
            </div>
            <div className='mt-5 rounded-border'><h5 className="font-semibold mb-2">Identify your subnet</h5>
                <Input className='w-72' type="text" defaultValue={subnetName}
                    onChange={e => changeSubnetName(e.target.value)} />
                <div>The name can be up to 256 characters long.</div>
            </div>
            <div className='mt-5 rounded-border'><h5 className="font-semibold mb-2">Availability Zone</h5>
                <div>Choose the zone in which your subnet will reside.</div>
                <Select className='w-96' onValueChange={(value => changeZone(value))} defaultValue={zone}>
                    <Option value='us-east-1a'> US East(N. Virginia)/ us-east-1a</Option>
                    <Option value='us-east-1b'> US East(N. Virginia)/ us-east-1b</Option>
                </Select>
            </div>
            <div className='mt-5 rounded-border'><h5 className="font-semibold mb-2">IPv4 CIDR block</h5>
                <Input className='w-72' type="text" defaultValue={cidr}
                    onChange={e => changeCidr(e.target.value)} />
            </div>
            <div className='mt-5 rounded-border'>
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon icon="fluent:add-circle-20-regular" width="30" height="30" />
                    Tags - optional
                </h5>
                <CTags tags={tags} changeTags={changeTags} />
            </div>
            <div className='flex justify-center mt-5'>
                <button className='btn-yellow' onClick={() => console.log({
                    subnetName,
                    zone,
                    cidr,
                    tags
                })}> Add subnet</button>
            </div>
        </div>
    );
}
