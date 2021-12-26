import React, { useEffect } from 'react';
import { CHeader } from '@/components/Logic/CHeader';
import { CFooter } from '@/components/Logic/CFooter';
import { CButton } from '@/components/Common/CButton';
import { classnames } from '@@/tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDataCenter } from '@/redux/dataCenterSlice';
import { RootState } from '@/redux/store';

const Home = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector((state: RootState) => {
        return state.user.user;
    });
    const dataCenterState = useSelector((state: RootState) => {
        return state.dataCenter;
    });

    // useEffect(() => {
    //     dispatch(getDataCenter(userState!.token));
    // }, [dispatch]);


    const dataCenter = dataCenterState.dataCenter;
    // 这里不知道为什么会显示没有数据数据中心，先无论如何跳转一下，后续再debug
    if (dataCenter) {
        navigate('/resource');
        return <div/>;
    } else {
        navigate('/resource');
        return (
            <div>
                <NoData/>
            </div>
        );
    }
};


const NoData = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className={classnames('m-20', 'flex', 'flex-col', 'items-center', 'h-screen')}>
            <div className={classnames('text-3xl', 'm-10')}>you have no datacenter right now.</div>
            <div>
                <CButton
                    click={() => navigate('/datacenter')}
                    classes={classnames('bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-3')}>Add
                    Datacenter
                </CButton>
            </div>
        </div>
    );
};

export default Home;
