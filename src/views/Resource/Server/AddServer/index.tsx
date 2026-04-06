import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';
import CPlatform from '@/components/Logic/CPlatform';
import { Button } from '@/components/ui/button';
import CAmis from '@/components/Logic/CAmi';
import CSecOpt from '@/components/Logic/CSecurityGroup/CSecOpt';
import DiskConfigurations from './DiskConfiguration';
import InstanceList from './InstanceList';
import SSHkeys from './SSHkeys';
import { Cascader } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Networking, { SubnetInfo } from './Networking';
import { useState, useEffect } from 'react';
import { postApiV1ServerAction, deleteApiV1Server, postApiV1ServerConfig, putApiV1ServerName, putApiV1ServerDisk, putApiV1ServerEip, putApiV1ServerSecgroup, getApiV1ServerParamImage, getApiV1ServerParamInstypeList, getApiV1ServerParamInstypeFamily, postApiV1Server, getApiV1ServerDetailBySvrId, deleteApiV1ServerTagsBySvrId, putApiV1ServerTagsBySvrId } from '@/api-client';
import { getApiV1DatacenterSecgroupList as _dcSecgroupList, getApiV1DatacenterSubnetList as _dcSubnetList } from '@/api-client';
import { getApiV1DatacenterSecgroupList, getApiV1DatacenterSubnetList } from '@/api-client';
import { getApiV1AccountKeypairList } from '@/api-client';
import { amiInfo } from '@/components/Logic/CAmi';
import { InsType } from './InstanceList';
import { CSecOptInfo } from '@/components/Logic/CSecurityGroup/CSecOpt';
import { KeyInfo } from './SSHkeys';
import { DiskInfo } from './DiskConfiguration';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface InsTypeFamily {
    catdesCode: string
    catgName: string
    familyDes: string
    familyName: string
}

type Option = {
    value: string
    label: string
    children: {
        value: string
        label: string,
    }[],
}[]


