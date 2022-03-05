import React, { useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Menu, Dropdown } from 'antd';
import { Icon } from '@iconify/react';
// import stbucket from '@@/src/assets/images/stbucket.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DataCenterService from '@/service/dataCenterService';
import { DataCenterInfo } from '@/constant/dataCenter';


function DataCenterCard(props:DataCenterInfo) {
    const navigate = useNavigate();
    const { dcName,vpcID,vpcCidr,dcRegion } = props;
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={()=>navigate('/resource')}>
          Resource
            </Menu.Item>
            <Menu.Item key="manage" onClick={()=>navigate('/datacenter')}>
          Manage
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() => console.log('click delete')
                }
            >
        Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <div
            className={classnames(
                'flex',
                'flex-col',
                'bg-gray-200',
                'rounded-border',
                'w-96',
                'p-2',
                'mx-8',
                'my-4',
            )}
        >
            <div className={classnames('flex', 'flex-row', 'mb-2')}>
                {/* <img
                    src={stbucket}
                    alt="stbucket.png"
                    className={classnames('w-12', 'h-12')}
                /> */}
                <Icon icon="ic:round-cloud-circle" color="#e9862e" width="50" fr={null}/>
                <div className={classnames('ml-2','flex-grow')}>
                    <a href='/resource' className={classnames('text-blue-600') }>{dcName}</a>
                    <div className={classnames('text-xs', 'text-gray-500')}>{vpcID}</div>
                </div>
                <Dropdown overlay={menu}>
                    <Icon
                        icon="fluent:more-vertical-20-filled"
                        fr={undefined}
                        className={classnames('cursor-pointer', 'hover:bg-yellow-650')}
                    />
                </Dropdown>
            </div>
            <div
                className={classnames(
                    'flex',
                    'flex-row',
                    'justify-between',
                    'border-t-2',
                    'border-gray-300',
                    'border-dashed'
                )}
            >
                <div className={classnames('text-xs', 'text-gray-500')}>{vpcCidr}</div>
                <div className={classnames('text-xs', 'text-gray-500', 'pr-5')}>{dcRegion}</div>
            </div>
        </div>
    );
}



export default function Home():JSX.Element {

    const [datacenters,changeDatacenters] = useState<DataCenterInfo[]>([]);
    useEffect(()=>{
        DataCenterService.getDataCenterInfo().then(
            res=>changeDatacenters(res)
        );},[]);

    return (
        <div className={classnames('min-h-screen')}>
            {datacenters.map((dcInfo)=><DataCenterCard key={dcInfo.vpcID} {...dcInfo}/>)}
        </div>

    );
}
