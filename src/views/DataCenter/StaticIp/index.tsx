import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import EipCard from '@/components/Datacenter/EipCard';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
//redux相关
import { listAllStaticIp } from '@/redux/staticipSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { getApiV1DatacenterStaticipList, postApiV1DatacenterStaticip, deleteApiV1DatacenterStaticip } from '@/api-client';
import { getApiV1DatacenterSecgroupList as _dcSecgroupList, getApiV1DatacenterSubnetList as _dcSubnetList } from '@/api-client';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';


export default function Network() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // const [eipInfos, changeEipInfos] = useState<'loading'|EipInfo[]>('loading');
    const eipInfos = useSelector((state: RootState) => state.staticip.list);
    const loading = useSelector((state: RootState) => state.staticip.loading);
    const dc = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
    const [creating, changeCreating] = useState(false);
    const [sortBy, changeSortBy] = useState('Name');
    const menu = (
        <Menu onClick={e => { changeSortBy(e.key); }}>
            <Menu.Item key="Name">
                Name
            </Menu.Item>

        </Menu>
    );
    let order: string;
    switch (sortBy) {
    case 'Name':
        order = 'dcName';
        break;

    }
    useEffect(() => {
        if (!dc) navigate('/home');
    }, []);

    return (
        <div>
            <div className='mx-8 mt-2 text-xl font-bold align-middle'>Select a Static IP</div>
            <div className='flex justify-between items-center mx-8'>
                <div className={"flex text-sm"}>
                    <div className={clsx()}>Sort by </div>
                    <Dropdown overlay={menu} >
                        <div className={"text-yellow-550 font-bold mx-1 cursor-pointer"}>{sortBy} <DownOutlined /></div>
                    </Dropdown>
                </div>

                <button className='flex items-center btn-yellow' onClick={() => {
                    changeCreating(true);
                    (postApiV1DatacenterStaticip as any)({ body: { dcName: dc } }).then(
                        () => {
                            dispatch(listAllStaticIp({ dc }));
                            changeCreating(false);
                        }
                    );
                }}> {creating
                        ? <LoadingOutlined className={"align-middle mr-2"} />
                        : <Icon icon="carbon:add" className='mx-1'
                            width="15"
                            height="15"
                            inline={true} />}Add Static IP</button>
            </div>
            {loading || !eipInfos
                ? <div className="flex w-full items-center justify-center h-96"><Spinner className="size-8" /></div>
                : (eipInfos.length !== 0
                    ? <div className={"grid 2xl:grid-cols-3 lg:grid-cols-2 gap-4 justify-items-center items-center mt-4"}>
                        {eipInfos.map(item => <EipCard key={item.publicIp} {...item} />)}
                    </div>
                    : <div>No Eips</div>)}
        </div>
    );
}
