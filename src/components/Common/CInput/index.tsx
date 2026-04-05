import clsx from 'clsx';
import React, { RefObject } from 'react';

interface Props {
    classes?: string;
    type: string;
    label?: string;
	ref:RefObject<HTMLInputElement>;
    placeholder?: string;
    autofocus: boolean;
}

export const CInput = (props: Props): JSX.Element => {
    const classes = "w-11/12 h-12 border border-gray-400 rounded m-2 p-5";
    const label = "mx-2 mt-5";
    return (
        <div>
            {
                props.label ? <div className={label}>{props.label}</div> : null
            }
            <input type={props.type}
                ref={props.ref}
                placeholder={props.placeholder}
                autoFocus={props.autofocus}
                className={clsx(classes, props.classes)}/>
        </div>

    );
};

CInput.defaultProps = {
    type: 'text',
    autofocus: false,
};