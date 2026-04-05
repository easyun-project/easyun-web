import React from 'react';
// 主模块视图
import AppRouter  from '@/index';
import NotFound from '@/views/NotFound';
import Home from '@/views/Home';
import Resource from '@/views/Resource';
import DataCenter from '@/views/DataCenter';
import Dashboard from '@/views/Dashboard';
import LoginPage from '@/views/Login';
import Account from '@/views/Account';
import Event from '@/views/Event';
//子视图
import accountRoutes from '@/routes/AccountRoutes';
import datacenterRoutes from '@/routes/DatacenterRoutes';
import resourceRoutes from '@/routes/ResourceRoutes';

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';



const appRoutes = [
    {
        path:'home',
        element:<Home />
    },
    {
        path:'datacenter',
        element:<DataCenter />,
        children:datacenterRoutes
    },
    {
        path:'resource',
        element:<Resource />,
        children:resourceRoutes
    },
    {
        path:'dashboard',
        element:<Dashboard />
    },
    {
        path:'account',
        element:<Account />,
        children:accountRoutes
    },
    {
        path:'event',
        element:<Event />
    },
    {
        path:'*',
        element:<NotFound />
    },
];

export default [
    {
        path:'/',
        element:<RequireAuth><Navigate to="/home"/></RequireAuth>
    },
    {
        path:'/login',
        element:<LoginPage />
    },
    {
        path:'/datacenter',
        element:<Navigate to="/datacenter/overview"/>
    },
    {
        path:'/resource',
        element:<Navigate to="/resource/overview"/>,
    },
    {
        path:'/account',
        element:<Navigate to="/account/profile"/>
    },
    {
        path:'*',
        element:<RequireAuth><AppRouter /></RequireAuth>,
        // element:<AppRouter />,
        children:appRoutes
    },
];

//权限路由写法
function RequireAuth({ children }: { children: JSX.Element }) {
    const token = useSelector((state: RootState) => state.user.currentUser?.token);
    const loginTime = useSelector((state: RootState) => state.user.currentUser?.loginTime);

    if (!token || (loginTime && Date.now() - loginTime > 7200000)) {
        return <Navigate to="/login" replace/>;
    }
    return children;
}
