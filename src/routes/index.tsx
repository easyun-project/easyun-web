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
//权限路由所需
import store from '@/redux/store';



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
        element:<Navigate to='/login' />
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
        children:appRoutes
    },
];

//权限路由写法
function RequireAuth({ children }: { children: JSX.Element }) {
    const token = store.getState().user.currentUser.token;
    const loginTime = store.getState().user.currentUser.loginTime;
    // const location = useLocation();
    // const token = localStorage.getItem('token');

    if (!token || Date.now() - loginTime > 7200000) {
        //如果未登录或者上次登录时间已超过2小时
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
        // return <Navigate to="/login" state={{ from: location }} replace />;
        return <Navigate to="/login" replace/>;
    }
    return children;
}
