import * as React from 'react';
import { RootState } from '@/redux/store';
import CStBucketCard from '@/components/Logic/CStorageCard/StBucketCard';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import stbucket from '@@/src/assets/images/stbucket.png';
// import stdisk from '@@/src/assets/images/stdisk.png';

const WithoutStorage = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className= 'flex flex-col justify-center items-center m-10 '>
            <div className= 'text-3xl '> Store your data on Cloud.</div>
            <div className= 'my-2 text-gray-700 '>
                Storage resource allow you to increase the amount of data storage availiable to your AWS
                Cloud resources.
            </div>
            <div className= 'flex flex-row '>
                <div className='flex flex-row mx-5 max-w-lg rounded-lg border-2 border-gray-500 border-dotted'>
                    <img src={stbucket} alt="stbucket.png" className= 'w-40 h-40 ' />
                    <div>
                        <div className= 'font-bold '>Bucket</div>
                        <div>
                            A bucket is a cloud storage resource availiable in the Amazon Lightsail object storage
                            service. Buckets are used to store objects, which consist of data and its descriptive
                            metadata.
                        </div>
                        <div className= 'text-blue-500 '>
                            <a href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
                                Learn more about buckets
                                <Icon
                                    className= 'inline-block mx-1 text-blue-500 '
                                    icon="akar-icons:link-out"
                                    width="20"
                                    height="20"
                                    fr={undefined}
                                />
                            </a>
                        </div>
                        <button className='m-5 btn-yellow'onClick={() =>navigate('/resource/object/add')}>
                            Add Bucket
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
            <div>
                <div className= 'flex flex-row justify-between items-center '>
                    <div className= 'text-center '>Sort by Type</div>
                    <div>
                        <button className='m-5 btn-yellow'onClick={() =>navigate('/resource/object/add')}>
                            Add Bucket
                        </button>
                    </div>
                </div>

                <div className= 'flex flex-wrap justify-items-center '>
                    {props.bucketList.map((item) => <CStBucketCard key={item.bucketId} {...item} />)}
                </div>
            </div>
        </>

    );
};

const BucketPage = (): JSX.Element => {
    const storageSate = useSelector((state: RootState) => state.storage);
    const { loading, bucketList } = storageSate;

    return (
        <Spin spinning={loading} tip="Loading...">
            <div>
                {bucketList?.length === 0 ? <WithoutStorage /> : <WithStorage bucketList={bucketList} />}
            </div>
        </Spin>
    );
};

export default BucketPage;
