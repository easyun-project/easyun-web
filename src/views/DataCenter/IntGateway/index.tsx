import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { InternetGWCard } from '@/components/Datacenter/GatewayCard';


export default function index() {
    const navigate = useNavigate();
    const igws = useSelector((state: RootState) => state.intgateway.list);
    const [ sortBy, changeSortBy ] = useState('Name');
    const menu = (
        <Menu onClick={e => { changeSortBy(e.key); }}>
            <Menu.Item key="Name">Name</Menu.Item>
            <Menu.Item key="Zone">Zone</Menu.Item>
        </Menu>
    );
    let order: string;
    switch (sortBy) {
    case 'Name':
        order = 'dcName';
        break;
    case 'Zone':
        order = 'subnetAz';
        break;
    }
    return (
        <>
            <div className='mx-8 mt-2 text-xl font-bold align-middle'>Select an Internet Gateway</div>
            <div className='flex justify-between items-center mx-8 '>
                <div className='flex text-sm'>
                    <div>Sort by </div>
                    <Dropdown overlay={menu} >
                        <div className='mx-1 font-bold text-yellow-550 cursor-pointer '>{sortBy} <DownOutlined /></div>
                    </Dropdown>
                </div>

                <button className='flex items-center btn-yellow' onClick={() => navigate('add')}>
                    Add Gateway</button>
            </div>
            <div className='grid gap-4 justify-items-center items-center mt-4 lg:grid-cols-2 2xl:grid-cols-3'>
                {igws?.map(igw => <InternetGWCard key={igw.igwId} {...igw} />)}
            </div>
        </>
    );
}
