import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { Menu, Dropdown } from 'antd';
import bucketManage from '@/service/stBucketService';
// import { RootState } from '@/redux/store';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteStorage } from '@/redux/storageSlice';
import { useNavigate } from 'react-router-dom';
import {  StVolumeModel } from '@/constant/storage';


const CStVolumeCard = (props: StVolumeModel): JSX.Element => {
    const { volumeBasic, volumeAttach, volumeTags } = props;
    const volumeId = volumeBasic.volumeId;
    const navigate = useNavigate();
    // const userState = useSelector((state: RootState) => {
    //     return state.user.user;
    // });
    const dispatch = useDispatch();
    const menu = (
        <Menu>
            <Menu.Item key="manage" onClick={() => {
                navigate(`/resource/volume/${volumeId}`, { state: props });
            }}>
                Manage
            </Menu.Item>
            {/* 删除按钮目前只要后端返回成功，就会直接在前端页面把那个桶删掉。 */}
            <Menu.Item
                danger
                key="delete"
                onClick={() => {
                    bucketManage.deleteBucket(volumeId)
                        .then(
                            () => {
                                alert('删除成功');
                                dispatch(deleteStorage(volumeId));
                            }
                        );
                }}
            >
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <div
            className={classnames(
                'flex',
                'flex-col',
                'bg-gray-200',
                'border',
                'w-96',
                'rounded',
                'p-2',
                'mx-8',
                'my-4',
            )}
        >
            <div className={classnames('flex', 'flex-row', 'mb-2')}>
                {/* <img
                    src={stbucket}
                    alt="stbucket.png"
                    className={classnames('w-12', 'h-12')}
                /> */}
                <Icon icon="clarity:storage-line" width="36" color='#FF8C00' inline={true} />
                <div className='grow'>
                    <div className={classnames('text-blue-600')}>
                        <span className='cursor-pointer' onClick={() => {
                            navigate(`/resource/bucket/object/${volumeId}`, { state: props });
                        }}>{volumeId}</span>
                    </div>
                </div>
                <Dropdown overlay={menu}>
                    <Icon
                        icon="fluent:more-vertical-20-filled"
                        fr={undefined}
                        className={classnames('cursor-pointer', 'hover:bg-yellow-650')}
                    />
                </Dropdown>
            </div>
            <div
                className={classnames(
                    'flex',
                    'flex-row',
                    'justify-between',
                    'border-t-2',
                    'border-gray-300',
                    'border-dashed'
                )}
            >
                <div className={classnames('text-xs', 'text-gray-500')}>status</div>
                <div className={classnames('text-xs', 'text-gray-500', 'pr-5')}>xxx</div>
            </div>
        </div>
    );
};

export default CStVolumeCard;
