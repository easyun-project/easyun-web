import React from 'react';
import { Modal } from 'antd';
import { Icon } from '@iconify/react';
import { MouseEventHandler } from 'react';

interface WithEditProps{
onOk?: MouseEventHandler,
onCancel?: MouseEventHandler,
visible?: boolean | undefined,
children?:JSX.Element | JSX.Element[]
}

export default function WithEdit(props:WithEditProps) {
    const { onOk,onCancel,visible,children } = props;
    return (
        visible
            ? <div className='flex'>
                <div className='p-2 active-border'>{children}</div>
                <div className='self-end'>
                    <Icon
                        icon="icons8:cancel"
                        className=  'mx-1 cursor-pointer'
                        width="24" height="24"
                        color='red'
                        onClick={onCancel}/>
                    <Icon
                        icon="icons8:checked"
                        className=  'mx-1 cursor-pointer'
                        width="24" height="24"
                        color="green"
                        onClick={onOk} />
                </div>
            </div>
            : <div className='p-2'>{children}</div>
    );
}
