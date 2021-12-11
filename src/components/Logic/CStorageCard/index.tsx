import React from 'react';
import {classnames, TTailwindString} from '@@/tailwindcss-classnames';
import {Icon} from '@iconify/react';

interface StorageCardInfo{
    class?:TTailwindString,
    bucketName:string,
    bucketUrl:string,
    storageType:string,
    isPrivate:string,
    region:string
}

const CStorageCard =(props:StorageCardInfo): JSX.Element => {

	const {bucketName,storageType,isPrivate,region} = props;

	return (
		<div className={classnames('flex','flex-col','bg-gray-200', 'border','w-96','rounded', 'p-2', 'm-5')}>
			<div className={classnames('flex','flex-row','mb-2')}>
			<img src="../src/assets/images/stbucket.png"  alt="stbucket.png" className={classnames("w-12",'h-12')}/>
			<div className={classnames('flex-grow')}>
				<div className={classnames("text-blue-600")}>{bucketName}</div>
				<div className={classnames('text-xs','text-gray-500')}>{storageType}</div>
			</div>
			<Icon icon="fluent:more-vertical-20-filled" fr={undefined} className={classnames('cursor-pointer','hover:bg-yellow-650')}/>
			</div>
			<div className={classnames('flex','flex-row','justify-between','border-t-2','border-gray-300','border-dashed')}>
				<div className={classnames('text-xs','text-gray-500')}>{isPrivate}</div>
				<div className={classnames('text-xs','text-gray-500','pr-5')}>{region}</div>
			</div>
		</div>
	);
};

export default CStorageCard;