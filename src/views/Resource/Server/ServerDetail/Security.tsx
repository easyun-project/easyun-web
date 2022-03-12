import React, { useEffect, useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CSecOpt from '@/components/Logic/CSecurityGroup/CSecOpt';
import { Table, Space } from 'antd';

type Secgroupdata = {
    'FromPort': number
    'IpProtocol': string
    'IpRanges': Record<string,string>[],
    'Ipv6Ranges': string[],
    'PrefixListIds': string[],
    'ToPort': number
    'UserIdGroupPairs': string[]
    'strategy'?:string
};

export default function Security():JSX.Element {
    const currentServerState = useSelector((state: RootState) => {
        return state.server.currentServer;
    });
    const allSecgroups = useSelector((state: RootState) => {
        return state.dataCenter.currentDc?.secgroup;
    });
    const [data,changeData] = useState<Record<string,object|number|string>[]>([]);

    const columns = [
        {
            title: 'Application',
            dataIndex: 'IpProtocol',
            key: 'application',
        },
        {
            title: 'Protocol',
            dataIndex: 'IpProtocol',
            key: 'protocol',
        },
        {
            title: 'Port or range / Code',
            key: 'port',
            render:(record)=>record.FromPort === record.ToPort ? `${record.FromPort}` : `From:${record.FromPort} To:${record.ToPort}`
        },
        {
            title: 'IpRanges',
            key: 'IpRanges',
            render:(record)=>
                <div>
                    { record.IpRanges.map((item,index)=>(<div key={index}>{item.CidrIp}</div>) )}
                </div>
        },
        {
            title: 'Strategy',
            key: 'strategy',
            dataIndex: 'strategy',
        },
        {
            title: '',
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
    useEffect(()=>{
        const selectedSecgroupInfo = allSecgroups?.filter((secgroup)=>secgroup.sgId === slectedSecgroups[0])[0];
        if(selectedSecgroupInfo){
            const newRes:Secgroupdata[] = [...selectedSecgroupInfo.ibPermissions];
            const data = newRes.map(i=>{
                const item = i;
                item.strategy = 'Restricted';
                return item;
            });
            changeData(data);
        }
    }
    ,[slectedSecgroups]);
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
                        onClick={()=>{console.log('Create New');
                        }
                        }>
                    + Create New
                    </button>
                    <button
                        className={ classnames('border-2', 'rounded-lg','border-gray-500', 'm-5','h-20', 'w-20', 'text-center','align-middle','inline-block')}
                        onClick={()=>{console.log('Attach New');
                        }
                        }>
                    + Attach New
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
                    <Table columns={columns} dataSource={data} />
                </div>

            </>);
    }
    else {
        return <></>;
    }

}
