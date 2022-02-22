import React, { useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CSecOpt from '@/components/Logic/CSecurityGroup/CSecOpt';
import { Table, Space } from 'antd';

export default function Security():JSX.Element {
    const currentServerState = useSelector((state: RootState) => {
        return state.server.currentServer;
    });
    const dataSource = [
        {
            key: '1',
            application: 'SSH',
            protocol: 'TCP',
            port: '22',
            restricted: 'Any IPv4 address',
            ruleId:1
        },
        {
            key: '2',
            application: 'HTTP',
            protocol: 'TCP',
            port: '80',
            restricted: 'Any IPv4 address',
            ruleId:2
        },
    ];

    const columns = [
        {
            title: 'Application',
            dataIndex: 'application',
            key: 'application',
        },
        {
            title: 'Protocol',
            dataIndex: 'protocol',
            key: 'protocol',
        },
        {
            title: 'Port or range / Code',
            dataIndex: 'port',
            key: 'port',
        },
        {
            title: 'Restricted to',
            dataIndex: 'restricted',
            key: 'restricted',
        },
        {
            title: '',
            dataIndex: 'ruleId',
            key: 'ruleId',
            render: (text,record) => (
                <Space size="middle">
                    <Icon fr={undefined}
                        icon="ep:edit"
                        className={classnames('inline-block','mx-1', 'cursor-pointer')}
                        width="24" height="24"
                        color='#dd6b10'
                        onClick={() => {console.log('edit',record);
                        }} />
                    <Icon fr={undefined}
                        icon="clarity:times-line"
                        className={classnames('inline-block','mx-1', 'cursor-pointer')}
                        width="24" height="24"
                        color='#dd6b10'
                        onClick={() => {console.log('delete',record);
                        }} />
                </Space>
            ),
        },
    ];

    const [slectedSecgroups,changeSlectedSecgroups] = useState<string[]>([]);
    if (currentServerState) {
        // 由于返回的字段与之前的定义不同，所以需要做一下转化
        const secGroups = currentServerState.svrSecurity.map((sec) => {
            const newSec = { sgId: '', tagName: '',sgName:'' };
            newSec.sgId = sec['sgId'];
            newSec.tagName = sec['sgName'];
            newSec.sgName = sec['sgName'];
            return newSec;
        });

        return (
            <>
                <div>Security Groups</div>
                <div className={classnames('flex', 'flex-row')}>
                    <CSecOpt multi={ false } secgroups={secGroups} changeSlectedSecgroups={changeSlectedSecgroups} />
                    <button
                        className={ classnames('border-2', 'rounded-lg','border-gray-500', 'm-5','h-20', 'w-20', 'text-center','align-middle','inline-block')}
                        onClick={()=>{console.log('click');
                        }
                        }>
                    + New
                    </button>
                </div>

                <div>Create rules to open ports to the internet, or to a specific IPv4 address or range.</div>
                <a className={classnames('text-blue-500')} href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                Learn more about firewall rules
                    <Icon
                        icon="akar-icons:link-out"
                        className={classnames('inline-block', 'mx-1', 'text-blue-500')}
                        width="15"
                        height="15"
                        fr={undefined}
                    />
                </a>
                <div>
                    <button onClick={() => console.log('click')} className={classnames('inline', 'text-yellow-550')}>
                        <Icon fr={undefined}
                            icon="carbon:add"
                            className={classnames('inline-block', 'mx-1')}
                            width="15"
                            height="15"
                        />
                Add rule
                    </button>
                    <Table columns={columns} dataSource={dataSource} />
                </div>

            </>);
    }
    else {
        return <></>;
    }

}
