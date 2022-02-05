import React, { useEffect, useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';

export interface RightData {
    key: string
    icon?: {
        name: string,
        color: string
    },
    label: string
    value: string | number | null
}

export interface GraphicalData {
    leftData: {
        key: string,
        value: string | number | null,
        unit: string
    },
    rightData: Array<RightData>
}

interface PropsType {
    type?: string
    cardTitle?: string,
    showIcon?: boolean,
    content: any | GraphicalData
}

export const DashCard = (props): JSX.Element => {
    const { cardTitle, content, type, showIcon } = props;
    const [titleHeight, setTitleHeight] = useState('');

    useEffect(() => {
        getTitleHeight();
    }, []);

    const getTitleHeight = () => {
        let tHeight = '100%';
        if (cardTitle) {
            const titleDom = document.getElementById('cardTitle');
            tHeight = `100% - ${titleDom?.offsetHeight}px`;
        }
        setTitleHeight(tHeight);
    };

    return (
        <div className={classnames('rounded-md', 'border', 'border-gray-300')}>
            {cardTitle &&
                  <div id='cardTitle' className={classnames('border-b', 'border-gray-300', 'p-2')}>
                      <p className={classnames('font-bold', 'text-xl')}>{cardTitle}</p>
                  </div>
            }
            {type === 'Graphical' ?
                <div className={classnames('grid', 'grid-cols-2')} style={{ height: `calc(${titleHeight})` }}>
                    <div
                        className={classnames('p-2', 'text-center', 'flex', 'flex-col', 'justify-center', 'border-r')}>
                        <div className={classnames('text-5xl', 'font-medium')}>{content['leftData']['value']}</div>
                        <div className={classnames('text-xl')}>{content['leftData']['unit']}</div>
                    </div>
                    <div className={classnames('p-6', 'text-base')}>
                        {
                            content['rightData'].map((item, index) => (
                                <div key={index} className={classnames('grid', 'grid-cols-3','items-center')}>
                                    <div className={classnames('flex', 'items-center', 'col-span-2')}>
                                        {showIcon &&
                                              <div className={classnames('w-1/4')}>
                                                  <Icon icon={item.icon?.name} color={item.icon?.color} width='20'
                                                      height='20'/>
                                              </div>
                                        }
                                        <div>{item.label}:</div>
                                    </div>
                                    <div>{item.value}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                :
                <div className={classnames('p-2', 'h-60', 'overflow-auto')}>
                    {content}
                </div>
            }

        </div>
    );
}
;
