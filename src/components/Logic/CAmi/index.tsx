import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';


export interface CAmiProps {
    children?;
    classes?: TTailwindString;
    click?: () => void;
    imgName: string;
    imgVersion: string;
    imgID: string,
    changeSelectedAmi:React.Dispatch<React.SetStateAction<string>>;
}

export const CAmi = (props: CAmiProps): JSX.Element => {
    const { imgID,imgName,changeSelectedAmi,imgVersion,classes } = props;
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
        <button className={classnames('flex','flex-row','items-center','m-3','w-56',classes)}
            onClick={()=>{changeSelectedAmi(imgID);}}>
            <Icon icon={`logos:${icons[imgName.split(' ')[0]]}`} width="30" fr={undefined}/>
            <div className={classnames('ml-3','text-left')}>
                <div className={classnames('text-black','font-semibold')}>{imgName}</div>
                <div className={classnames('text-gray-400')}>{imgVersion}</div>
            </div>
        </button>);
};


export interface amiInfo{
    'imgCode': string,
    'imgDescription': string,
    'imgID': string,
    'imgName': string,
    'imgVersion': string,
    'root_device_disk': {
        'DeleteOnTermination': boolean,
        'Encrypted': boolean,
        'SnapshotId': string,
        'VolumeSize': number,
        'VolumeType': string,
    },
    'root_device_name': string,
    'root_device_type': string,
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
            <div id="select-your-ami" >
            select your image(AMI)
                <div className={classnames('flex','flex-row','flex-wrap','items-center','m-3')}>
                    {amis.map((amiInfo)=><CAmi classes={selectedAmi === amiInfo.imgID ? classnames('border-2','border-yellow-550') : undefined}
                        key={amiInfo.imgID} {...amiInfo} changeSelectedAmi={changeSelectedAmi}/>)}
                </div>
            </div>);
    }
};



export default CAmis;