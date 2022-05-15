import React from 'react';
import CStVolumeCard from '@/components/Logic/CStorageCard/StVolumeCard';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Spin } from 'antd';
import stdisk from '@@/src/assets/images/stdisk.png';

const WithoutStorage = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className= 'flex flex-col justify-center items-center m-10 '>
            <div className= 'text-3xl '> Store your data on Cloud.</div>
            <div className= 'my-2 text-gray-700'>
                Storage resource allow you to increase the amount of data storage availiable to your AWS
                Cloud resources.
            </div>
            <div className= 'flex flex-row '>
                <div className= 'flex flex-row mx-5 max-w-lg rounded-lg border-2 border-gray-500 border-dotted'>
                    <img
                        src={stdisk}
                        alt="stdisk.png"
                        className= 'w-40 h-40 '
                    />
                    <div>
                        <div className= 'font-bold '>Disk</div>
                        <div>
                            Disks are storage volumes that you can mount as hard drivers on your Lightsail
                            instances. A disk persists independently from the life of the instance it is attached
                            to.
                        </div>
                        <div className= 'text-blue-500 '>
                            <a href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                                Learn more about Disk
                                <Icon
                                    className= 'inline-block mx-1 text-blue-500 '
                                    icon="akar-icons:link-out"
                                    width="20"
                                    height="20"
                                    fr={undefined}
                                />
                            </a>
                        </div>
                        <button className='btn-yellow' onClick={() => navigate('/resource/volume/add')}>
                        Add Volume
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WithStorage = (props): JSX.Element => {
    const navigate = useNavigate();
    return (
        <>
            <div className= 'flex justify-between items-center '>
                <div className= 'text-center '>Sort by Type</div>
                <div>
                    <button className='m-5 btn-yellow'onClick={() =>navigate('/resource/volume/add')}>
                            Add Volume
                    </button>
                </div>
            </div>

            <div className= 'flex flex-wrap justify-items-center '>
                {props.volumeList.map(vol =>
                    <CStVolumeCard key={vol.volumeId} {...vol} />
                )}
            </div>
        </>

    );
};

const VoluemPage = (): JSX.Element => {
    const storageSate = useSelector((state: RootState) => state.storage);
    const { volumeList,loading } = storageSate;


    return (
        <Spin spinning={loading} tip="Loading...">
            <div>
                {volumeList.length === 0 ? <WithoutStorage /> : <WithStorage volumeList={volumeList} />}
            </div>
        </Spin>
    );
};

export default VoluemPage;
