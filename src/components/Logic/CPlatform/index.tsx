import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';

interface platformProps{
    platform :string
    changePlatform: React.Dispatch<React.SetStateAction<'linux'|'windows'>>
}

type PlatformType = 'linux' | 'windows'

const CPlatform = (props:platformProps): JSX.Element => {
    // const [selected, setSelect] = useState('linux');
    const { platform, changePlatform } = props;

    const handleSelect = (platform: PlatformType): void => {
        changePlatform(platform);
        return;
    };
    const selectedStyle = "rounded-border border-yellow-550";

    const containerClasses = "cursor-pointer items-center w-32 mx-5 p-1 grid grid-cols-2";
    // if (selected === '') {
    //
    // }

    return (
        <div className={"flex items-center"}>
            <div> select your server os </div>
            <div
                onClick={() => {
                    handleSelect('linux');
                }}
                className={clsx(containerClasses,platform === 'linux' ? selectedStyle : undefined)}>
                <Icon icon="logos:linux-tux" width="50" height="50" fr={undefined}/>
                <span>Linux/Unix</span>
            </div>

            <div
                onClick={() => {
                    handleSelect('windows');
                }}
                className={clsx(containerClasses,platform === 'windows' ? selectedStyle : undefined)}>
                <Icon icon="logos:microsoft-windows" width="50" height="50"
                    fr={undefined}/>
                <span>Microsoft<br/> Windows</span>
            </div>
            {/* <div
                onClick={() => {
                    handleSelect('macos');
                }}
                className={clsx(containerClasses)}>
                <Icon icon="wpf:mac-os" width="50" height="50" fr={undefined}/>
                <span>Macos</span>
            </div> */}



        </div>
    );

};


export default CPlatform;