const AddServer = (): JSX.Element => {
    const dc = useSelector((state: RootState) => {
        return state.dataCenter.current!.dcName;
    }) || '';
    const navigate = useNavigate();
    const [creating, changeCreating] = useState(false);
    //server tag and name
    const [tagName, changeTagName] = useState('NewServerName');
    const [svrNumber, changeSvrNumber] = useState(1);
    //arch and os
    const [arch, changeArch] = useState<'x86_64' | 'arm64'>('x86_64');
    const [os, changeOs] = useState<'linux' | 'windows'>('linux');
    // ami image
    const [amis, changeAmis] = useState<'loading' | amiInfo[]>('loading');
    const [selectedAmi, changeSelectedAmi] = useState('');
    // instype family
    const [insfamilyOptions, changeInsfamilyOptions] = useState<Option>();
    // const [instypeFamily, changeInstypeFamily] = useState<InsTypeFamily[]>([]);
    const [insFamily, changeInsFamily] = useState('a1');
    // instype
    const [insTypes, changeInsTypes] = useState<'loading' | InsType[]>('loading');
    const [selectedIns, changeselectedIns] = useState('');
    // secgroup
    const [secgroups, changeSecgroups] = useState<CSecOptInfo[]>([]);
    const [slectedSecgroups, changeSelectedSecgroups] = useState<string[]>([]);
    // subnet
    const [subnets, changeSubnets] = useState<SubnetInfo[]>([]);
    const [selectedSubnet, changeSelectedSubnet] = useState('');
    // keypair
    const [keyPairs, changeKeyPairs] = useState<KeyInfo[]>([]);
    const [selectedKey, changeSelectedKey] = useState('');
    // disk
    const [disks, changeDisks] = useState<DiskInfo[]>([{
        'DeviceName': '/dev/sda1',
        'Ebs': {
            'DeleteOnTermination': true,
            'VolumeSize': 16,
            'VolumeType': 'gp2',
            'VolumeIOPS': 3000,
            'VolumeThruputs': 125,
            'Encrypted': true
        }
    }]);

    const generateOptions = (family: InsTypeFamily[]) => {
        const options: Option = [
            {
                value: 'General Purpose',
                label: 'General Purpose',
                children: [],
            },
            {
                value: 'Compute Optimized',
                label: 'Compute Optimized',
                children: [],
            },
            {
                value: 'Memory Optimized',
                label: 'Memory Optimized',
                children: [],
            },
            {
                value: 'Accelerated Computing',
                label: 'Accelerated Computing',
                children: [],
            },
            {
                value: 'Storage Optimized',
                label: 'Storage Optimized',
                children: [],
            },
        ];
        family.map(
            (item) => {
                switch (item.catdesCode) {
                case 'GP':
                    options[0].children.push({ value: item.familyName, label: item.familyName });
                    break;
                case 'CO':
                    options[1].children.push({ value: item.familyName, label: item.familyName });
                    break;
                case 'MO':
                    options[2].children.push({ value: item.familyName, label: item.familyName });
                    break;
                case 'AC':
                    options[3].children.push({ value: item.familyName, label: item.familyName });
                    break;
                case 'SO':
                    options[4].children.push({ value: item.familyName, label: item.familyName });
                    break;
                }
            }
        );
        console.log(options);
        changeInsfamilyOptions(options);
    };

    useEffect(() => {
        getApiV1DatacenterSecgroupList({ query: { dc } as any }).then(({ data }) => changeSecgroups(data?.detail as any));
        getApiV1DatacenterSubnetList({ query: { dc } as any }).then(({ data }) => changeSubnets(data?.detail as any));
        getApiV1AccountKeypairList({} as any).then(({ data }: any) => changeKeyPairs(data?.detail));
    }, []);

    useEffect(() => {
        console.log(arch, os);
        changeAmis('loading');
        getApiV1ServerParamImage({ query: {
            os: os,
            arch,
            dc
        } as any }).then(({ data }) => { const res = data?.detail as any; return res; }).then((res) => changeAmis(res));
    }, [ arch, os ]);

    useEffect(() => {
        changeInsTypes('loading');
        getApiV1ServerParamInstypeList({ query: {
            arch,
            os: os,
            family: insFamily.toLowerCase(),
            dc
        } as any }).then(({ data }) => changeInsTypes(data?.detail as any));

        getApiV1ServerParamInstypeFamily({ query: {
            arch,
            dc
        } as any }).then(({ data }) => { const res = data?.detail as any; return res; }).then((res) => {
            generateOptions(res);
        }
        );
    }, [ arch, os, insFamily ]);

    useEffect(() => {
        console.log(tagName, svrNumber, arch, os, selectedAmi, selectedIns, selectedSubnet, slectedSecgroups, selectedKey, disks);
    }, [tagName, svrNumber, arch, os, selectedAmi, selectedIns, selectedSubnet, slectedSecgroups, selectedKey, disks]);


    return (
        <div>
            <div id="add-cloud-server-title" className={"m-5"}>
                <Icon className={"inline-block"} icon="fluent:add-circle-20-regular" width="30"
                    height="30" fr={undefined} />
                <span>Add Cloud Server(EC2 Instance)</span>
            </div>

            <div className={"rounded-border mt-5"}><h5 className="font-semibold mb-2">Identify your server</h5>
                <div className='flex items-center'>
                    <Input className={"w-36"} type="text"
                        defaultValue={tagName}
                        onChange={e => changeTagName(e.target.value)} />
                    <span className='text-gray-500'>x</span>
                    <Input min={1} max={99} defaultValue={1} maxLength={2}
                        className={"w-20"}
                        type="number" onChange={e => changeSvrNumber(parseInt(e.target.value))} />
                </div>
            </div>

            <div className={"rounded-border mt-5"}><h5 className="font-semibold mb-2">Select your server os and arch</h5>
                {/* 下面的组件用于选择服务器架构 */}
                <div className={"flex items-center"}>
                    <div> select your server arch </div>
                    <Button className={clsx(
                        arch === 'x86_64' ? 'bg-yellow-550' : 'bg-gray-400',
                        'text-white',
                        'rounded-3xl',
                        'h-10',
                        'w-32',
                        'px-5',
                        'm-5')}
                    onClick={() => { changeArch('x86_64'); }}>64-bit(x86)</Button>
                    <Button className={clsx(
                        arch === 'arm64' ? 'bg-yellow-550' : 'bg-gray-400',
                        'text-white',
                        'rounded-3xl',
                        'h-10',
                        'w-32',
                        'px-5',
                        'm-5')}
                    onClick={() => { changeArch('arm64'); }}>64-bit(arm)</Button>
                </div>
                {/* 下面的用于选择操作系统 */}
                <CPlatform platform={os} changePlatform={changeOs} />
            </div>

            <div className={"rounded-border mt-5"}><h5 className="font-semibold mb-2">Select your image(AMI)</h5>
                <CAmis amis={amis} selectedAmi={selectedAmi} changeSelectedAmi={changeSelectedAmi} />
            </div>

            <div className={"rounded-border mt-5"}><h5 className="font-semibold mb-2">Select your instance type</h5>
                {/* e是级联菜单中被选定的值，是一个列表 */}
                <Cascader style={{ width: '20%' }} options={insfamilyOptions} placeholder="选择实例类型"
                    onChange={(e) => {
                        if (e[1]) { changeInsFamily(e[1] as string); }
                    }} changeOnSelect />
                {/* 在获取到insType的值后，渲染列表 */}
                <InstanceList insTypes={insTypes} changeselectefIns={changeselectedIns} />
            </div>

            <div className={"rounded-border mt-5"}><h5 className="font-semibold mb-2">Setting your disk</h5>
                <DiskConfigurations disks={disks} changeDisks={changeDisks} />
            </div>

            <div className={"rounded-border mt-5"}>
                <CSecOpt multi={true} secgroups={secgroups} changeSelectedSecgroups={changeSelectedSecgroups} />
            </div>

            <div className={"rounded-border mt-5"}><h5 className="font-semibold mb-2">Setting your subnet</h5>
                <Networking subnets={subnets} changeSelectedSubnet={changeSelectedSubnet} />
            </div>

            <div className={"rounded-border mt-5"}><h5 className="font-semibold mb-2">Setting your keypair</h5>
                <SSHkeys keyPairs={keyPairs} changeSelectedKey={changeSelectedKey} />
            </div>


            <div id="create-buttons">
                <div>
                    <button className={"btn-gray w-32 m-5"} onClick={() => navigate(-1)}>Back</button>
                    <button className={"btn-yellow w-32 m-5"} onClick={() => {
                        changeCreating(true);
                        postApiV1Server({ body: {
                            'BlockDeviceMappings': disks,
                            'ImageId': selectedAmi,
                            'InstanceType': selectedIns,
                            'KeyName': selectedKey,
                            'SecurityGroupIds': slectedSecgroups,
                            'SubnetId': selectedSubnet,
                            'dcName': dc,
                            'svrNumber': svrNumber,
                            'tagName': tagName
                        } as any }).then(
                            () => {
                                changeCreating(false);
                                alert('创建成功');
                                navigate('/resource/server');
                            },
                            () => {
                                changeCreating(false);
                                alert('创建失败');
                            },
                        );
                    }
                    }> {creating ? <LoadingOutlined className='align-middle' /> : undefined} Create</button>
                </div>
            </div>
        </div>
    );
};


export default AddServer;