import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';

export default function Config() {
    const arr = [
        {
            'insType': 'm5.24xlarge',
            'memSize': 384,
            'monthPrice': {
                'currency': 'USD',
                'value': 3363.8399999999997
            },
            'netSpeed': '25 Gigabit',
            'vcpuNum': 96
        },
        {
            'insType': 'm5.8xlarge',
            'memSize': 128,
            'monthPrice': {
                'currency': 'USD',
                'value': 1121.28
            },
            'netSpeed': '10 Gigabit',
            'vcpuNum': 32
        },
        {
            'insType': 'm5.12xlarge',
            'memSize': 192,
            'monthPrice': {
                'currency': 'USD',
                'value': 1681.9199999999998
            },
            'netSpeed': '10 Gigabit',
            'vcpuNum': 48
        },
        {
            'insType': 'm5.metal',
            'memSize': 384,
            'monthPrice': {
                'currency': 'USD',
                'value': 3363.8399999999997
            },
            'netSpeed': '25 Gigabit',
            'vcpuNum': 96
        },
        {
            'insType': 'm5.xlarge',
            'memSize': 16,
            'monthPrice': {
                'currency': 'USD',
                'value': 140.16
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 4
        },
        {
            'insType': 'm5.4xlarge',
            'memSize': 64,
            'monthPrice': {
                'currency': 'USD',
                'value': 560.64
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 16
        },
        {
            'insType': 'm5.2xlarge',
            'memSize': 32,
            'monthPrice': {
                'currency': 'USD',
                'value': 280.32
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 8
        },
        {
            'insType': 'm5.large',
            'memSize': 8,
            'monthPrice': {
                'currency': 'USD',
                'value': 70.08
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 2
        },
        {
            'insType': 'm5.large',
            'memSize': 8,
            'monthPrice': {
                'currency': 'USD',
                'value': 70.08
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 2
        },
        {
            'insType': 'm5.large',
            'memSize': 8,
            'monthPrice': {
                'currency': 'USD',
                'value': 70.08
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 2
        },
        {
            'insType': 'm5.large',
            'memSize': 8,
            'monthPrice': {
                'currency': 'USD',
                'value': 70.08
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 2
        },
        {
            'insType': 'm5.large',
            'memSize': 8,
            'monthPrice': {
                'currency': 'USD',
                'value': 70.08
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 2
        },
        {
            'insType': 'm5.large',
            'memSize': 8,
            'monthPrice': {
                'currency': 'USD',
                'value': 70.08
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 2
        },
        {
            'insType': 'm5.large',
            'memSize': 8,
            'monthPrice': {
                'currency': 'USD',
                'value': 70.08
            },
            'netSpeed': 'Up to 10 Gigabit',
            'vcpuNum': 2
        },
        {
            'insType': 'm5.16xlarge',
            'memSize': 256,
            'monthPrice': {
                'currency': 'USD',
                'value': 2242.56
            },
            'netSpeed': '20 Gigabit',
            'vcpuNum': 64
        }
    ];
    return (
        <div className={classnames('grid','grid-rows-1','grid-flow-col','w-full','overflow-x-auto')}>
            <div className={classnames('flex','flex-col','w-32','sticky','left-0','bg-white')}>
                <div className={classnames('h-20','m-6')}></div>
                <div className={classnames('text-center','font-bold','border-b-2','border-r-2')}>Type</div>
                <div className={classnames('text-center','font-bold','border-b-2','border-r-2')}>Process</div>
                <div className={classnames('text-center','font-bold','border-b-2','border-r-2')}>Memory</div>
                <div className={classnames('text-center','font-bold','border-b-2','border-r-2')}>Network</div>
                <div className={classnames('text-center','font-bold','border-b-2','border-r-2')}>Price</div>
            </div>
            {arr.map((i,index)=>
                <div className={classnames('flex','flex-col','w-32')} key={index}>
                    <div className={classnames('h-20','m-6','active-border')}></div>
                    <div className={classnames('text-center','border-b-2')}>{i.insType}</div>
                    <div className={classnames('text-center','border-b-2')}>{i.vcpuNum} vCPU</div>
                    <div className={classnames('text-center','border-b-2')}>{i.memSize} GiB</div>
                    <div className={classnames('text-center','border-b-2')}>{i.netSpeed}</div>
                    <div className={classnames('text-center','border-b-2')}>{i.monthPrice.value.toFixed(2)} {i.monthPrice.currency} </div>
                </div>)}
        </div>
    );
}
