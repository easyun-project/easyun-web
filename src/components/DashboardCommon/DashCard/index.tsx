import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';

export interface RightData {
    icon?: {
        name: string,
        color: string
    },
    label: string
    value: string | number
}

export interface GraphicalData {
    leftData: {
        value: string | number,
        unit: string
    },
    rightData: Array<RightData>
}

interface PropsType {
    type?: string
    cardTitle?: string,
    content: any | GraphicalData
}

export const DashCard = (props): JSX.Element => {
    const { cardTitle, content, type } = props;
    return (
        <div className={classnames('rounded-md', 'border', 'border-gray-300')}>
            {
                cardTitle &&
                <div className={classnames('border-b', 'border-gray-300', 'p-2')}>
                    <p className={classnames('font-bold', 'text-xl')}>{cardTitle}</p>
                </div>
            }
            {
                type === 'Graphical' ?
                    <div className={classnames('grid', 'grid-cols-2',)}>
                        <div className={classnames('p-2', 'border-r-2','text-center')}>
                            <div>{content['leftData']['value']}</div>
                            <div>{content['leftData']['unit']}</div>
                        </div>
                        <div className={classnames('p-2')}></div>
                    </div>
                    : <div className={classnames('p-2', 'h-60', 'overflow-auto')}>
                        {content}
                    </div>
            }

        </div>
    );
};
