import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Button } from 'antd';


export interface CButtonProps {
    children;
    classes?: TTailwindString;
    click?: () => void;
    disabled?: boolean;
    type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
    htmlType?: 'button' | 'submit' | 'reset' | undefined
}

export const CButton = (props: CButtonProps): JSX.Element => {
    return <Button
        disabled={props.disabled}
        type={props.type}
        htmlType={props.htmlType}
        onClick={props.click}
        className={classnames(props.classes, 'rounded-2xl', 'w-32', 'h-9', 'mx-5')}>
        {props.children}
    </Button>;
};