import React,{ useState } from 'react';
import SubnetCrad from '@/components/Logic/CCard/SubnetCrad';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Dropdown,Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function index() {
    const navigate = useNavigate();
    const subnets = useSelector((state:RootState)=>state.dataCenter.currentDC.subnet);
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
    return (
        <div>
            <div className='mx-14 mt-2 text-2xl font-bold align-middle'> select a subnet</div>
            <div className= 'flex justify-between items-center mx-14 '>
                <div className= 'flex text-sm'>
                    <div>sort by </div>
                    <Dropdown overlay={menu} >
                        <div className= 'mx-1 font-bold text-yellow-550 cursor-pointer '>{sortBy} <DownOutlined /></div>
                    </Dropdown>
                </div>

                <button className='flex items-center btn-yellow' onClick={()=>navigate('add')}>
                create new subnet</button>
            </div>
            <div className='grid gap-4 justify-items-center items-center mt-4 lg:grid-cols-2 2xl:grid-cols-3'>
                {subnets?.map(subnet=><SubnetCrad key={subnet.subnetId} {...subnet}/>)}
            </div>
        </div>
    );
}
