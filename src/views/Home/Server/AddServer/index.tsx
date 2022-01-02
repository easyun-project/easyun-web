import React from 'react';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import CPlatform from '@/components/Logic/CPlatform';
import { CButton } from '@/components/Common/CButton';

const AddServer = (): JSX.Element => {
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

            <div id="select-your-ami">

            </div>

        </div>
    );
};


export default AddServer;