import clsx from 'clsx';
import React from 'react';

export interface CLinkProps {
	children: string;
	classes?: string;
	url: string;
	hasBorder: boolean;
	newWindow: boolean;
}

export const CLink = (props: CLinkProps): JSX.Element => {
    const borderClasses = "border border-solid border-gray-300";
    let classes = "rounded-2xl text-sm px-2 py-1.5 no-underline";
    if (props.hasBorder) {
        classes = clsx(borderClasses, classes);
    }
    return <a
        href={props.url}
        target={props.newWindow ? '_blank' : '_self'}
        className={classes} rel="noreferrer">
        {props.children}
    </a>;
};

CLink.defaultProps = {
    newWindow: true,
    hasBorder: false
};