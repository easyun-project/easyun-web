import React, { useEffect, useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import serverService from '@/service/serverService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { InsTypeFamily } from '../AddServer';
import { Cascader, message } from 'antd';
import { InsType } from '../AddServer/InstanceList';
import { Skeleton } from 'antd';
import { getServerDetail } from '@/redux/serverSlice';
import CWarn from '@/components/Common/CWarn';

type Option = {
    value: string
    label: string
    children: {
        value: string
        label: string,
    }[],
}[]

export default function Config() {
    const dispatch = useDispatch();
    // const arr = [
    //     {
    //         'insType': 'm5.24xlarge',
    //         'memSize': 384,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 3363.8399999999997
    //         },
    //         'netSpeed': '25 Gigabit',
    //         'vcpuNum': 96
    //     },
    //     {
    //         'insType': 'm5.8xlarge',
    //         'memSize': 128,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 1121.28
    //         },
    //         'netSpeed': '10 Gigabit',
    //         'vcpuNum': 32
    //     },
    //     {
    //         'insType': 'm5.12xlarge',
    //         'memSize': 192,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 1681.9199999999998
    //         },
    //         'netSpeed': '10 Gigabit',
    //         'vcpuNum': 48
    //     },
    //     {
    //         'insType': 'm5.metal',
    //         'memSize': 384,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 3363.8399999999997
    //         },
    //         'netSpeed': '25 Gigabit',
    //         'vcpuNum': 96
    //     },
    //     {
    //         'insType': 'm5.xlarge',
    //         'memSize': 16,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 140.16
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 4
    //     },
    //     {
    //         'insType': 'm5.4xlarge',
    //         'memSize': 64,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 560.64
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 16
    //     },
    //     {
    //         'insType': 'm5.2xlarge',
    //         'memSize': 32,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 280.32
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 8
    //     },
    //     {
    //         'insType': 'm5.large',
    //         'memSize': 8,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 70.08
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 2
    //     },
    //     {
    //         'insType': 'm5.large',
    //         'memSize': 8,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 70.08
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 2
    //     },
    //     {
    //         'insType': 'm5.large',
    //         'memSize': 8,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 70.08
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 2
    //     },
    //     {
    //         'insType': 'm5.large',
    //         'memSize': 8,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 70.08
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 2
    //     },
    //     {
    //         'insType': 'm5.large',
    //         'memSize': 8,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 70.08
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 2
    //     },
    //     {
    //         'insType': 'm5.large',
    //         'memSize': 8,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 70.08
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 2
    //     },
    //     {
    //         'insType': 'm5.large',
    //         'memSize': 8,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 70.08
    //         },
    //         'netSpeed': 'Up to 10 Gigabit',
    //         'vcpuNum': 2
    //     },
    //     {
    //         'insType': 'm5.16xlarge',
    //         'memSize': 256,
    //         'monthPrice': {
    //             'currency': 'USD',
    //             'value': 2242.56
    //         },
    //         'netSpeed': '20 Gigabit',
    //         'vcpuNum': 64
    //     }
    // ];
    const [selectedConfig, changeSelectedConfig] = useState(0);
    const currentInstype = useSelector((state: RootState) => state.server.currentServer!.svrProperty.instanceType.split('.')[0]);
    const instanceId = useSelector((state: RootState) => state.server.currentServer!.svrProperty.instanceId);
    // instype family
    const [insfamilyOptions, changeInsfamilyOptions] = useState<Option>();
    const [insFamily, changeInsFamily] = useState(currentInstype);
    const [insTypes, changeInsTypes] = useState<'loading' | InsType[]>('loading');
    const arch = useSelector((state: RootState) => state.server.currentServer!.svrConfig.arch as 'x86_64' | 'arm64' | 'unknown');
    const dc = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const os = useSelector((state: RootState) => state.server.currentServer?.svrConfig.os as 'windows' | 'linux');
    // 获取可选的instypefamily
    useEffect(() => {
        if (arch !== 'unknown') {
            serverService.getServerInsfamily({
                arch,
                dc
            }).then(res => generateOptions(res));
        }

    }, []);
    // 获取可选的instypes
    useEffect(() => {
        if (arch !== 'unknown') {
            changeInsTypes('loading');
            serverService.getServerInstypes({
                arch,
                os: os,
                family: insFamily.toLowerCase(),
                dc
            }).then(res => changeInsTypes(res));
        }
    }, [ insFamily ]);
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
    if (arch === 'unknown') return (
        <CWarn>
            <div className='font-semibold'>Architecture of this instance is unknown.</div>
        </CWarn>
    );
    else {
        return (
            <>
                <div><span className={classnames('mx-2')}>instance type</span>
                    <Cascader style={{ width: '15%' }} options={insfamilyOptions} placeholder="选择实例类型"
                        onChange={(e) => {
                            if (e[1]) { changeInsFamily(e[1] as string); }
                        }} changeOnSelect />
                </div>
                {insTypes === 'loading'
                    ? <Skeleton active paragraph={{ rows: 8 }} />
                    : <div className={classnames('grid', 'grid-rows-1', 'grid-flow-col', 'auto-cols-min', '2xl:w-1/2', 'm-8', 'overflow-x-auto')}>
                        {/* <button className={classnames('btn-yellow')} onClick={()=>scrollBy({
                    top: 20,
                    left: -20,
                    behavior: 'smooth'
                })}>123</button> */}
                        {insTypes.map((i, index) =>
                            <div className={classnames('flex', 'flex-col', 'w-32')} key={index}>
                                {selectedConfig === index
                                    ? <div className={classnames('flex', 'h-4', 'items-center', 'justify-center')}>
                                        <Icon fr={undefined}
                                            icon="icons8:cancel"
                                            className={classnames('mx-1', 'cursor-pointer')}
                                            width="24" height="24"
                                            color='red'
                                            onClick={() => changeSelectedConfig(-1)} />
                                        <Icon fr={undefined}
                                            icon="icons8:checked"
                                            className={classnames('mx-1', 'cursor-pointer')}
                                            width="24" height="24"
                                            color="green"
                                            onClick={() => {
                                                serverService.changeServerConfig({
                                                    ins_type: insTypes[selectedConfig].insType,
                                                    svr_ids: [instanceId]
                                                }).then(
                                                    () => {
                                                        message.success('修改成功!');
                                                        dispatch(getServerDetail({ serverId: instanceId }));
                                                    }
                                                );
                                            }} />
                                    </div>
                                    : <div className={classnames('h-4')} />}

                                <button className={selectedConfig === index
                                    ? classnames('h-20', 'mx-6', 'my-2', 'rounded-border', 'ring', 'ring-yellow-550', 'ring-offset-2', 'bg-yellow-550', 'text-white', 'font-bold')
                                    : classnames('h-20', 'mx-6', 'my-2', 'rounded-border', 'border-yellow-550', 'font-bold')}
                                onClick={() => changeSelectedConfig(index)}>{i.insType}</button>
                                <div className={classnames('text-center', 'border-b-2')}>{i.insType}</div>
                                <div className={classnames('text-center', 'border-b-2')}>{i.vcpuNum} vCPU</div>
                                <div className={classnames('text-center', 'border-b-2')}>{i.memSize} GiB</div>
                                <div className={classnames('text-center', 'border-b-2')}>{i.netSpeed}</div>
                                <div className={classnames('text-center', 'border-b-2')}>{i.monthPrice.value.toFixed(2)} {i.monthPrice.currency} </div>

                            </div>)}
                        <div className={classnames('flex', 'flex-col', 'w-32', 'sticky', 'right-0', 'bg-white')}>
                            {/* 以下这个段落用于兼容确认模组和选择框 */}
                            <div className={classnames('h-16', 'm-6')} />
                            <div className={classnames('text-center', 'font-bold', 'border-b-2', 'border-l-2')}>Type</div>
                            <div className={classnames('text-center', 'font-bold', 'border-b-2', 'border-l-2')}>Process</div>
                            <div className={classnames('text-center', 'font-bold', 'border-b-2', 'border-l-2')}>Memory</div>
                            <div className={classnames('text-center', 'font-bold', 'border-b-2', 'border-l-2')}>Network</div>
                            <div className={classnames('text-center', 'font-bold', 'border-b-2', 'border-l-2')}>Price</div>
                        </div>
                    </div>}
            </>
        );
    }
}
