import React, { useState, useRef } from 'react';
import { Breadcrumb, Table, Input, Space, Button,  } from 'antd';
import { HomeOutlined, RedoOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { useQuery } from 'react-query';
import bucketService from '@/service/stBucketService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { StBucketDetail } from '@/constant/storage';
import DataConversionTool from '@/utils/dataConversionTool';
import TimeUtil from '@/utils/time';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/es/table';
import type { InputRef } from 'antd';

interface DataType{
    key:string,
    name:string,
    size:number,
    modified:string,
    type:string
}
type DataIndex = keyof DataType;


export default function Objects() {
    const dcName = useSelector((state: RootState) => state.dataCenter.current?.dcName) as string;
    const currentBucket  = useSelector((state: RootState) => state.stbucket.currentBucket) as StBucketDetail ;
    const { bucketId } = currentBucket.bucketBasic;
    const { isLoading,  data } = useQuery([ bucketId, dcName ], ()=>bucketService.getBucketObjects({ bucketId, dcName }));
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
            modified:item.modifiedTime,
            type:item.type };
    });
    //子文件夹的数据源：1.需要找到返回的子文件夹列表。2.需要从孙文件的路径中解析出子文件夹，并去重。
    //立即执行函数写法，用Set去重
    const sonFoldersData = ((data) =>{
        const sonFoldersList:DataType[] = [];
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
                modified:item.modifiedTime,
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
                    modified:item.modifiedTime,
                    type:'Folder' });
            }
        });
        return sonFoldersList;
    })(data);
    //合并子文件数据源和子文件夹数据源
    const dataSource = [ ...sonFoldersData, ...sonFilesData ? sonFilesData : [] ];

    //筛选功能实现
    const [ searchText, setSearchText ] = useState('');
    const [ searchedColumn, setSearchedColumn ] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                    Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                    Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                    Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) =>
            searchedColumn === dataIndex
                ? (record['type'] === 'Folder'
                    ? <a className='text-blue-500' onClick={()=>setPath(path + text)}>
                        <Highlighter
                            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                            searchWords={[ searchText ]}
                            autoEscape
                            textToHighlight={text ? text.toString() : ''}
                        />
                    </a>
                    : <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[ searchText ]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                )
                : (
                    record['type'] === 'Folder' ? <a className='text-blue-500' onClick={()=>setPath(path + text)}>{text}</a> : text
                ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name') as ColumnType<DataType>
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            render: (text:number)=> text === 0 ? '' : DataConversionTool.conversionUnit({ value:text, unit:'Byte' })
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'Modified',
            dataIndex: 'modified',
            key: 'modified',
            render :(text:string)=>  TimeUtil.utcConvertTimeZone({ date:text, formatter: 'YYYY/MM/DD HH:mm:ss' })
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

            <Breadcrumb>
                <Breadcrumb.Item>
                    <a><HomeOutlined onClick={()=>setPath('')}/></a>
                </Breadcrumb.Item>
                {path.split('/').map(item=>
                    <Breadcrumb.Item key={item} onClick={()=>setPath(path.split(item)[0] + item + '/')}>
                        <a>{item}</a>
                    </Breadcrumb.Item>)}
            </Breadcrumb>

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
