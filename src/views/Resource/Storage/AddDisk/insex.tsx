import React from 'react';
import { CHeader } from '@/components/Logic/CHeader';
import { CFooter } from '@/components/Logic/CFooter';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import CPlatform from '@/components/Logic/CPlatform';

const AddDisk = (): JSX.Element => {
	return (
		<div>
			<CHeader/>
			<div>正在施工，敬请期待~</div>
			<CFooter/>
		</div>
	);
};


export default AddDisk;