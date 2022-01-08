import React from 'react';
import { Card,Space,Radio,message } from 'antd';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function SSHkeys():JSX.Element {
    const keyPairs = [
        {
            'keyName': 'key_easyun_dev1',
            'pemUrl': 'http://127.0.0.1:6660/download/keyname01'
        },
        {
            'keyName': 'key_easyun_user1',
            'pemUrl': 'http://127.0.0.1:6660/download/keyname02'
        },
        {
            'keyName': 'key_easyun_user2',
            'pemUrl': 'http://127.0.0.1:6660/download/keyname03'
        }
    ];
    const [selected, setSelected] = useState(keyPairs[0].keyName);
    const downloadSSHItem = () => {
        message.warning(selected);
    };
    return (
        <Card className="card-item" title="SSH keys" style={{ width: '100%' }}>
            <div className="flex-align-center yellow-text-color">
            </div>
            <Radio.Group
                onChange={e => setSelected(e.target.value)}
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


