import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import CPlatform from '@/components/Logic/CPlatform';
import { CButton } from '@/components/Common/CButton';
import CAmis from '@/components/Logic/CAmi';
// import CSecurityGroup from '@/components/Logic/CSecurityGroup';
import CSecOpt from '@/components/Logic/CSecurityGroup/CSecOpt';
import DiskConfigurations from './DiskConfiguration';
import InstanceList from './InstanceList';
import SSHkeys from './SSHkeys';
import { Cascader } from 'antd';
import Networking from './Networking';
import { useState,useEffect } from 'react';
import serverService from '@/service/serverService';
import DataCenterService from '@/service/dataCenterService';
import AccountService from '@/service/accountService';
import { amiInfo } from '@/components/Logic/CAmi';
import { InsType } from './InstanceList';
import { CSecOptInfo } from '@/components/Logic/CSecurityGroup/CSecOpt';
import { KeyInfo } from './SSHkeys';
import { DiskInfo } from './DiskConfiguration';
import { SubnetInfo } from './Networking';

export interface InsTypeFamily {
    catdesCode:string
    catgName:string
    familyDes:string
    familyName:string
}

type Option = {
value: string
label: string
children: {
    value: string
    label: string,}[],
}[]


const AddServer = (): JSX.Element => {
    const [insfamilyOptions, changeInsfamilyOptions] = useState<Option>();
    const [instypeFamily, changeInstypeFamily] = useState<InsTypeFamily[]>([]);
    const [tagName, changeTagName] = useState('NewServerName');
    const [svrNumber, changeSvrNumber] = useState(1);
    const [arch, changeArch] = useState<'x86_64'|'arm64'>('x86_64');
    const [os, changeOs] = useState<'linux'|'windows'>('linux');
    const [selectedAmi, changeSelectedAmi] = useState('');
    const [insFamily, changeInsFamily] = useState('a1');
    const [amis, changeAmis] = useState<'loading'|amiInfo[]>('loading');
    const [insTypes, changeInsTypes] = useState<'loading' | InsType[]>('loading');
    const [selectedIns, changeselectedIns] = useState('');
    const [secgroups, changeSecgroups] = useState<CSecOptInfo[]>([]);
    const [slectedSecgroups, changeSlectedSecgroups] = useState<string[]>([]);
    const [subnets, changeSubnets] = useState<SubnetInfo[]>([]);
    const [selectedSubnet, changeSelectedSubnet] = useState('');
    const [keyPairs, changeKeyPairs] = useState<KeyInfo[]>([]);
    const [selectedKey, changeSelectedKey] = useState('');
    const [disks, changeDisks] = useState<DiskInfo[]>([{
        'DviceName': '/sda1',
        'Ebs': {
            'DeleteOnTermination': true,
            'VolumnSize': 16,
            'VolumnType': 'gp2',
            'VolumnIOPS': 3000,
            'VolumnThruputs': 125,
            'VolumnEncryption': true
        } }]);
    const generateOptions = (family:InsTypeFamily[])=>{
        console.log(family);
        const options:Option = [
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
            (item)=>{
                switch (item.catdesCode){
                case 'GP':
                    options[0].children.push({ value:item.familyName,label:item.familyName });
                    break;
                case 'CO':
                    options[1].children.push({ value:item.familyName,label:item.familyName });
                    break;
                case 'MO':
                    options[2].children.push({ value:item.familyName,label:item.familyName });
                    break;
                case 'AC':
                    options[3].children.push({ value:item.familyName,label:item.familyName });
                    break;
                case 'SO':
                    options[4].children.push({ value:item.familyName,label:item.familyName });
                    break;
                }
            }
        );
        console.log(options);
        changeInsfamilyOptions(options);
    };

    useEffect( ()=>{
        console.log(tagName,svrNumber,arch, os,selectedAmi,selectedIns,selectedSubnet,slectedSecgroups,selectedKey,disks);
    }, [tagName,svrNumber,arch, os,selectedAmi,selectedIns,selectedSubnet,slectedSecgroups,selectedKey,disks]);
    useEffect( ()=>{
        console.log(arch,os);
        changeAmis('loading');
        serverService.getServerImages({
            os:os,
            arch,
            dc:'Easyun'
        }).then((res: amiInfo[]) => changeAmis(res));
    },
    [arch, os]);
    useEffect(() => {

        changeInsTypes('loading');
        serverService.getServerInstypes({
            arch,
            os: os,
            family: insFamily.toLowerCase(),
            dc:'Easyun'
        }).then(res => changeInsTypes(res));

        serverService.getServerInsfamily({
            arch,
            dc:'Easyun'
        }).then(res=>
        {
            changeInstypeFamily(res);
            generateOptions(res);
        }
        );
    },
    [arch, os, insFamily]);
    useEffect(()=>{
        DataCenterService.getSecgroup('Easyun').then((res) => changeSecgroups(res));
        DataCenterService.getSubnet({ dc:'Easyun' }).then((res) => changeSubnets(res));
        AccountService.getSSHKeys().then((res) => changeKeyPairs(res));
    }, []);
    return (
        <div>
            <div id="add-cloud-server-title" className={classnames('m-5')}>
                <Icon className={classnames('inline-block')} icon="fluent:add-circle-20-regular" width="30"
                    height="30" fr={undefined}/>
                <span>Add Cloud Server(EC2 Instance)</span>
            </div>

            <div id="identify-your-server-form">
                <div className={classnames('mx-5')}>Identify your server</div>
                <div className={classnames('mb-5', 'mt-2', 'mx-2')}>
                    <input className={classnames('border', 'w-72', 'h-10', 'px-1', 'py-3', 'mx-3')} type="text"
                        defaultValue={tagName}
                        onChange={e=>changeTagName(e.target.value)}/>
                    <span className={classnames('text-gray-500')}>x</span>
                    <input min={1} max={99} defaultValue={'1'} maxLength={2}
                        className={classnames('border', 'w-14', 'py-1', 'px-2', 'h-10', 'mx-3')}
                        type="number" onChange={e=> changeSvrNumber(parseInt(e.target.value)) }/>
                </div>
            </div>

            <div id="select-your-platform">
                {/* 下面的组件用于选择服务器架构 */}
                <div className={classnames('flex', 'flex-row','items-center','p-3', 'm-3')}>
                    <div> select a platform </div>
                    <CButton classes={classnames(
                        arch === 'x86_64' ? 'bg-yellow-550' : 'bg-gray-400',
                        'text-white',
                        'rounded-3xl',
                        'h-10',
                        'w-32',
                        'px-5',
                        'm-5')}
                    click = {()=>{changeArch('x86_64');}}>64-bit(x86)</CButton>
                    <CButton classes={classnames(
                        arch === 'arm64' ? 'bg-yellow-550' : 'bg-gray-400',
                        'text-white',
                        'rounded-3xl',
                        'h-10',
                        'w-32',
                        'px-5',
                        'm-5')}
                    click = {()=>{changeArch('arm64');}}>64-bit(arm)</CButton>
                </div>
                {/* 下面的用于选择操作系统 */}
                <CPlatform platform={os} changePlatform={changeOs}/>
            </div>

            <CAmis amis={amis} selectedAmi={selectedAmi} changeSelectedAmi={changeSelectedAmi}/>
            <div>select your instance type</div>
            {/* e是级联菜单中被选定的值，是一个列表 */}
            <Cascader style={{ width: '20%' }} options={insfamilyOptions} placeholder="选择实例类型"
                onChange={ (e)=>{
                    if(e[1]){changeInsFamily(e[1]);}
                }} changeOnSelect/>
            {/* 在获取到insType的值后，渲染列表 */}
            <InstanceList insTypes={insTypes} changeselectefIns={ changeselectedIns}/>
            <div>setting your disk</div>
            <DiskConfigurations disks={disks} changeDisks={changeDisks} />
            <CSecOpt multi={ true } secgroups={secgroups} changeSlectedSecgroups={changeSlectedSecgroups}/>
            <Networking subnets={ subnets } changeSelectedSubnet={ changeSelectedSubnet }/>
            <SSHkeys keyPairs={ keyPairs } changeSelectedKey={ changeSelectedKey }/>

            <div id="create-buttons">
                <div>
                    <CButton
                        classes={classnames(
                            'bg-gray-500',
                            'text-white',
                            'rounded-3xl',
                            'h-10',
                            'w-32',
                            'px-5',
                            'm-5'
                        )}
                    >
          Back
                    </CButton>
                    <CButton
                        classes={classnames(
                            'bg-yellow-550',
                            'text-white',
                            'rounded-3xl',
                            'h-10',
                            'w-32',
                            'px-5',
                            'm-5'
                        )}
                        click={() => {
                            serverService.addServer({
                                'BlockDeviceMappings': disks,
                                'ImageId': selectedAmi,
                                'InstanceType': selectedIns,
                                'KeyName': selectedKey,
                                'SecurityGroupIds': slectedSecgroups,
                                'SubnetId': selectedSubnet,
                                'dcName': 'Easyun',
                                'svrNumber':svrNumber,
                                'tagName': tagName
                            }).then(
                                () => alert('创建成功'),
                                () => alert('创建失败'),
                            );
                        } }
                        // click={async () => {
                        //     await bucketManage
                        //         .addBucket({
                        //             bucketName,
                        //             versioningConfiguration: versioningConfiguration ? 'Enabled' : 'Suspended',
                        //             bucketEncryption: bucketEncryption.toString(),
                        //             region,
                        //         },userState?.token)
                        //         .then(() => {
                        //             alert('创建成功');
                        //         })
                        //         .then(() => {
                        //             navigate('/resource/storage');
                        //         });
                        // }}
                    >
          Create
                    </CButton>
                </div>
            </div>
        </div>
    );
};


export default AddServer;