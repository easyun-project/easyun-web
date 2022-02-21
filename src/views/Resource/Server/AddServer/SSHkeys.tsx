import React from 'react';
import { Radio,message } from 'antd';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
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
        message.warning(selected);
    };
    return (
        <Radio.Group
            onChange={e => {
                setSelected(e.target.value);
                changeSelectedKey(e.target.value);}}>
            <div className={classnames('flex','flex-col')}>
                {keyPairs.map((keyPair)=>
                    <Radio key={keyPair.key_name} value={keyPair.key_name}>
                        <div key={keyPair.id}
                            className={classnames(
                                'flex',
                                'items-center',
                                'justify-between',
                                'border-b-2',
                            )}>
                            <div className={classnames(
                                'flex',
                                'w-96'
                            )}>
                                <Icon fr={undefined}
                                    className={classnames(
                                        'mr-2'
                                    )}
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
                                className={classnames(
                                    'flex',
                                    'text-yellow-550'
                                )}
                            >
                                <span>Download</span>
                                <Icon fr={undefined}
                                    onClick={downloadSSHItem}
                                    className={classnames(
                                        'ml-2',
                                        'mr-10'
                                    )}
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


