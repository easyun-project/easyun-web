import React, { useState } from 'react';
import { getHostUrl } from '@/utils/api';
import { Modal, message, Input } from 'antd';


interface HostModalProps {
    title: string,
    msg: string,
    isVisible: boolean,
    setIsVisible
}

export default function HostModal( props:HostModalProps ) {
    const { title, msg, isVisible, setIsVisible } = props;
    const [hostUrl, setHostUrl] = useState(getHostUrl());
    const updateHostUrl = (value:string) => {
        localStorage.setItem('server', value);
    };

    return (
        <Modal title={title} visible={isVisible}
            onOk={() => {
                if (!hostUrl) {
                    message.warn(msg);
                    return;
                } else {
                    updateHostUrl(hostUrl);
                };
                setIsVisible(false);
            }}
            onCancel={()=>setIsVisible(false)}>
            <Input placeholder='please your server url'
                value={hostUrl}
                onChange={ (e) => {
                    setHostUrl(e.target.value);
                }
                } />
        </Modal>
    );
}

