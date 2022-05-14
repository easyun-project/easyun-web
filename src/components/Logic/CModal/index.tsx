import React, { useState } from 'react';
import { getHostUrl } from '@/utils/api';
import { Modal, message, Input } from 'antd';


interface HostModalProps {
    title: string,
    msg: string,
    isVisible: boolean
}

{/* fix-me: 通过 onClick={() => setIsModalVisible(true)} 模态框不显示 */}
export default function HostModal( props:HostModalProps ) {
    const { title, msg, isVisible } = props;
    const [visible, setVisible] = useState(isVisible);
    const [hostUrl, setHostUrl] = useState(getHostUrl());
    const updateHostUrl = (value:string) => {
        localStorage.setItem('server', value);
    };

    return (
        <Modal title={title} visible={visible}
            onOk={() => {
                if (!hostUrl) {
                    message.warn(msg);
                    return;
                } else {
                    updateHostUrl(hostUrl);
                };
                setVisible(false);
            }}
            onCancel={()=>setVisible(false)}>
            <Input placeholder='please your server url'
                value={hostUrl}
                onChange={ (e) => {
                    setHostUrl(e.target.value);
                }
                } />
        </Modal>
    );
}

