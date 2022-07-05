import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Breadcrumb, Table } from 'antd';
import { HomeOutlined, RedoOutlined, UserOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { useQuery } from 'react-query';
import bucketService from '@/service/stBucketService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { StBucketDetailModel } from '@/constant/storage';


export default function Objects() {
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const { currentBucket } = useSelector((state:RootState)=>state.storage );
    if(typeof currentBucket !== 'string'){
        const { isLoading, isError, data, error } = useQuery('todos', ()=>bucketService.getBucketObjects({ bucketId:currentBucket.bucketBasic.bucketId, dcName }));
        console.log(isLoading, isError, data, error);
    }

    const dataSource = [
        {
            key: '1',
            name: 'hello.txt',
            size: '12Mb',
            modified: '2022',
        },
        {
            key: '2',
            name: 'hello文件夹',
            size: '',
            modified: '2021',
        },
    ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // filters: [
            //     {
            //         text: 'Joe',
            //         value: 'Joe',
            //     }
            // ],
            // filterMode: 'tree',
            // filterSearch: true,
            // onFilter: (value: string, record) => record.name.includes(value),
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Modified',
            dataIndex: 'modified',
            key: 'modified',
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>Application List</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Application</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='p-2 rounded-border'>
                <div className='text-2xl'>Object list</div>
                <div>
                    <button onClick={() => console.log('click')} className='mx-1 text-yellow-550'>
                    Create new folder
                        <Icon
                            icon="carbon:add"
                            className='inline-block'
                            width="15"
                            height="15"
                        />
                    </button>
                    <button onClick={() => console.log('click')} className='mx-1 text-yellow-550'>
                    Upload
                        <VerticalAlignTopOutlined />
                    </button>
                    <button onClick={() => console.log('click')} className='mx-1 text-yellow-550'>
                    Refresh
                        <RedoOutlined />
                    </button>
                </div>
                <Table rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }} dataSource={dataSource} columns={ columns } />
            </div>
        </>
    );
}
