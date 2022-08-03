import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Menu, Dropdown } from 'antd';
import { Icon } from '@iconify/react';
import { useNavigate, Link } from 'react-router-dom';
import { updateCurrentDC } from '@/redux/dataCenterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StaticIpInfo } from '@/constant/dataCenter';
import { RootState } from '@/redux/store';
import StaticIPService from '@/service/dcmStaticipServices';
import { listAllStaticIp } from '@/redux/staticipSlice';


export default function EipCard(props:StaticIpInfo) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dc = useSelector((state:RootState)=>state.dataCenter.current!.dcName);
    const { tagName, publicIp, assoTarget, boarderGroup, eipId } = props;
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={()=>{
                dispatch(updateCurrentDC(props));
                navigate(publicIp);}}>
          Detail
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() =>{StaticIPService.delete({
                    eipId,
                    dcName: dc,
                    publicIp
                }).then(
                    ()=>dispatch(listAllStaticIp({ dc })),
                    err=>alert(err));}
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
                <Icon icon="iconoir:ip-address" color="#e9862e" width="60"fr={undefined}/>
                <div className='grow ml-2' >
                    <Link to='detail' state={{ publicIp }} className={classnames('text-blue-600', 'text-lg')}>{tagName}</Link>
                    <div className={classnames('text-xs', 'text-gray-500')}>{eipId}</div>
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
                    'justify-between',
                    'border-t-2',
                    'items-center',
                    'border-gray-300',
                    'border-dashed',
                    'mx-2'
                )}
            >
                {assoTarget.eniId
                    ? <div className={classnames('text-xs', 'text-gray-500')}>
                        Attached to
                        {assoTarget.eniType !== 'nat_gateway'
                            ? <Link to={'/resource/server/' + assoTarget.svrId} className='ml-1 text-blue-600'>{assoTarget.tagName}</Link>
                            : <span className={classnames('ml-1')}>{assoTarget.tagName}</span>}
                    </div>
                    : <div className={classnames('text-xs', 'text-red-500')}>Not Attached</div>
                }
                <div className={classnames('text-xs', 'text-gray-500')}>
                    <div>{publicIp}</div>
                    <div>{boarderGroup}</div>
                </div>
            </div>
        </div>
    );
}
