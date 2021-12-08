import React,{useState} from 'react';
import { CHeader } from '@/components/Logic/CHeader';
import { CFooter } from '@/components/Logic/CFooter';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';

const AddBucket = (): JSX.Element => {
	const [BucketEncryption, changeBucketEncryp] = useState(false);
	const [VersioningConfiguration, changeVerConfig] = useState(true);
	const m = 123;
	const region_city = 'Virginia';
	const region = 'us-east-1';
	return (
		<div>
			<CHeader/>
			<div id="add-s3bucket-title" className={classnames('mx-5','my-8','text-3xl')}>
				<Icon className={classnames('mx-5','inline-block')} icon="fluent:add-circle-20-regular" width="50" height="50" fr={undefined}/>
				Add Cloud Storage(S3 Bucket)
			</div>
			<div id="select your bucket location">
				<div className={classnames('mx-5','text-2xl',)}>Select your bucket location</div>
				&nbsp;
				<div className={classnames('mx-5','flex','flex-row')}>
					<div className={classnames('mx-5','flex','flex-row')}>
						<Icon icon="emojione-v1:flag-for-united-states" color="#7c898a" width="60" height="60" fr={undefined}/>
						<div>
							<div className={classnames('mx-2','font-bold')}>{`${region_city}`}</div>
							<div className={classnames('mx-2')}>{`${region}`}</div>
						</div>
					</div>
					<div>
						<div className={classnames('mx-5')}>You are creating this bucket in {`${region_city}`}, all zones ({`${region}`})</div>
						<div className={classnames('mx-5','text-yellow-550')}> 
							<Icon className={classnames('inline-block')} icon="fluent:note-edit-20-regular" color="#ce6627" width="30"
					  height="30" fr={undefined}/>Change AWS Region</div>
					</div>
				</div>
			</div>
			&nbsp;
			&nbsp;
			&nbsp;
			<div id="identify-your-server-form">
				<div className={classnames('mx-5','text-2xl')}>Identify your Bucket</div>
				<div className={classnames('mx-5')}>The name of your bucket must be unique across all of Amazon Lightsail and Amazon S3. It must also be lower-case, and DNS-compliant.</div>
				<div className={classnames('mb-5', 'mt-2', 'mx-2')}>
					<input className={classnames('border', 'w-72', 'h-10', 'px-1', 'py-3', 'mx-3')} type="text" defaultValue={`bucket-easyun-test${m}`}/>
				</div>
				<div className={classnames('mx-5', 'text-gray-400')}>The domain of your bucket will be:</div>
				<div className={classnames('mx-5', 'text-black','font-bold')}>{`bucket-easyun-test${m}.s3.us-east-1.amazonaws.com`}</div>
				&nbsp;
				{/* 两个开关组件，点击图标可以改变状态. */}
				{/* 加密管理组件 */}
				<div className={classnames('flex','flex-row')}>
					{BucketEncryption?
						(<div>
							<Icon className={classnames('mx-5')} icon="bi:toggle-on" color="#ce6627" width="50" height="50" fr={undefined} onClick={() => {
								changeBucketEncryp(!BucketEncryption);
							}}/>
							<div className={classnames('flex','flex-col')}>
								<div className={classnames('mx-5','text-black','font-bold')}>Encryption is enabled</div>
								<div className={classnames('mx-5', 'max-w-lg','text-gray-400')}>Automatiacally encrypt new objects stored in this bucket. Default Server-side encryption by Amazon S3 key (SSE-S3).</div>
							</div>
						</div>):
						(<div>
							<Icon className={classnames('mx-5')} icon="bi:toggle-off" color="#7c898a" width="50" height="50" fr={undefined} onClick={() => {
								changeBucketEncryp(!BucketEncryption);
							}}/> 
							<div className={classnames('flex','flex-col')}>
								<div className={classnames('mx-5','text-black','font-bold')}>Encryption is disabled</div>
								<div className={classnames('mx-5', 'max-w-lg','text-gray-400')}>New objects stored in this bucket will not be automatiacally encrypted.</div>
							</div>
						</div>)
					}
				&nbsp;
					{/* 版本管理组件 */}
					{VersioningConfiguration?
						(<div>
							<Icon className={classnames('mx-5')} icon="bi:toggle-on" color="#ce6627" width="50" height="50" fr={undefined} onClick={() => {
								changeVerConfig(!VersioningConfiguration);
							}}/>
							<div className={classnames('flex','flex-col')}>
								<div className={classnames('mx-5','text-black','font-bold')}>Versioning is enabled</div>
								<div className={classnames('mx-5', 'text-gray-400')}>Changed versions of your object will be stored.</div>
							</div>
						</div>):
						(<div>
							<Icon className={classnames('mx-5')} icon="bi:toggle-off" color="#7c898a" width="50" height="50" fr={undefined} onClick={() => {
								changeVerConfig(!VersioningConfiguration);
							}}/> 
							<div className={classnames('flex','flex-col')}>
								<div className={classnames('mx-5','text-black','font-bold')}>Versioning is disabled</div>
								<div className={classnames('mx-5', 'text-gray-400')}>Changed versions of your object are not being stored.</div>
							</div>
						</div>)
					}
				
				</div>
			</div>
			<CFooter/>
		</div>
	);
};


export default AddBucket;