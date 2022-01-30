import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Security():JSX.Element {
    const currentServerState = useSelector((state: RootState) => {
        return state.server.currentServer;
    });
    if (currentServerState) {
        return (
            <>
                <div>IPv4 networking</div>
                <div>The public IP address of your instance is accessible to the internet.</div>
                <div>The private IP address is accessible only to other resources in your Datacenter.</div>
            </>);
    }
    else {
        return <></>;
    }

}
