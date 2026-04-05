import { toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { postApiV1ServerAction, deleteApiV1Server, postApiV1ServerConfig, putApiV1ServerName, putApiV1ServerDisk, putApiV1ServerEip, putApiV1ServerSecgroup, getApiV1ServerParamImage, getApiV1ServerParamInstypeList, getApiV1ServerParamInsfamily, postApiV1Server, getApiV1ServerDetailBySvrId, deleteApiV1ServerTagsBySvrId, putApiV1ServerTagsBySvrId } from '@/api-client';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { InsTypeFamily } from '../AddServer';
import { Cascader } from 'antd';
import { InsType } from '../AddServer/InstanceList';
import { Skeleton } from 'antd';
import { getServerDetail } from '@/redux/serverSlice';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Option = {
    value: string
    label: string
    children: {
        value: string
        label: string,
    }[],
}[]

export default function Config() {
    const dispatch = useDispatch<AppDispatch>();
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
    const [ selectedConfig, changeSelectedConfig ] = useState(0);
    const currentInstype = useSelector((state: RootState) => state.server.currentServer!.svrProperty.instanceType.split('.')[0]);
    const instanceId = useSelector((state: RootState) => state.server.currentServer!.svrProperty.instanceId);
    // instype family
    const [ insfamilyOptions, changeInsfamilyOptions ] = useState<Option>();
    const [ insFamily, changeInsFamily ] = useState(currentInstype);
    const [ insTypes, changeInsTypes ] = useState<'loading' | InsType[]>('loading');
    const arch = useSelector((state: RootState) => state.server.currentServer!.svrConfig.arch as 'x86_64' | 'arm64' | 'unknown');
    const dc = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
    const os = useSelector((state: RootState) => state.server.currentServer?.svrConfig.os as 'windows' | 'linux');
    // 获取可选的instypefamily
    useEffect(() => {
        if (arch !== 'unknown') {
            getApiV1ServerParamInsfamily({ query: {
                arch,
                dc
            } as any }).then(({ data }) => { const res = data?.detail as any; return res; }).then((res) => generateOptions(res));
        }

    }, []);
    // 获取可选的instypes
    useEffect(() => {
        if (arch !== 'unknown') {
            changeInsTypes('loading');
            getApiV1ServerParamInstypeList({ query: {
                arch,
                os: os,
                family: insFamily.toLowerCase(),
                dc
            } as any }).then(({ data }) => changeInsTypes(data?.detail as any));
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
        <Alert variant="destructive" className="w-max">
            <AlertDescription className='font-semibold'>Architecture of this instance is unknown.</AlertDescription>
        </Alert>
    );
    else {
        return (
            <>
                <div><span className={"mx-2"}>instance type</span>
                    <Cascader style={{ width: '15%' }} options={insfamilyOptions} placeholder="选择实例类型"
                        onChange={(e) => {
                            if (e[1]) { changeInsFamily(e[1] as string); }
                        }} changeOnSelect />
                </div>
                {insTypes === 'loading'
                    ? <Skeleton active paragraph={{ rows: 8 }} />
                    : <div className={"grid grid-rows-1 grid-flow-col auto-cols-min 2xl:w-1/2 m-8 overflow-x-auto"}>
                        {/* <button className={"btn-yellow"} onClick={()=>scrollBy({
                    top: 20,
                    left: -20,
                    behavior: 'smooth'
                })}>123</button> */}
                        {insTypes.map((i, index) =>
                            <div className={"flex flex-col w-32"} key={index}>
                                {selectedConfig === index
                                    ? <div className={"flex h-4 items-center justify-center"}>
                                        <Icon fr={undefined}
                                            icon="icons8:cancel"
                                            className={"mx-1 cursor-pointer"}
                                            width="24" height="24"
                                            color='red'
                                            onClick={() => changeSelectedConfig(-1)} />
                                        <Icon fr={undefined}
                                            icon="icons8:checked"
                                            className={"mx-1 cursor-pointer"}
                                            width="24" height="24"
                                            color="green"
                                            onClick={() => {
                                                postApiV1ServerConfig({ body: {
                                                    ins_type: insTypes[selectedConfig].insType,
                                                    svr_ids: [ instanceId ]
                                                } as any }).then(
                                                    () => {
                                                        toast.success('修改成功!');
                                                        dispatch(getServerDetail({ serverId: instanceId }));
                                                    }
                                                );
                                            }} />
                                    </div>
                                    : <div className={"h-4"} />}

                                <button className={selectedConfig === index
                                    ? "h-20 mx-6 my-2 rounded-border ring ring-yellow-550 ring-offset-2 bg-yellow-550 text-white font-bold"
                                    : "h-20 mx-6 my-2 rounded-border border-yellow-550 font-bold"}
                                onClick={() => changeSelectedConfig(index)}>{i.insType}</button>
                                <div className={"text-center border-b-2"}>{i.insType}</div>
                                <div className={"text-center border-b-2"}>{i.vcpuNum} vCPU</div>
                                <div className={"text-center border-b-2"}>{i.memSize} GiB</div>
                                <div className={"text-center border-b-2"}>{i.netSpeed}</div>
                                <div className={"text-center border-b-2"}>{i.monthPrice.value.toFixed(2)} {i.monthPrice.currency} </div>

                            </div>)}
                        <div className={"flex flex-col w-32 sticky right-0 bg-white"}>
                            {/* 以下这个段落用于兼容确认模组和选择框 */}
                            <div className={"h-16 m-6"} />
                            <div className={"text-center font-bold border-b-2 border-l-2"}>Type</div>
                            <div className={"text-center font-bold border-b-2 border-l-2"}>Process</div>
                            <div className={"text-center font-bold border-b-2 border-l-2"}>Memory</div>
                            <div className={"text-center font-bold border-b-2 border-l-2"}>Network</div>
                            <div className={"text-center font-bold border-b-2 border-l-2"}>Price</div>
                        </div>
                    </div>}
            </>
        );
    }
}
