import { DashCard } from '@/components/DashboardCommon/DashCard';
import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { HealthType } from '@/views/Dashboard/dashboard';

type PropsType = {
    health: HealthType;
}

export const DashboardsHealthCard = (props: PropsType): JSX.Element => {
    const { health } = props;

    /**
     * 首行数据healthy面板展示
     */
    const healthyView = () => {
        return <div className={classnames('grid', 'grid-cols-2', 'h-full')}>
            <div className={classnames('text-base')}>
                <div className={classnames('text-lg', 'font-bold')}>Alarms:</div>
                <div className="Alarms">
                    <div className={classnames('flex', 'items-center', 'text-red-600')}>
                        <Icon
                            icon="bi:exclamation-triangle"
                            width="20"
                            height="20"
                            fr={undefined}
                        />
                        <span className={classnames('pl-1')}>In alarm({health.alarms.iaNum})</span>
                    </div>
                    <div className={classnames('flex', 'items-center', 'text-gray-400')}>
                        <Icon
                            icon="ic:outline-more"
                            width="20"
                            height="20"
                            rotate={2}
                            fr={undefined}
                        />
                        <span className={classnames('pl-1')}>Insufficient data({health.alarms.isNum})</span>
                    </div>
                    <div className={classnames('flex', 'items-center', 'text-green-600')}>
                        <Icon
                            icon="bi:check-circle"
                            width="20"
                            height="20"
                            fr={undefined}
                        />
                        <span className={classnames('pl-1')}>OK({health.alarms.okNum})</span>
                    </div>
                </div>
            </div>
            <div className={classnames('text-base')}>
                <div className={classnames('text-lg', 'font-bold')}>
                    CloudWatch Dashboards(<span className={'font-normal'}>Favorite</span>):
                </div>
                <ul className="CloudWatch">
                    {health.dashboards.map((item, index) => (
                        <li key={index} onClick={() => goView(item.url)}>
                            <div className={classnames('py-1', 'text-blue-400')}>
                                <span>{item.title}</span>
                                <Icon
                                    className={classnames('inline')}
                                    icon="akar-icons:link-out"
                                    width="20"
                                    height="20"
                                    fr={undefined}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>;
    };

    /**
     * 跳转外部链接
     * @param url
     */
    const goView = (url) => {
        window.location.href = url;
    };

    return (
        <DashCard height={'h-60'} cardTitle={'healthy Summary'} content={healthyView()}/>
    );
};
