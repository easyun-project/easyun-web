import React, { useEffect, useState } from 'react';
import EipCard from '@/components/Logic/CCard/EipCard';
import DataCenterService from '@/service/dataCenterService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { EipInfo } from '@/constant/dataCenter';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import { Menu, Dropdown } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
import { DownOutlined } from '@ant-design/icons';




export default function Network() {
    const navigate = useNavigate();
    const [eipInfos, changeEipInfos] = useState<'loading'|EipInfo[]>('loading');

    const dc = useSelector((state:RootState)=>state.dataCenter.currentDc.basicInfo?.dcName);
    const [sortBy,changeSortBy] = useState('Name');
    const menu = (
        <Menu onClick={e=>{changeSortBy(e.key);}}>
            <Menu.Item key="Name">
          Name
            </Menu.Item>

        </Menu>
    );
    let order:string;
    switch(sortBy) {
    case 'Name':
        order = 'dcName';
        break;

    }
    useEffect(()=>{
        if(dc) DataCenterService.getEipInfo( dc ).then(res=>changeEipInfos(res));
        else navigate('/home');
    },[]);

    return (
        <div>
            <div className={classnames('mx-14','mt-2','font-bold','text-2xl','align-middle')}> select a datacenter</div>
            <div className={classnames('flex','items-center','justify-between','mx-14')}>
                <div className={classnames('flex','text-sm')}>
                    <div className={classnames()}>sort by </div>
                    <Dropdown overlay={menu} >
                        <div className={classnames('text-yellow-550','font-bold','mx-1','cursor-pointer')}>{sortBy} <DownOutlined /></div>
                    </Dropdown>
                </div>

                <button className={classnames('btn-yellow')} onClick={()=>navigate('/datacenter/add')}> create new datacenter</button>
            </div>
            {eipInfos === 'loading'
                ? <CPartialLoading classes={classnames('h-96')}/>
                : (eipInfos.length !== 0
                    ? <div className={classnames('grid','2xl:grid-cols-3','lg:grid-cols-2','gap-4','justify-items-center','items-center','mt-4')}>
                        {eipInfos.map(item=><EipCard key={item.pubIp} {...item}/>)}
                    </div>
                    : <div>No Eips</div>)}
        </div>
    );
}
