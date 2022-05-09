import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { StBucketParms } from '@/constant/storage';
import bucketManage from '@/service/stBucketService';


const AddBucket = (): JSX.Element => {
    const navigate = useNavigate();
    const defaultBucketName = 'bucket-easyun-test' + parseInt(Math.random() * 900 + 100 + '', 10);
    const regionCity = 'Virginia';
    const region = 'us-east-1';
    const [bucketName, changeBucketName] = useState(defaultBucketName);
    const [bucketEncryption, changeBucketEncryp] = useState(false);
    const [versioningConfiguration, changeVerConfig] = useState(true);

    return (
        <>
            <div id="add-s3bucket-title" className= 'my-8 mx-5 text-3xl '>
                <Icon
                    className= 'inline-block mx-5 '
                    icon="fluent:add-circle-20-regular"
                    width="50"
                    height="50"
                    fr={undefined}
                />
        Add Cloud Storage(S3 Bucket)
            </div>
            <div id="select your bucket location">
                <div className= 'mx-5 text-2xl '>Select your bucket location</div>
        &nbsp;
                <div className= 'flex flex-row mx-5 '>
                    <div className= 'flex flex-row mx-5 '>
                        <Icon
                            icon="emojione-v1:flag-for-united-states"
                            color="#7c898a"
                            width="60"
                            height="60"
                            fr={undefined}
                        />
                        <div>
                            <div className= 'mx-2 font-bold '>{regionCity}</div>
                            <div className= 'mx-2 '>{region}</div>
                        </div>
                    </div>
                    <div>
                        <div className= 'mx-5 '>
              You are creating this bucket in {regionCity}, all zones ({`${region}`})
                        </div>
                        <div className= 'mx-5 text-yellow-550 '>
                            <Icon
                                className= 'inline-block '
                                icon="fluent:note-edit-20-regular"
                                color="#ce6627"
                                width="30"
                                height="30"
                                fr={undefined}
                            />
              Change AWS Region
                        </div>
                    </div>
                </div>
            </div>
      &nbsp; &nbsp; &nbsp;
            <div id="identify-your-server-form">
                <div className= 'mx-5 text-2xl '>Identify your Bucket</div>
                <div className= 'mx-5 '>
          The name of your bucket must be unique across all of Amazon Lightsail and Amazon S3. It
          must also be lower-case, and DNS-compliant.
                </div>
                <div className= 'mx-2 mt-2 mb-5 '>
                    {/* bucketname输入框 */}
                    <input
                        className= 'py-3 px-1 mx-3 w-72 h-10 border '
                        type="text"
                        defaultValue={defaultBucketName}
                        onInput={(e) => {
                            changeBucketName(e.currentTarget.value);
                        }}
                    />
                </div>
                <div className= 'mx-5 text-gray-400 '>
          The domain of your bucket will be:
                </div>
                <div
                    className= 'mx-5 font-bold text-black '
                >{`${bucketName}.s3.us-east-1.amazonaws.com`}</div>
        &nbsp;
                {/* 两个开关组件，点击图标可以改变状态. */}
                {/* 加密管理组件 */}
                <div className= 'flex flex-row '>
                    {bucketEncryption
                        ? (
                            <div>
                                <Icon
                                    className= 'mx-5 '
                                    icon="bi:toggle-on"
                                    color="#ce6627"
                                    width="50"
                                    height="50"
                                    fr={undefined}
                                    onClick={() => {
                                        changeBucketEncryp(!bucketEncryption);
                                    }}
                                />
                                <div className= 'flex flex-col '>
                                    <div className= 'mx-5 font-bold text-black '>
                  Encryption is enabled
                                    </div>
                                    <div className= 'mx-5 max-w-lg text-gray-400 '>
                  Automatiacally encrypt new objects stored in this bucket. Default Server-side
                  encryption by Amazon S3 key (SSE-S3).
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div>
                                <Icon
                                    className= 'mx-5 '
                                    icon="bi:toggle-off"
                                    color="#7c898a"
                                    width="50"
                                    height="50"
                                    fr={undefined}
                                    onClick={() => {
                                        changeBucketEncryp(!bucketEncryption);
                                    }}
                                />
                                <div className= 'flex flex-col '>
                                    <div className= 'mx-5 font-bold text-black '>
                  Encryption is disabled
                                    </div>
                                    <div className= 'mx-5 max-w-lg text-gray-400 '>
                  New objects stored in this bucket will not be automatiacally encrypted.
                                    </div>
                                </div>
                            </div>
                        )}
          &nbsp;
                    {/* 版本管理组件 */}
                    {versioningConfiguration
                        ? (
                            <div>
                                <Icon
                                    className= 'mx-5 '
                                    icon="bi:toggle-on"
                                    color="#ce6627"
                                    width="50"
                                    height="50"
                                    fr={undefined}
                                    onClick={() => {
                                        changeVerConfig(!versioningConfiguration);
                                    }}
                                />
                                <div className= 'flex flex-col '>
                                    <div className= 'mx-5 font-bold text-black '>
                  Versioning is enabled
                                    </div>
                                    <div className= 'mx-5 text-gray-400 '>
                  Changed versions of your object will be stored.
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div>
                                <Icon
                                    className= 'mx-5 '
                                    icon="bi:toggle-off"
                                    color="#7c898a"
                                    width="50"
                                    height="50"
                                    fr={undefined}
                                    onClick={() => {
                                        changeVerConfig(!versioningConfiguration);
                                    }}
                                />
                                <div className= 'flex flex-col '>
                                    <div className= 'mx-5 font-bold text-black '>
                  Versioning is disabled
                                    </div>
                                    <div className= 'mx-5 text-gray-400 '>
                  Changed versions of your object are not being stored.
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
            <div>
                <button className='btn-yellow'>
          Back
                </button>
                <button className='btn-yellow'
                    onClick={ async () => {
                        const StBucketParms = {
                            bucketName: bucketName,
                            versioningConfiguration: versioningConfiguration ? 'Enabled' : 'Suspended',
                            bucketEncryption: bucketEncryption.toString(),
                            region: region,
                        };
                        bucketManage.addBucket<StBucketParms>(StBucketParms).then(()=>{
                            alert('创建成功');
                            navigate('/resource/bucket');
                        });
                    }
                    }
                >
          Create
                </button>
            </div>
        </>
    );
};

export default AddBucket;
