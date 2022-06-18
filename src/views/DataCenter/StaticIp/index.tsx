import React, { useEffect, useState } from 'react';
import EipCard from '@/components/Datacenter/EipCard';
import { useNavigate } from 'react-router-dom';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import { Menu, Dropdown } from 'antd';
import { classnames } from 'tailwindcss-classnames';
import { DownOutlined } from '@ant-design/icons';
//redux相关
import { getDataCenterEip } from '@/redux/dataCenterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DataCenterService from '@/service/dataCenterService';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';


export default function Network() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [eipInfos, changeEipInfos] = useState<'loading'|EipInfo[]>('loading');
    const eipInfos = useSelector((state: RootState) => state.dataCenter.currentDC.eip);
    const loading = useSelector((state: RootState) => state.dataCenter.loading);
    const dc = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
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
            <div className='mx-14 mt-2 text-2xl font-bold align-middle'>Select a Static IP</div>
            <div className={classnames('flex', 'items-center', 'justify-between', 'mx-14')}>
                <div className={classnames('flex', 'text-sm')}>
                    <div className={classnames()}>sort by </div>
                    <Dropdown overlay={menu} >
                        <div className={classnames('text-yellow-550', 'font-bold', 'mx-1', 'cursor-pointer')}>{sortBy} <DownOutlined /></div>
                    </Dropdown>
                </div>

                <button className='flex items-center btn-yellow' onClick={() => {
                    changeCreating(true);
                    DataCenterService.createEip('Easyun').then(
                        () => {
                            dispatch(getDataCenterEip({ dc }));
                            changeCreating(false);
                        }
                    );
                }}> {creating
                        ? <LoadingOutlined className={classnames('align-middle', 'mr-2')} />
                        : <Icon icon="carbon:add" className='mx-1'
                            width="15"
                            height="15"
                            inline={true} />}Add Static IP</button>
            </div>
            {loading || !eipInfos
                ? <CPartialLoading classes={classnames('h-96')} />
                : (eipInfos.length !== 0
                    ? <div className={classnames('grid', '2xl:grid-cols-3', 'lg:grid-cols-2', 'gap-4', 'justify-items-center', 'items-center', 'mt-4')}>
                        {eipInfos.map(item => <EipCard key={item.publicIp} {...item} />)}
                    </div>
                    : <div>No Eips</div>)}
        </div>
    );
}
