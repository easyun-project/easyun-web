import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Menu, Dropdown } from 'antd';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { DataCenterInfo } from '@/constant/dataCenter';
import { deleteDataCenter, updateCurrentDc,getDataCenterEip } from '@/redux/dataCenterSlice';
import { useDispatch } from 'react-redux';
import { getServerList } from '@/redux/serverSlice';
import { getDataCenterSecgroup,getDataCenterSubnet } from '@/redux/dataCenterSlice';

export default function DataCenterCard(props:DataCenterInfo) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dcName,vpcCidr,dcRegion,vpcID } = props;
    // this function is used to initialize a datacenter
    // use async to make sure the requests are not lost
    const initDc = async ()=>{
        dispatch(updateCurrentDc(props));
        dispatch(getServerList());
        dispatch(getDataCenterSecgroup({ dc:dcName }));
        dispatch(getDataCenterEip({ dc:dcName }));
        dispatch(getDataCenterSubnet({ dc:dcName }));
    };
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={()=>{
                initDc().then(()=>navigate('/resource'));
            }}>
          Resource
            </Menu.Item>
            <Menu.Item key="manage" onClick={()=>{
                initDc().then(()=>navigate('/datacenter'));
            }}>
          Manage
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() => {
                    dispatch(deleteDataCenter(dcName));
                    navigate('/home');
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
                'rounded-border',
                'w-96',
                'p-2'
            )}
        >
            <div className={classnames('flex', 'flex-row', 'mb-2')}>
                {/* <img
                    src={stbucket}
                    alt="stbucket.png"
                    className={classnames('w-12', 'h-12')}
                /> */}
                <Icon icon="ic:round-cloud-circle" color="#e9862e" width="60" />
                <div className='grow ml-2' >
                    <a className={classnames('text-blue-600','text-lg')} onClick={()=>{initDc().then(()=>navigate('/resource'));}}>{dcName}</a>
                    <div className={classnames('text-xs', 'text-gray-500')}>{vpcID}</div>
                </div>
                <Dropdown overlay={menu}>
                    <Icon
                        icon="fluent:more-vertical-20-filled"
                        width="20"
                        fr={undefined}
                        className={classnames('cursor-pointer', 'hover:text-yellow-550')}
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
                    'border-dashed',
                    'mx-2'
                )}
            >
                <div className={classnames('text-xs', 'text-gray-500')}>{vpcCidr}</div>
                <div className={classnames('text-xs', 'text-gray-500')}>{dcRegion}</div>
            </div>
        </div>
    );
}
