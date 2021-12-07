import React from 'react';
import {CHeader} from '@/components/Logic/CHeader';
import {CFooter} from '@/components/Logic/CFooter';
import {CButton} from '@/components/Common/CButton';
import {classnames} from '@@/tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => (
	<div>
		<CHeader/>
		<NoData/>
		<CFooter/>
	</div>
);


const NoData = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<div className={classnames('m-20', 'flex', 'flex-col', 'items-center', 'h-screen')}>
			<div className={classnames('text-3xl', 'm-10')}>you have no datacenter right now.</div>
			<div>
				<CButton
					click={() => navigate('/datacenter')}
					classes={classnames('bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5','py-3')}>Add
                    Datacenter
				</CButton>
			</div>
		</div>
	);
};

export default Home;
