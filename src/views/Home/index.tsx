import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Spin } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
import Nodc from './Nodc';
import DataCenterCard from '@/components/Datacenter/DataCenterCard';
import { CButton } from '@/components/Common/CButton';
import { DownOutlined } from '@ant-design/icons';


export default function Home(): JSX.Element {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [ sortBy, changeSortBy ] = useState('Name');

    const dataCenterState = useSelector((state: RootState) => state.dataCenter);
    const dataCenterList = dataCenterState.list;
    const dcListLoading = dataCenterState.loading;

    // const [datacenters,changeDatacenters] = useState<'loading'|DataCenterModel[]>('loading');
    // useEffect(()=>{
    //     DataCenterService.listDataCenter().then(
    //         res=>changeDatacenters(res)
    //     );
    // },[]);

    const menu = (
        <Menu onClick={e => { changeSortBy(e.key); }}>
            <Menu.Item key="Name">
                {t('home.sortMenu.name')}
            </Menu.Item>
            <Menu.Item key="CreateDate">
                {t('home.sortMenu.createdate')}
            </Menu.Item>
            <Menu.Item key="VPC" >
                {t('home.sortMenu.vpc')}
            </Menu.Item>
            <Menu.Item key="Region">
                {t('home.sortMenu.region')}
            </Menu.Item>
        </Menu>
    );


    let order: string;
    switch (sortBy) {
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


    return (
        <div>
            <div className={classnames('mx-14', 'mt-2', 'text-2xl', 'align-middle')}>{t('home.title.selectDc')}</div>
            <div className={classnames('flex', 'items-center', 'justify-between', 'mx-14')}>
                <div className={classnames('flex', 'text-sm')}>
                    <div className={classnames()}>Sort by </div>
                    <Dropdown overlay={menu} >
                        <div className={classnames('text-yellow-550', 'font-bold', 'mx-1', 'cursor-pointer')}>{sortBy} <DownOutlined /></div>
                    </Dropdown>
                </div>
                <CButton type="primary" click={() => navigate('/datacenter/add')}>{t('home.addButton')}</CButton>
            </div>

            <Spin spinning={dcListLoading} tip="Loading...">{
                dataCenterList?.length === 0
                    ? <Nodc /> :
                    <div className={classnames('grid', '2xl:grid-cols-3', 'lg:grid-cols-2', 'gap-4', 'justify-items-center', 'items-center', 'mt-4')}>
                        {dataCenterList?.slice().sort((a, b) => {
                            if (order === 'dcRegion') { return [ 'us-west-1', 'us-east-1' ].indexOf(b.regionCode) - [ 'us-west-1', 'us-east-1' ].indexOf(a.regionCode); }
                            else { return b[order].localeCompare(a[order]); };
                        }).map((item) => <DataCenterCard key={item.dcName} {...item} />)}
                    </div>
            }</Spin>

            {/* {datacenters === 'loading'
            ? <CPartialLoading classes={classnames('h-96')}/>
            : (datacenters.length !== 0
                ? <div className={classnames('grid','2xl:grid-cols-3','lg:grid-cols-2','gap-4','justify-items-center','items-center','mt-4')}>
                    {datacenters.sort((a,b)=>{
                        if(order === 'dcRegion'){return ['us-west-1','us-east-1'].indexOf(b.dcRegion) - ['us-west-1','us-east-1'].indexOf(a.dcRegion); }
                        else{return b[order].localeCompare(a[order]);};
                    }).map((dcInfo)=><DataCenterCard key={dcInfo.dcName} {...dcInfo}/>)}
                </div>
                : <Nodc/>)
        } */}
        </div>
    );
}
