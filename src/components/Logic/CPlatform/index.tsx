import React, { useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';

type PlatformType = 'linux' | 'windows' | 'macos'

const CPlatform = (): JSX.Element => {
    const [selected, setSelect] = useState('linux');

    const handleSelect = (platform: PlatformType): void => {
        setSelect(platform);
        return;
    };
    const selectedStyle = classnames('border-2','border-yellow-550');

    const containerClasses = classnames('cursor-pointer', 'inline-flex', 'items-center', 'w-32', 'm-5', 'grid', 'grid-cols-2');
    // if (selected === '') {
    //
    // }

    return (
        <div className={classnames('flex','flex-row')}>
            <div
                onClick={() => {
                    handleSelect('linux');
                }}
                className={classnames(containerClasses,selected === 'linux' ? selectedStyle : undefined)}>
                <Icon icon="logos:linux-tux" width="50" height="50" fr={undefined}/>
                <span>Linux/Unix</span>
            </div>

            <div
                onClick={() => {
                    handleSelect('windows');
                }}
                className={classnames(containerClasses,selected === 'windows' ? selectedStyle : undefined)}>
                <Icon icon="logos:microsoft-windows" width="50" height="50"
                    fr={undefined}/>
                <span>Microsoft<br/> Windows</span>
            </div>
            {/* <div
                onClick={() => {
                    handleSelect('macos');
                }}
                className={classnames(containerClasses)}>
                <Icon icon="wpf:mac-os" width="50" height="50" fr={undefined}/>
                <span>Macos</span>
            </div> */}



        </div>
    );

};


export default CPlatform;