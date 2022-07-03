import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { classnames } from '@@/tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';
import { Spin, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DatabaseCard from '@/components/resource/DatabaseCard';


const DatabasePage = (): JSX.Element => {
    const databaseSate = useSelector((state: RootState) => state.database);
    const { dbInstanceList, loading } = databaseSate;

    return (
        <Spin spinning={loading} tip="Loading...">
            <div>
                {dbInstanceList.length === 0 ? <WithoutResource /> : <WithResource resList={dbInstanceList} />}
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
    case 'Zone':
        order = 'dbiEngine';
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
                    <button className='m-5 btn-yellow'onClick={() =>navigate('/resource/database/add')}>
                        Add Database
                    </button>
                </div>
            </div>

            <div className= 'flex flex-wrap justify-items-center '>
                {props.resList.map(db =>
                    <DatabaseCard key={db.dbiId} {...db} />
                )}
            </div>
        </>

    );
};


const WithoutResource = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className= 'flex flex-col justify-center items-center m-10 '>
            <div className= 'm-1 text-3xl'>You have no database right now.</div>
            <div className= 'my-2 text-sm text-gray-700'>
                Add a cloud database and get started with Easyun!
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

export default DatabasePage;