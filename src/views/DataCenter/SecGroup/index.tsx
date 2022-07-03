import React, { useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Spin, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SecGroupCard from '@/components/Datacenter/SecGroupCrad';


export default function index() {
    const routeState = useSelector((state: RootState) => state.secgroup);
    const { list, loading } = routeState;

    return (
        <Spin spinning={loading} tip="Loading...">
            <div>
                {list.length === 0 ? <WithoutResource /> : <WithResource resList={list} />}
            </div>
        </Spin>
    );
};

const WithResource = (props): JSX.Element => {
    const navigate = useNavigate();
    const [ sortBy, changeSortBy ] = useState('Name');
    const menu = (
        <Menu onClick={e => { changeSortBy(e.key); }}>
            <Menu.Item key="Name">Name</Menu.Item>
        </Menu>
    );
    let order: string;
    switch (sortBy) {
    case 'Name':
        order = 'dcName';
        break;
    }

    return (
        <>
            <div className='mx-8 mt-2 text-xl font-bold align-middle'>Select a Security Group</div>
            <div className= 'flex justify-between items-center mx-8'>
                <div className='flex text-sm'>
                    <div>Sort by </div>
                    <Dropdown overlay={menu} >
                        <div className='mx-1 font-bold text-yellow-550 cursor-pointer '>{sortBy} <DownOutlined /></div>
                    </Dropdown>
                </div>

                <div>
                    <button className='flex items-center btn-yellow' onClick={() => navigate('add')}>
                        Add Route Table
                    </button>
                </div>
            </div>

            <div className='grid gap-4 justify-items-center items-center mt-4 lg:grid-cols-2 2xl:grid-cols-3'>
                {props.resList.map(sg =>
                    <SecGroupCard key={sg.sgId} {...sg} />
                )}
            </div>
        </>
    );
}

const WithoutResource = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className= 'flex flex-col justify-center items-center m-10 '>
            <div className= 'm-1 text-3xl'>You have no route table right now.</div>
            <div className= 'my-2 text-sm text-gray-700'>
                Add a Route Table and get started with Easyun!
            </div>
            <div className= 'flex flex-row '>
                <button
                    onClick={() => navigate('/database/add')}
                    className={classnames('btn-yellow')}>
                    Add Database
                </button>
            </div>
        </div>
    );
};