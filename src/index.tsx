import React from 'react';
import { Outlet } from 'react-router-dom';
import { CHeader } from '@/components/Logic/CHeader';
import { CFooter } from '@/components/Logic/CFooter';

export default function AppRouter() {
    return (<div className='flex flex-col min-h-screen'>
        <CHeader />
        <div className='grow'>
            <Outlet />
        </div>
        <CFooter />
    </div>);
};