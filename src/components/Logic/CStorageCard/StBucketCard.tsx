import React from 'react';
import { TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { Menu, Dropdown } from 'antd';
import bucketManage from '@/service/stBucketService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getBucketDetail, listAllBucket } from '@/redux/stbucketSlice';
import { listAllBucket } from '@/redux/stbucketSlice';
import { RootState } from '@/redux/store';


export interface BucketCardInfo {
    class?: TTailwindString;
    bucketUrl?: string;
    CreationDate?: string;
    bktName: string;
    bktRegion: string;
    pubStatus: string;
    statusMsg: string;
    stType: string;
}

const CStBucketCard = (props): JSX.Element => {
    const { bucketId,  bucketRegion, bucketAccess:{ description, status } } = props;
    const dcName = useSelector((state: RootState) => state.dataCenter.current!.dcName);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const init = async ()=> dispatch(getBucketDetail({ bucketId, dcName }));
    const menu = (
        <Menu>
            <Menu.Item key="manage" onClick={() => {
                ()=>navigate(`/resource/object/${bucketId}`, { state: props });
            }}>
                Manage
            </Menu.Item>
            {/* 删除按钮目前只要后端返回成功，就会直接在前端页面把那个桶删掉。 */}
            <Menu.Item
                danger
                key="delete"
                onClick={() => {
                    bucketManage.deleteBucket({ dcName, bucketId })
                        .then(
                            () => {
                                alert('删除成功');
                                dispatch(listAllBucket({ dc:dcName }));
                            }
                        );
                }}
            >
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <div className= 'flex flex-col p-2 my-4 mx-8 w-96 bg-gray-200 rounded border'>
            <div className= 'flex flex-row mb-2'>
                <Icon icon="bi:bucket" width="36" color='#FF8C00' inline={true} />
                <div className='grow ml-2'>
                    <div className= 'text-blue-600 '>
                        <span className='cursor-pointer' onClick={() => {
                            navigate(`/resource/object/${bucketId}`, { state: props });
                        }}>{bucketId}</span>
                    </div>
                    <div className= 'text-xs text-gray-500 '>{status}</div>
                </div>
                <Dropdown overlay={menu}>
                    <Icon
                        icon="fluent:more-vertical-20-filled"
                        fr={undefined}
                        className= 'hover:bg-yellow-650 cursor-pointer '
                    />
                </Dropdown>
            </div>
            <div className='flex flex-row justify-between border-t-2 border-gray-300 border-dashed'>
                <div className= 'text-xs text-gray-500 '>{description}</div>
                <div className= 'pr-5 text-xs text-gray-500 '>{bucketRegion}</div>
            </div>
        </div>
    );
};

export default CStBucketCard;
