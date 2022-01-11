import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import CPlatform from '@/components/Logic/CPlatform';
import { CButton } from '@/components/Common/CButton';
import CAmis from '@/components/Logic/CAmi';
// import CSecurityGroup from '@/components/Logic/CSecurityGroup';
import CSecOpt from '@/components/Logic/CSecurityGroup/CSecOpt';
import DiskConfiguration from './DiskConfiguration';
import InstanceList from './InstanceList';
import SSHkeys from './SSHkeys';
import { Cascader } from 'antd';
import { CSubnet } from '@/components/Logic/CSubnet';
import Networking from './Networking';
import { useState,useEffect } from 'react';
import serverService from '@/service/serverService';
import { amiInfo } from '@/components/Logic/CAmi';


const AddServer = (): JSX.Element => {
    const options = [
        {
            value: '通用计算型',
            label: '通用计算型',
            children: [
                {
                    value: 'Mac',
                    label: 'Mac',
                },
                {
                    value: 'T4g',
                    label: 'T4g',
                },
                {
                    value: 'T3',
                    label: 'T3',
                },
                {
                    value: 'T2',
                    label: 'T2',
                },
                {
                    value: 'M6g',
                    label: 'M6g',
                },
                {
                    value: 'M6i',
                    label: 'M6i',
                },
                {
                    value: 'M5',
                    label: 'M5',
                },
                {
                    value: 'M5a',
                    label: 'M5a',
                },
                {
                    value: 'M5n',
                    label: 'M5n',
                },
                {
                    value: 'M5zn',
                    label: 'M5zn',
                },
                {
                    value: 'M4',
                    label: 'M4',
                },
                {
                    value: 'A1',
                    label: 'A1',
                },
            ],
        },
        {
            value: '计算优化型',
            label: '计算优化型',
            children: [
                {
                    value: 'C6g',
                    label: 'C6g',
                },
                {
                    value: 'C6gn',
                    label: 'C6gn',
                },
                {
                    value: 'C6i',
                    label: 'C6i',
                },
                {
                    value: 'C5',
                    label: 'C5',
                },
                {
                    value: 'C5a',
                    label: 'C5a',
                },
                {
                    value: 'C5n',
                    label: 'C5n',
                },
                {
                    value: 'C4',
                    label: 'C4',
                }
            ],
        },
        {
            value: '内存优化型',
            label: '内存优化型',
            children: [
                {
                    value: 'R6g',
                    label: 'R6g',
                },
                {
                    value: 'R5',
                    label: 'R5',
                },
                {
                    value: 'R5a',
                    label: 'R5a',
                },
                {
                    value: 'R5b',
                    label: 'R5b',
                },
                {
                    value: 'R5n',
                    label: 'R5n',
                },
                {
                    value: 'R4',
                    label: 'R4',
                },
                {
                    value: 'X2gd',
                    label: 'X2gd',
                },
                {
                    value: 'X1e',
                    label: 'X1e',
                },
                {
                    value: 'X1',
                    label: 'X1',
                },
                {
                    value: '内存增强型',
                    label: '内存增强型',
                },
                {
                    value: 'z1d',
                    label: 'z1d',
                }
            ],
        },
        {
            value: '加速计算型',
            label: '加速计算型',
            children: [
                {
                    value: 'P4',
                    label: 'P4',
                },
                {
                    value: 'P3',
                    label: 'P3',
                },
                {
                    value: 'P2',
                    label: 'P2',
                },
                {
                    value: 'DL1',
                    label: 'DL1',
                },
                {
                    value: 'Inf1',
                    label: 'Inf1',
                },
                {
                    value: 'G5',
                    label: 'G5',
                },
                {
                    value: 'G4dn',
                    label: 'G4dn',
                },
                {
                    value: 'G4ad',
                    label: 'G4ad',
                },
                {
                    value: 'G3',
                    label: 'G3',
                },
                {
                    value: 'F1',
                    label: 'F1',
                },
                {
                    value: 'VT1',
                    label: 'VT1',
                }
            ],
        },
        {
            value: '存储优化型',
            label: '存储优化型',
            children: [
                {
                    value: 'I3',
                    label: 'I3',
                },
                {
                    value: 'I3en',
                    label: 'I3en',
                },
                {
                    value: 'D2',
                    label: 'D2',
                },
                {
                    value: 'D3',
                    label: 'D3',
                },
                {
                    value: 'D3en',
                    label: 'D3en',
                },
                {
                    value: 'H1',
                    label: 'H1',
                },
            ],
        },
    ];
    const [arch, changeArch] = useState('x86_64');
    const [platform, changePlatform] = useState('linux');
    const [amis, changeAmis] = useState('loading');
    const [selectedAmi, changeSelectedAmi] = useState('');
    useEffect( ()=>{
        console.log(arch,platform);
        changeAmis('loading');
        serverService.getServerImages({
            'dcRegion': 'us-east-1',
            'imgArch': arch,
            'imgPlatform': platform, }).then((res:amiInfo[]) => {
            changeAmis(res);
        });

    },[arch,platform]);
    useEffect( ()=>{
        console.log(arch,platform,selectedAmi);
    },[selectedAmi]);
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
                    <input className={classnames('border', 'w-72', 'h-10', 'px-1', 'py-3', 'mx-3')} type="text"/>
                    <span className={classnames('text-gray-500')}>x</span>
                    <input min={1} max={99} defaultValue={'1'} maxLength={2}
                        className={classnames('border', 'w-14', 'py-1', 'px-2', 'h-10', 'mx-3')}
                        type="number"/>
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
                <CPlatform platform={platform} changePlatform={changePlatform}/>
            </div>

            <CAmis amis={amis} selectedAmi={selectedAmi} changeSelectedAmi={changeSelectedAmi}/>

            <div id="select-your-instance">
                <div>select your instance type</div>
                <Cascader style={{ width: '20%' }} options={options} placeholder="选择实例类型" />
                <InstanceList />
            </div>
            <div>setting your disk</div>
            <DiskConfiguration />

            <div id="select-security-group">
                <CSecOpt />
            </div>

            <div id="select-networking">
                <CSubnet index={1} isPublic={false}/>
                <Networking />
            </div>

            <div id="select-SSH-keys">
                <SSHkeys/>
            </div>

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