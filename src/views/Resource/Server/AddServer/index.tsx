import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import CPlatform from '@/components/Logic/CPlatform';
import { CButton } from '@/components/Common/CButton';
import CAmis from '@/components/Logic/CAmi';
import CSecOpt from '@/components/Logic/CSecurityGroup/CSecOpt';
import DiskConfigurations from './DiskConfiguration';
import InstanceList from './InstanceList';
import SSHkeys from './SSHkeys';
import { Cascader, Card, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Networking, { SubnetInfo } from './Networking';
import { useState, useEffect } from 'react';
import serverService from '@/service/serverService';
import DataCenterService from '@/service/dataCenterService';
import AccountService from '@/service/accountService';
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
    });
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
        DataCenterService.listAllSecgroup({ dc }).then((res) => changeSecgroups(res));
        DataCenterService.listAllSubnet({ dc }).then((res) => changeSubnets(res));
        AccountService.getSSHKeys().then((res) => changeKeyPairs(res));
    }, []);

    useEffect(() => {
        console.log(arch, os);
        changeAmis('loading');
        serverService.getServerImages({
            os: os,
            arch,
            dc
        }).then((res: amiInfo[]) => changeAmis(res));
    }, [ arch, os ]);

    useEffect(() => {
        changeInsTypes('loading');
        serverService.getServerInstypes({
            arch,
            os: os,
            family: insFamily.toLowerCase(),
            dc
        }).then(res => changeInsTypes(res));

        serverService.getServerInsfamily({
            arch,
            dc
        }).then(res => {
            generateOptions(res);
        }
        );
    }, [ arch, os, insFamily ]);

    useEffect(() => {
        console.log(tagName, svrNumber, arch, os, selectedAmi, selectedIns, selectedSubnet, slectedSecgroups, selectedKey, disks);
    }, [tagName, svrNumber, arch, os, selectedAmi, selectedIns, selectedSubnet, slectedSecgroups, selectedKey, disks]);


    return (
        <div>
            <div id="add-cloud-server-title" className={classnames('m-5')}>
                <Icon className={classnames('inline-block')} icon="fluent:add-circle-20-regular" width="30"
                    height="30" fr={undefined} />
                <span>Add Cloud Server(EC2 Instance)</span>
            </div>

            <Card title="Identify your server" className={classnames('rounded-border', 'mt-5')}>
                <div className='flex items-center'>
                    <Input className={classnames('w-36')} type="text"
                        defaultValue={tagName}
                        onChange={e => changeTagName(e.target.value)} />
                    <span className='text-gray-500'>x</span>
                    <Input min={1} max={99} defaultValue={1} maxLength={2}
                        className={classnames('w-20')}
                        type="number" onChange={e => changeSvrNumber(parseInt(e.target.value))} />
                </div>
            </Card>

            <Card title="Select your server os and arch" className={classnames('rounded-border', 'mt-5')}>
                {/* 下面的组件用于选择服务器架构 */}
                <div className={classnames('flex', 'items-center')}>
                    <div> select your server arch </div>
                    <CButton classes={classnames(
                        arch === 'x86_64' ? 'bg-yellow-550' : 'bg-gray-400',
                        'text-white',
                        'rounded-3xl',
                        'h-10',
                        'w-32',
                        'px-5',
                        'm-5')}
                    click={() => { changeArch('x86_64'); }}>64-bit(x86)</CButton>
                    <CButton classes={classnames(
                        arch === 'arm64' ? 'bg-yellow-550' : 'bg-gray-400',
                        'text-white',
                        'rounded-3xl',
                        'h-10',
                        'w-32',
                        'px-5',
                        'm-5')}
                    click={() => { changeArch('arm64'); }}>64-bit(arm)</CButton>
                </div>
                {/* 下面的用于选择操作系统 */}
                <CPlatform platform={os} changePlatform={changeOs} />
            </Card>

            <Card title="Select your image(AMI)" className={classnames('rounded-border', 'mt-5')} loading={amis === 'loading'}>
                <CAmis amis={amis} selectedAmi={selectedAmi} changeSelectedAmi={changeSelectedAmi} />
            </Card>

            <Card title="Select your instance type" className={classnames('rounded-border', 'mt-5')}>
                {/* e是级联菜单中被选定的值，是一个列表 */}
                <Cascader style={{ width: '20%' }} options={insfamilyOptions} placeholder="选择实例类型"
                    onChange={(e) => {
                        if (e[1]) { changeInsFamily(e[1] as string); }
                    }} changeOnSelect />
                {/* 在获取到insType的值后，渲染列表 */}
                <InstanceList insTypes={insTypes} changeselectefIns={changeselectedIns} />
            </Card>

            <Card title="Setting your disk" className={classnames('rounded-border', 'mt-5')}>
                <DiskConfigurations disks={disks} changeDisks={changeDisks} />
            </Card>

            <Card title="Setting your security groups" className={classnames('rounded-border', 'mt-5')} extra={<span>you can choose more than one </span>}>
                <CSecOpt multi={true} secgroups={secgroups} changeSelectedSecgroups={changeSelectedSecgroups} />
            </Card>

            <Card title="Setting your subnet" className={classnames('rounded-border', 'mt-5')}>
                <Networking subnets={subnets} changeSelectedSubnet={changeSelectedSubnet} />
            </Card>

            <Card title="Setting your keypair" className={classnames('rounded-border', 'mt-5')}>
                <SSHkeys keyPairs={keyPairs} changeSelectedKey={changeSelectedKey} />
            </Card>


            <div id="create-buttons">
                <div>
                    <button className={classnames('btn-gray', 'w-32', 'm-5')} onClick={() => navigate(-1)}>Back</button>
                    <button className={classnames('btn-yellow', 'w-32', 'm-5')} onClick={() => {
                        changeCreating(true);
                        serverService.addServer({
                            'BlockDeviceMappings': disks,
                            'ImageId': selectedAmi,
                            'InstanceType': selectedIns,
                            'KeyName': selectedKey,
                            'SecurityGroupIds': slectedSecgroups,
                            'SubnetId': selectedSubnet,
                            'dcName': dc,
                            'svrNumber': svrNumber,
                            'tagName': tagName
                        }).then(
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