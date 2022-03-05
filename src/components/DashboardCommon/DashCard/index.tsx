import React, { useEffect, useState } from 'react';
import { classnames, TClasses, THeight, TKey } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';

export type RightUnitValue = {
    unit: string,
    value: string | number | null
}

export interface RightData {
    key: string
    icon?: {
        name: string,
        color: string
    },
    label: string
    value: RightUnitValue | string | number | null
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
    type?: string,
    cardTitle?: string,
    showIcon?: boolean,
    height?: THeight,
    content: any | GraphicalData
}

export const DashCard = (props: PropsType): JSX.Element => {
    const { cardTitle, content, type, showIcon, height } = props;
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
                                <div key={index} className={classnames('grid', 'grid-cols-3', 'items-center')}>
                                    <div className={classnames('flex', 'items-center', 'col-span-2')}>
                                        {showIcon &&
                                              <div className={classnames('w-1/4')}>
                                                  <Icon icon={item.icon?.name} color={item.icon?.color} width='20'
                                                      height='20'/>
                                              </div>
                                        }
                                        <div>{item.label}:</div>
                                    </div>
                                    {
                                        // 判断是否为携带单位对象
                                        item['value'] instanceof Object ?
                                            <div>
                                                <span>{item['value']['value']}</span>{' ' + item['value']['unit']}
                                            </div>
                                            : <div><span>{item['value']}</span></div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                :
            // <div className={classnames('p-2', 'overflow-auto', {height? height : 'h-60'})}>
                <div className={`p-2 overflow-auto ${height}`}>
                    {content}
                </div>
            }

        </div>
    );
}
;
