import { toast } from 'sonner';
import React from 'react';
import { Radio } from 'antd';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { IsshkeyItem } from '@/constant/awsInfo';
// import { TablePaginationConfig } from 'antd';

export type KeyInfo = IsshkeyItem

interface SSHkeysProps {
    keyPairs: KeyInfo[]
    changeSelectedKey: React.Dispatch<React.SetStateAction<string>>
}

export default function SSHkeys(props: SSHkeysProps): JSX.Element {
    const { changeSelectedKey, keyPairs } = props;
    const [selected, setSelected] = useState('');
    // changeSelectedKey(selected);

    const downloadSSHItem = () => {
        toast.warning(selected);
    };
    return (
        <Radio.Group
            onChange={e => {
                setSelected(e.target.value);
                changeSelectedKey(e.target.value);}}>
            <div className={"flex flex-col"}>
                {keyPairs.map((keyPair)=>
                    <Radio key={keyPair.key_name} value={keyPair.key_name}>
                        <div key={keyPair.id}
                            className={"flex items-center justify-between border-b-2"}>
                            <div className={"flex w-96"}>
                                <Icon fr={undefined}
                                    className={"mr-2"}
                                    icon="codicon:key"
                                    width="18"
                                    height="18"
                                    color='#dd6b10'
                                    rotate={3}
                                    display='inline'
                                />
                                <span>{keyPair.key_name}</span>
                            </div>
                            <div
                                className={"flex text-yellow-550"}
                            >
                                <span>Download</span>
                                <Icon fr={undefined}
                                    onClick={downloadSSHItem}
                                    className={"ml-2 mr-10"}
                                    icon="entypo:download"
                                    width="18"
                                    height="18"
                                    display='inline'
                                />
                            </div>
                        </div>
                    </Radio>)}</div>
        </Radio.Group>
    );
}