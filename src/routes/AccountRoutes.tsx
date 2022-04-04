import React from 'react';
import NotFound from '@/views/NotFound';
//accout视图
import Profile from '@/views/Account/profile';
import Quotas from '@/views/Account/quotas';
import Reminder from '@/views/Account/reminder';
import Keypair from '@/views/Account/keypair';




export default [
    {
        path:'profile',
        element:<Profile />
    },
    {
        path:'reminder',
        element:<Reminder />
    },
    {
        path:'keypair',
        element:<Keypair />
    },
    {
        path:'quotas',
        element:<Quotas />
    },
    {
        path:'*',
        element:<NotFound />
    },
];