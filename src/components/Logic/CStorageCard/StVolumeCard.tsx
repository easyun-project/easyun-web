import React from 'react';
import { Icon } from '@iconify/react';
import { Menu, Dropdown, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { StVolumeInfo } from '@/constant/storage';
// import serverService from '@/service/serverService';
import VolumeService from '@/service/stVolumeService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { listAllVolume } from '@/redux/stvolumeSlice';



const CStVolumeCard = (props: StVolumeInfo): JSX.Element => {
    const { volumeId, volumeAz, volumeSize, volumeAttach } = props;
    const navigate = useNavigate();
    const dcName = useSelector((state: RootState) => state.dataCenter.current!.dcName);
    const dispatch = useDispatch();
    const menu = (
        <Menu>
            <Menu.Item key="manage" onClick={() => {
                navigate(`/resource/volume/${volumeId}`, { state: props });
            }}>
                Manage
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={()=>{
                    //TODO:此处还需要解绑一下
                    VolumeService.deleteVolume({ dcName, volumeIds: [ volumeId ] }).then(()=>
                    {
                        dispatch(listAllVolume({ dc: dcName }));
                        message.info('Delete volume success');
                    });
                }}
            >
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className= 'flex flex-col p-2 my-4 mx-8 w-96 bg-gray-200 rounded border'>
                <div className= 'flex flex-row mb-2 '>
                    <Icon icon="clarity:storage-line" width="36" color='#FF8C00' inline={true} />
                    <div className='grow ml-2'>
                        <Link to={`${volumeId}`} className='ml-1 text-blue-600'>
                            {volumeId}
                        </Link>
                        <div className= 'text-xs text-gray-500 '>{volumeSize} GiB</div>
                    </div>
                    <Dropdown overlay={menu}>
                        <Icon
                            icon="fluent:more-vertical-20-filled"
                            fr={undefined}
                            className= 'hover:bg-yellow-650 cursor-pointer '
                        />
                    </Dropdown>
                </div>
                <div className= 'flex flex-row justify-between border-t-2 border-gray-300 border-dashed'>
                    <div className= 'text-xs text-gray-500 '>
                        {
                            volumeAttach.length === 0
                                ? 'Not attached'
                                : <>
                                    Attached to
                                    {volumeAttach.map((svr, index)=>
                                        <Link to={'/resource/server/' + svr.svrId} className='ml-1 text-blue-600' key={svr.svrId + volumeId}>
                                            <span>
                                                <span>{svr.svrId}</span>
                                                <span>{index === volumeAttach.length - 1 ? '' : ','}</span>
                                            </span>
                                        </Link>)
                                    }
                                </>
                        }
                    </div>
                    <div className= 'pr-5 text-xs text-gray-500 '>{volumeAz}</div>
                </div>
            </div>
        </>

    );
};

export default CStVolumeCard;
