import { toast } from 'sonner';
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { IsshkeyItem } from '@/constant/awsInfo';

export type KeyInfo = IsshkeyItem;

interface SSHkeysProps {
    keyPairs: KeyInfo[];
    changeSelectedKey: React.Dispatch<React.SetStateAction<string>>;
}

export default function SSHkeys({ changeSelectedKey, keyPairs }: SSHkeysProps): JSX.Element {
    const [selected, setSelected] = useState('');
    const downloadSSHItem = () => { toast.warning(selected); };

    return (
        <div className="flex flex-col">
            {keyPairs.map((keyPair) => (
                <label key={keyPair.key_name} className="flex items-center justify-between border-b-2 cursor-pointer py-1">
                    <div className="flex items-center w-96">
                        <input type="radio" name="sshkey" value={keyPair.key_name}
                            checked={selected === keyPair.key_name}
                            onChange={e => { setSelected(e.target.value); changeSelectedKey(e.target.value); }}
                            className="mr-2" />
                        <Icon icon="codicon:key" width="18" height="18" color="#dd6b10" rotate={3} fr={undefined} className="mr-2" />
                        <span>{keyPair.key_name}</span>
                    </div>
                    <div className="flex text-yellow-550">
                        <span>Download</span>
                        <Icon icon="entypo:download" width="18" height="18" fr={undefined}
                            onClick={downloadSSHItem} className="ml-2 mr-10 cursor-pointer" />
                    </div>
                </label>
            ))}
        </div>
    );
}
