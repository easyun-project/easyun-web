import React from 'react';
import { Icon } from '@iconify/react';

export default function CWarn({ children }: { children: JSX.Element | JSX.Element[] |undefined }) {
    return (
        <div className='flex items-center p-1 pr-10 my-2 w-max bg-amber-100 border-yellow-550 rounded-border'>
            <Icon icon="ant-design:warning-outlined" inline={true} className='mx-2 text-xl text-red-600'/>
            <span>
                {children}
            </span>
        </div>
    );
}
