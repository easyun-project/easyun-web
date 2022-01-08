import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
export interface PropsType {
	dataConfig: dataConfigType;
}

export interface dataConfigType {
	title: string;
	leftData: {
		title: string;
		listData: listType[];
	};
	rightData: {
		title: string;
		listData: listType[];
	};
}
export interface listType {
	icon: string;
	label?: string;
	value: number | string;
}
export const DashCard = (props: PropsType): JSX.Element => {
    const navigate = useNavigate();
    const { title } = props.dataConfig;
    const { leftData } = props.dataConfig;
    const { rightData } = props.dataConfig;
    const iconCircle = (name: string, color: string): JSX.Element => (
        <span>
            <Icon icon={name} color={color} width='20' height='20' fr={undefined} />
        </span>
    );

    return (
        <div className={classnames('w-auto', 'mx-3', 'my-2', 'inline-block', 'border', 'rounded', 'shadow', 'min-w-0', 'ml-10', 'flex-1', 'min-w-30')}>
            <div className={classnames('border-b', 'text-left', 'p-1.5', 'pl-4')}>{title}</div>
            <div className={classnames('flex', 'min-h-20')}>
                <div className={classnames('w-1/2', 'text-left', 'min-h-0', 'p-4')}>
                    <div className={classnames('mb-4')}>{leftData.title}</div>
                    {leftData.listData.map((item, index) => (
                        <div key={index} className={classnames('flex', 'items-center', 'ml-4', 'my-4')} onClick={() => navigate('/home')}>
                            {iconCircle(item.icon, 'red')}
                            <span className={classnames('pl-2')}>{item.label}</span>
                            <span className={classnames('pl-2')}>( {item.value} )</span>
                        </div>
                    ))}
                </div>
                <div className={classnames('w-1/2', 'text-left', 'p-4')}>
                    <div className={classnames('mb-4')}>{rightData.title}</div>
                    {rightData.listData.map((item, index) => (
                        <div key={index} className={classnames('flex', 'items-center', 'cursor-pointer')}>
                            <span className='dot-5'></span>
                            <span className={classnames('px-2', 'underline', 'text-blue-500')}>{item.value}</span>
                            {iconCircle(item.icon, 'rgba(59, 130, 246, 1)')}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
