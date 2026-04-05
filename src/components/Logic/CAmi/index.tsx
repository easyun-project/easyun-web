import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';


export interface CAmiProps {
    children?;
    classes?: string;
    click?: () => void;
    osName: string;
    osVersion: string;
    imgID: string,
    changeSelectedAmi:React.Dispatch<React.SetStateAction<string>>;
}

export const CAmi = (props: CAmiProps): JSX.Element => {
    const { imgID,osName,changeSelectedAmi,osVersion,classes } = props;
    // 通过imgName的第一个单词判断需要使用iconify:logos的哪个logo
    const icons = {
        'Debian':'debian',
        'Ubuntu':'ubuntu',
        'Red':'redhat-icon',
        'Cent':'centos-icon',
        'Amazon':'aws',
        'SUSE':'suse',
        'Windows':'microsoft-windows',
    };
    return(
        <button className={clsx('flex','items-center','p-2',classes)}
            onClick={()=>{changeSelectedAmi(imgID);}}>
            <Icon icon={`logos:${icons[osName.split(' ')[0]]}`} width="30" fr={undefined}/>
            <div className={"ml-3 text-left"}>
                <div className={"text-black font-semibold"}>{osName}</div>
                <div className={"text-gray-400"}>{osVersion}</div>
            </div>
        </button>);
};


export interface amiInfo{
    'osCode': string,
    'imgDescription': string,
    'imgID': string,
    'osName': string,
    'osVersion': string,
    'rootDevice': {
        'DeleteOnTermination': boolean,
        'Encrypted': boolean,
        'SnapshotId': string,
        'VolumeSize': number,
        'VolumeType': string,
    },
    'devicePath': string,
    'deviceType': string,
}

type CAmisProps = {amis:amiInfo[]|'loading',
changeSelectedAmi:React.Dispatch<React.SetStateAction<string>>,
selectedAmi:string}

const CAmis = (props:CAmisProps): JSX.Element => {
    const { amis,selectedAmi,changeSelectedAmi } = props;
    if (amis === 'loading'){return (
        <div id="select-your-ami" >
            images is loading
        </div>);
    }
    else{
        return (
            <div className={"grid grid-cols-5 gap-4 items-center"}>
                {amis.map((amiInfo)=><CAmi classes={selectedAmi === amiInfo.imgID ? "rounded-border border-yellow-550" : undefined}
                    key={amiInfo.imgID} {...amiInfo} changeSelectedAmi={changeSelectedAmi}/>)}
            </div>);
    }
};



export default CAmis;