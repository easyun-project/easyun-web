import React from 'react';
import { Icon } from '@iconify/react';
import { Menu, Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VolumeInfo } from '@/constant/storage';


const CStVolumeCard = (props: VolumeInfo): JSX.Element => {
    const { volumeId,volumeAz,volumeSize } = props;
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
            <Menu.Item
                danger
                key="delete"
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
                        <div className= 'text-blue-600 '>
                            <span className='cursor-pointer' onClick={() => {
                                navigate(`/resource/volume/${volumeId}`, { state: props });
                            }}>{volumeId}</span>
                        </div>
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
                    <div className= 'text-xs text-gray-500 '>status</div>
                    <div className= 'pr-5 text-xs text-gray-500 '>{volumeAz}</div>
                </div>
            </div>
        </>

    );
};

export default CStVolumeCard;
