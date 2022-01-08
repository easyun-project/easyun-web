import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import CPlatform from '@/components/Logic/CPlatform';
import { CButton } from '@/components/Common/CButton';
import CAmis from '@/components/Logic/CAmi';
// import CSecurityGroup from '@/components/Logic/CSecurityGroup';
import CSecOpt from '@/components/Logic/CSecurityGroup/CSecOpt';
import DiskConfiguration from './DiskConfiguration';
import {  Input, Select, Cascader } from 'antd';

const AddServer = (): JSX.Element => {
    const { Option } = Select;
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
    const instances = [
        {
            'InstanceType': 'c5.4xlarge',
            'Memory': 32,
            'Network': 'Up to 10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 496.40000000000003
            },
            'VCpu': 16
        },
        {
            'InstanceType': 'c5.xlarge',
            'Memory': 8,
            'Network': 'Up to 10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 124.10000000000001
            },
            'VCpu': 4
        },
        {
            'InstanceType': 'c5.12xlarge',
            'Memory': 96,
            'Network': '12 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 1489.2
            },
            'VCpu': 48
        },
        {
            'InstanceType': 'c5.24xlarge',
            'Memory': 192,
            'Network': '25 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 2978.4
            },
            'VCpu': 96
        },
        {
            'InstanceType': 'c5.9xlarge',
            'Memory': 72,
            'Network': '10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 1116.9
            },
            'VCpu': 36
        },
        {
            'InstanceType': 'c5.metal',
            'Memory': 192,
            'Network': '25 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 2978.4
            },
            'VCpu': 96
        },
        {
            'InstanceType': 'c5.large',
            'Memory': 4,
            'Network': 'Up to 10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 62.050000000000004
            },
            'VCpu': 2
        },
        {
            'InstanceType': 'c5.2xlarge',
            'Memory': 16,
            'Network': 'Up to 10 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 248.20000000000002
            },
            'VCpu': 8
        },
        {
            'InstanceType': 'c5.18xlarge',
            'Memory': 144,
            'Network': '25 Gigabit',
            'Price': {
                'currency': 'USD',
                'value': 2233.8
            },
            'VCpu': 72
        }
    ];
    const sgs = [
        {
            'sgDes': 'default VPC security group',
            'sgId': 'sg-0a818f9a74c0657ad',
            'tagName': 'easyun-sg-default'
        },
        {
            'sgDes': 'allow web application access',
            'sgId': 'sg-02f0f5390e1cba746',
            'tagName': 'easyun-sg-webapp'
        },
        {
            'sgDes': 'allow database access',
            'sgId': 'sg-05df5c8e8396d06e9',
            'tagName': 'easyun-sg-database'
        }
    ];
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
                <div className={classnames('flex', 'flex-row','items-center','p-3', 'm-3')}>
                    <div> select a platform </div>
                    <CButton classes={classnames(
                        'bg-yellow-550',
                        'text-white',
                        'rounded-3xl',
                        'h-10',
                        'w-32',
                        'px-5',
                        'm-5')}>64-bit(x86)</CButton>
                    <CButton classes={classnames(
                        'bg-yellow-550',
                        'text-white',
                        'rounded-3xl',
                        'h-10',
                        'w-32',
                        'px-5',
                        'm-5')}>64-bit(arm)</CButton>
                </div>
                <CPlatform/>
            </div>

            <CAmis />

            <div id="select-your-instance">
                <div>select your instance type</div>
                <Cascader style={{ width: '20%' }} options={options} placeholder="选择实例类型" />
            </div>
            <div>select your disk</div>
            <DiskConfiguration />

            <div id="select-security-group">
                <CSecOpt />
            </div>

            <div id="select-networking">

            </div>

            <div id="select-SSH-keys">

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