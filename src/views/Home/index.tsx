import React, { useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { useEffect } from 'react';
import DataCenterService from '@/service/dataCenterService';
import { DataCenterModel } from '@/constant/dataCenter';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import Nodc from './Nodc';
import DataCenterCard from '@/components/Logic/CCard/DataCenterCard';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


export default function Home():JSX.Element {
    const navigate = useNavigate();
    const [datacenters,changeDatacenters] = useState<'loading'|DataCenterModel[]>('loading');
    const [sortBy,changeSortBy] = useState('Name');
    useEffect(()=>{
        DataCenterService.getDataCenterAll().then(
            res=>changeDatacenters(res)
        );},[]);

    const menu = (
        <Menu onClick={e=>{changeSortBy(e.key);}}>
            <Menu.Item key="Name">
          Name
            </Menu.Item>
            <Menu.Item key="CreateDate">
          CreateDate
            </Menu.Item>
            <Menu.Item key="VPC" >
          VPC
            </Menu.Item>
            <Menu.Item key="Region">
          Region
            </Menu.Item>
        </Menu>
    );


    let order:string;
    switch(sortBy) {
    case 'Name':
        order = 'dcName';
        break;

    case 'CreateDate':
        order = 'createDate';
        break;

    case 'VPC':
        order = 'vpcID';
        break;

    case 'Region':
        order = 'dcRegion';
        break;
    }




    return (<div>
        <div className={classnames('mx-14','mt-2','font-bold','text-2xl','align-middle')}> select a datacenter</div>
        <div className={classnames('flex','items-center','justify-between','mx-14')}>
            <div className={classnames('flex','text-sm')}>
                <div className={classnames()}>sort by </div>
                <Dropdown overlay={menu} >
                    <div className={classnames('text-yellow-550','font-bold','mx-1','cursor-pointer')}>{sortBy} <DownOutlined /></div>
                </Dropdown>
            </div>
            <button className='btn-yellow' onClick={()=>navigate('/datacenter/add')}> create new datacenter</button>
        </div>

        {datacenters === 'loading'
            ? <CPartialLoading classes={classnames('h-96')}/>
            : (datacenters.length !== 0
                ? <div className={classnames('grid','2xl:grid-cols-3','lg:grid-cols-2','gap-4','justify-items-center','items-center','mt-4')}>
                    {datacenters.sort((a,b)=>{
                        if(order === 'dcRegion'){return ['us-west-1','us-east-1'].indexOf(b.dcRegion) - ['us-west-1','us-east-1'].indexOf(a.dcRegion); }
                        else{return b[order].localeCompare(a[order]);};
                    }).map((dcInfo)=><DataCenterCard key={dcInfo.dcName} {...dcInfo}/>)}
                </div>
                : <Nodc/>)
        }
    </div>
    );
}
