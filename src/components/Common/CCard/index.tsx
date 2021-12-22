import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';

export interface dataConfigType {
	title: string;
	leftData: {
		quantity: string | number;
		name: string;
		description: string;
	};
	rightData: rightDataType[];
}
export interface rightDataType {
	icon?: boolean | iconType;
	label: string;
	value: string | number;
}

export interface iconType {
	name: string;
	color: string;
}
export interface PropsType {
	dataConfig: dataConfigType;
}

export const CCard = (props: PropsType): JSX.Element => {
    const { title } = props.dataConfig;
    const { leftData } = props.dataConfig;
    const { rightData } = props.dataConfig;

    const iconCircle = (name: string, color: string): JSX.Element => (
        <span>
            <Icon icon={name} color={color} width='20' height='20' fr={undefined} />
        </span>
    );

    return (
        <div className={classnames('border', 'rounded', 'shadow', 'inline-block', 'mx-2', 'my-4', 'min-w-0', 'flex-1')} style={{ minWidth: '500px' }}>
            <div className={classnames('border-b', 'text-left', 'p-1.5', 'pl-4')}>{title}</div>
            <div className={classnames('flex', 'min-h-20')}>
                <div className={classnames('w-1/2', 'text-center', 'border-r', 'min-h-0', 'flex', 'items-center', 'justify-center', 'flex-col', 'p-4')}>
                    <div className={classnames('text-7xl')}>{leftData.quantity}</div>
                    <div className={classnames('text-xl')}>
                        <span>{leftData.name}</span>
                        <span>{leftData.description}</span>
                    </div>
                </div>
                {rightData.some(item => !!item.icon) ? (
                    <div className={classnames('w-1/2', 'text-center', 'p-4', 'text-base')}>
                        {rightData.map((item, index) => (
                            <div className={classnames('flex', 'justify-between', 'items-center')} key={index}>
                                {item.icon ? iconCircle(item.icon.name, item.icon.color) : iconCircle('akar-icons:circle-fill', 'transparent')}
                                <div className={classnames('flex', 'flex-1', 'justify-between', 'ml-1.5')}>
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={classnames('w-1/2', 'text-center', 'p-4', 'text-base')}>
                        {rightData.map((item, index) => {
                            return (
                                <div className={classnames('flex', 'justify-between', 'items-center')} key={index}>
                                    <div className={classnames('flex', 'flex-1', 'justify-between')}>
                                        <span>{item.label}</span>
                                        <span>{item.value}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
