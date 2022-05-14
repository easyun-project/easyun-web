import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Menu, Dropdown } from 'antd';
import { Icon } from '@iconify/react';
import { useNavigate,Link } from 'react-router-dom';
import { updateCurrentDC } from '@/redux/dataCenterSlice';
import { useDispatch } from 'react-redux';
import { EipInfo } from '@/constant/dataCenter';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import DataCenterService from '@/service/dataCenterService';
import { getDataCenterEip } from '@/redux/dataCenterSlice';

export default function EipCard(props:EipInfo) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dc = useSelector((state:RootState)=>state.dataCenter.currentDC.basicInfo!.dcName);
    const { tagName,pubIp,assoTarget,boarderGroup,alloId } = props;
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={()=>{
                dispatch(updateCurrentDC(props));
                navigate(pubIp);}}>
          Detail
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() =>{DataCenterService.deleteEip({
                    alloId,
                    dcName: dc,
                    pubIp
                }).then(
                    ()=>dispatch(getDataCenterEip({ dc })),
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
                    <Link to='detail' state={{ pubIp }} className={classnames('text-blue-600','text-lg')}>{tagName}</Link>
                    <div className={classnames('text-xs', 'text-gray-500')}>{alloId}</div>
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
                {assoTarget.eniType
                    ? <div className={classnames('text-xs', 'text-gray-500')}>
                        Attached to
                        {assoTarget.eniType !== 'nat_gateway'
                            ? <Link to={'/resource/server/' + assoTarget.svrId} className={classnames('text-blue-600','ml-1')}>{assoTarget.tagName}</Link>
                            : <span className={classnames('ml-1')}>{assoTarget.tagName}</span>}
                    </div>
                    : <div className={classnames('text-xs', 'text-red-500')}>Not Attached</div>
                }
                <div className={classnames('text-xs', 'text-gray-500')}>
                    <div>{pubIp}</div>
                    <div>{boarderGroup}</div>
                </div>
            </div>
        </div>
    );
}
