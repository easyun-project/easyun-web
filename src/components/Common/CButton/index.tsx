import clsx from 'clsx';
import React from 'react';
import { Button } from 'antd';


export interface CButtonProps {
    children;
    classes?: string;
    click?: () => void;
    disabled?: boolean;
    type?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
    htmlType?: 'button' | 'submit' | 'reset' | undefined
}

export const CButton = (props: CButtonProps): JSX.Element => {
    return <Button
        disabled={props.disabled}
        type={props.type}
        htmlType={props.htmlType}
        onClick={props.click}
        className={clsx(props.classes, 'rounded-2xl', 'w-32', 'h-9', 'mx-5')}>
        {props.children}
    </Button>;
};