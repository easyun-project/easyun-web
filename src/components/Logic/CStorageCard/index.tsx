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
		<div className={classnames('bg-gray-300', 'border-2','max-w-sm','rounded', 'p-10', 'pt-5', 'm-5')}>
			<div>{bucketName}</div>
			<div>{storageType}</div>
			<div>{isPrivate}</div>
			<div>{region}</div>
		</div>
	);
};

export default CStorageCard;