import clsx from 'clsx';
import React from 'react';
import ReactLoading from 'react-loading';


export interface CPartialLoadingProps {
	type?: undefined,
	color?: string,
	classes?: string
}

export const CPartialLoading = (props: CPartialLoadingProps): JSX.Element => {
    const common = "flex w-full items-center justify-center";
    return <div className={clsx(common, props.classes)}>
        <ReactLoading
            type={props.type || 'spokes'}
            color={props.color || 'gray'}
        />
    </div>;
};