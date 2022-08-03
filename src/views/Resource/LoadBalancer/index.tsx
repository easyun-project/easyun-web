import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { classnames } from '@@/tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';
// import { updateElbList } from '@/redux/LoadbalancerSlice';
import { Spin, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LoadbalancerCard from '@/components/resource/LoadbalancerCard';


const LoadbalancerPage = (): JSX.Element => {
    const LoadbalancerSate = useSelector((state: RootState) => state.loadbalancer);
    const { list, loading } = LoadbalancerSate;

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
            <Menu.Item key="Engine">Engine</Menu.Item>
        </Menu>
    );
    let order: string;
    switch (sortBy) {
    case 'Name':
        order = 'dcName';
        break;
    case 'Type':
        order = 'elbType';
        break;
    }

    return (
        <>
            <div className= 'flex justify-between items-center mx-8'>
                <div className='flex text-sm'>
                    <div>Sort by </div>
                    <Dropdown overlay={menu} >
                        <div className='mx-1 font-bold text-yellow-550 cursor-pointer '>{sortBy} <DownOutlined /></div>
                    </Dropdown>
                </div>

                <div>
                    <button className='m-5 btn-yellow'onClick={() =>navigate('/resource/loadbalancer/add')}>
                            Add Loadbalancer
                    </button>
                </div>
            </div>

            <div className= 'flex flex-wrap justify-items-center '>
                {props.resList.map(elb =>
                    <LoadbalancerCard key={elb.elbId} {...elb} />
                )}
            </div>
        </>

    );
};


const WithoutResource = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className= 'flex flex-col justify-center items-center m-10 '>
            <div className= 'm-1 text-3xl'>You have no load balancer right now.</div>
            <div className= 'my-2 text-sm text-gray-700'>
                A load balancer adds redundancy and increases capacity by distributing traffic to multiple servers.
            </div>
            <div className= 'flex flex-row '>
                <button
                    onClick={() => navigate('/Loadbalancer/add')}
                    className={classnames('btn-yellow')}>
                    Add Load balancer
                </button>
            </div>
        </div>
    );
};

export default LoadbalancerPage;