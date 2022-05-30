import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { classnames } from '@@/tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import CStorageCard from '@/components/Logic/CStorageCard/StBucketCard';
import { CButton } from '@/components/Common/CButton';
import { CPartialLoading } from '@/components/Common/CPartialLoading';

import { updateStorage } from '@/redux/storageSlice';

// import { UserModel } from '@/constant/user';
// import database from '@@/src/assets/images/resource/stbucket.png';



const DatabasePage = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className={classnames('m-20', 'flex', 'flex-col', 'items-center', 'h-screen')}>
            <div className={classnames('text-3xl', 'm-1')}>you have no database right now.</div>
            <div className={classnames('text-sm', 'm-1')}>
                Add a cloud database and get started with Easyun!
            </div>
            <div>
                <button
                    onClick={() => navigate('/database/add')}
                    className={classnames('btn-yellow')}>
                    Add Database
                </button>
            </div>
        </div>
    );

};
export default DatabasePage;
