import React from 'react';
import { Card,Space,Radio,message } from 'antd';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { TablePaginationConfig } from 'antd';


export interface KeyInfo {
    keyName: string
    pemUrl:string
}


const s = { page: false as object };


interface SSHkeysProps {
    keyPairs: KeyInfo[]
    changeSelectedKey: React.Dispatch<React.SetStateAction<string>>
}

export default function SSHkeys(props: SSHkeysProps): JSX.Element {

    // const { keyPairs, changeSelectedKey } = props;
    // 由于现在keypairs是空的，所以现在写一个测试值
    const { changeSelectedKey } = props;
    const keyPairs = [{
        keyName: 'test1',
        pemUrl:'test1'
    },{
        keyName: 'test2',
        pemUrl:'test2'
    }];
    const [selected, setSelected] = useState(keyPairs[0].keyName);
    // changeSelectedKey(selected);

    const downloadSSHItem = () => {
        message.warning(selected);
    };
    return (
        <Card className="card-item" title="SSH keys" style={{ width: '100%' }}>
            <div className="flex-align-center yellow-text-color">
            </div>
            <Radio.Group
                onChange={e => {
                    setSelected(e.target.value);
                    changeSelectedKey(e.target.value);}}
                defaultValue={keyPairs[0].keyName}>
                <Space direction="vertical">
                    {keyPairs.map((keyPair)=>
                        <Radio key={keyPair.keyName} value={keyPair.keyName}>
                            <div className="sshkey-radio-row">
                                <div>{keyPair.keyName}</div>
                                <div className="flex-center">
                                    <div
                                        className="text-icon-box margin-right-10"
                                        onClick={downloadSSHItem}
                                    >
                                        <div>Download</div>
                                        <Icon
                                            icon="ant-design:download-outlined"
                                            fr={undefined}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Radio>)}
                </Space>
            </Radio.Group>
        </Card>
    );
}


