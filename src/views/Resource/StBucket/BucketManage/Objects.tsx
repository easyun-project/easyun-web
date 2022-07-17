import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Breadcrumb, Table } from 'antd';
import { HomeOutlined, RedoOutlined, UserOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { useQuery } from 'react-query';
import bucketService from '@/service/stBucketService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { StBucketDetailModel } from '@/constant/storage';

type objectData = {
    key:string,
    name:string,
    size:number,
    modefied:string,
    type:string }


export default function Objects() {
    const dcName = useSelector((state: RootState) => state.dataCenter.currentDC.basicInfo!.dcName);
    const currentBucket  = useSelector((state:RootState)=>state.storage.currentBucket as StBucketDetailModel );
    const { bucketId } = currentBucket.bucketBasic;
    const { isLoading, isError, data, error } = useQuery([ bucketId, dcName ], ()=>bucketService.getBucketObjects({ bucketId, dcName }));
    const [ path, setPath ] = useState('');

    //子文件的数据源
    const sonFilesData = data?.filter(item =>  {
        const isOffspring = item.key.startsWith(path);
        const isFolder = item.key.endsWith('/');
        const isFile = !isFolder;
        const isSonFile = isOffspring && isFile && item.key.replace(path, '').indexOf('/') === -1;
        // const isSonFolder = isOffspring && item.key.replace(path, '').split('/').length === 2 && item.key.replaceAll(path, '').split('/').at(-1) === '';
        return isSonFile;
    }).map(item => {
        return {
            key:item.key,
            name:item.key.replace(path, ''),
            size:item.size,
            modefied:item.modifiedTime,
            type:item.type };
    });
    //子文件夹的数据源：1.需要找到返回的子文件夹列表。2.需要从孙文件的路径中解析出子文件夹，并去重。
    //立即执行函数写法，用Set去重
    const sonFoldersData = ((data) =>{
        const sonFoldersList:objectData[] = [];
        const sonFolders = new Set();
        //处理子文件夹
        data?.filter(item =>  {
            const isOffspring = item.key.startsWith(path);
            const isSonFolder = isOffspring && item.key.replace(path, '').split('/').length === 2 && item.key.replaceAll(path, '').split('/').at(-1) === '';
            return isSonFolder;
        }).forEach(item => {
            //生成data对象前将路径加入到set中
            sonFolders.add(item.key.replace(path, ''));
            sonFoldersList.push({
                key:item.key,
                name:item.key.replace(path, ''),
                size:item.size,
                modefied:item.modifiedTime,
                type:item.type });
        });
        //处理孙文件
        data?.filter(item =>  {
            const isOffspring = item.key.startsWith(path);
            const isFile = !item.key.endsWith('/');
            const isGrandSonFile = isOffspring && isFile && item.key.replace(path, '').indexOf('/') !== -1;
            return isGrandSonFile;
        }).forEach(item => {
            //生成data对象前将路径加入到set中
            const folderPath = item.key.replace(path, '').split('/')[0] + '/';
            if(!sonFolders.has(folderPath)){
                sonFolders.add(folderPath);
                sonFoldersList.push({
                    key:item.key,
                    name:folderPath,
                    size:0,
                    modefied:item.modifiedTime,
                    type:'Folder' });
            }
        });
        return sonFoldersList;
    })(data);
    //合并子文件数据源和子文件夹数据源
    const dataSource = [ ...sonFoldersData, ...sonFilesData ? sonFilesData : []  ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record) => {
                if(record['type'] === 'Folder'){
                    return <a className='text-blue-500' onClick={()=>setPath(path + text)}>{text}</a>;
                }else{
                    return <span>{text}</span>;
                }
            },
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
                        <HomeOutlined onClick={()=>setPath('')}/>
                    </Breadcrumb.Item>
                    {path.split('/').map(item=>
                        <Breadcrumb.Item key={item}>
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
