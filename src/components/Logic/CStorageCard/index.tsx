import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { Menu, Dropdown } from 'antd';
import bucketManage from '@/service/addBucket';
// import { RootState } from '@/redux/store';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteStorage } from '@/redux/storageSlice';
import stbucket from '@@/src/assets/images/stbucket.png';

export interface StorageCardInfo {
  class?: TTailwindString;
  bucketUrl?: string;
  storageType?: string;
  CreationDate?:string;
  Name: string;
  bucketStatus: string;
  bucketRegion: string;
}

const CStorageCard = (props: StorageCardInfo): JSX.Element => {
    const { Name, bucketStatus, bucketRegion } = props;
    // const userState = useSelector((state: RootState) => {
    //     return state.user.user;
    // });
    const dispatch = useDispatch();
    const menu = (
        <Menu>
            <Menu.Item disabled key="manage">
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Manage (disabled)
                </a>
            </Menu.Item>
            {/* 删除按钮目前只要后端返回成功，就会直接在前端页面把那个桶删掉。 */}
            <Menu.Item
                danger
                key="delete"
                onClick={() => {
                    bucketManage.deleteBucket(Name)
                        .then(
                            () => {alert('删除成功');
                                dispatch(deleteStorage(Name));
                            }
                        );
                }
                }
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
                <img
                    src={stbucket}
                    alt="stbucket.png"
                    className={classnames('w-12', 'h-12')}
                />
                <div className={classnames('flex-grow')}>
                    <div className={classnames('text-blue-600')}>{Name}</div>
                    <div className={classnames('text-xs', 'text-gray-500')}>S3 bucket</div>
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
                <div className={classnames('text-xs', 'text-gray-500')}>{bucketStatus}</div>
                <div className={classnames('text-xs', 'text-gray-500', 'pr-5')}>{bucketRegion}</div>
            </div>
        </div>
    );
};

export default CStorageCard;
