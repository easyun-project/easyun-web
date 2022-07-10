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
    const currentBucket  = useSelector((state:RootState)=>state.storage.currentBucket as StBucketDetailModel );
    const { bucketId } = currentBucket.bucketBasic;
    const { isLoading, isError, data, error } = useQuery([ bucketId, dcName ], ()=>bucketService.getBucketObjects({ bucketId, dcName }));
    const [ path, setPath ] = useState('');
    const dataSource = data?.filter(item=>  {
        const isSon = item.key.startsWith(path);
        const isSonFile = item.key.replace(path, '').split('/').length === 1 && item.key.replaceAll(path, '') !== '';
        const isSonFolder = item.key.replace(path, '').split('/').length === 2 && item.key.replaceAll(path, '').split('/').at(-1) === '';
        return isSon && (isSonFile || isSonFolder);
    }).map(item => {
        return {
            key:item.key,
            name:item.key.replace(path, ''),
            size:item.size,
            modefied:item.modifiedTime,
            type:item.type };
    });
    //     [
    //     {
    //         key: '1',
    //         name: 'hello.txt',
    //         size: '12Mb',
    //         modified: '2022',
    //     },
    //     {
    //         key: '2',
    //         name: 'hello文件夹',
    //         size: '',
    //         modified: '2021',
    //     },
    // ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            onclick:(item)=>console.log(item)
            // TODO:筛选功能
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
                    {path.split('/').map(item=><Breadcrumb.Item key={item}>
                        {item}
                    </Breadcrumb.Item>)}

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
                }} dataSource={dataSource} columns={ columns } loading={isLoading}/>
            </div>
        </>
    );
}
