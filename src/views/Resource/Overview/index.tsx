import * as React from 'react';
// import { CHeader } from '@/components/Logic/CHeader';
// import { CFooter } from '@/components/Logic/CFooter';
import { RootState } from '@/redux/store';
import CStorageCard from '@/components/Logic/CStorageCard';
import { CButton } from '@/components/Common/CButton';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateStorage } from '@/redux/storageSlice';
import bucketManage from '@/service/storageService';
// import { UserModel } from '@/constant/user';

import stbucket from '@@/src/assets/images/stbucket.png';
import stdisk from '@@/src/assets/images/stdisk.png';



export const ResourceOverview = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className={classnames('m-20', 'flex', 'flex-col', 'items-center')}>
            <div className={classnames('text-3xl', 'm-1')}>this resource overview page</div>
            <div className={classnames('text-sm', 'm-1')}>
                this overview page will show you a summary resource usage.
            </div>
            <div>

            </div>
        </div>
    );

};
export default ResourceOverview;
