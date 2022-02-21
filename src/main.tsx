//react 相关
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter, Routes, Navigate } from 'react-router-dom';

//redux 相关
import { Provider } from 'react-redux';
import store, { persist } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

//样式
import 'antd/dist/antd.less';//原有是antd.css  只需要改为less就可以啦
import '@/assets/styles/index.css';
import '@/i18n';
//视图与组件
import NotFound from '@/views/NotFound';
import Home from './views/Home';
import { Resource } from '@/views/Resource';
import DataCenter from '@/views/DataCenter';
import Dashboard from './views/Dashboard';
import LoginPage from '@/views/Login';
import Account from '@/views/Account';
import Event from '@/views/Event';
import { CFullLoading } from '@/components/Common/CFullLoading';
import { CHeader } from './components/Logic/CHeader';
import { CFooter } from './components/Logic/CFooter';


const AppRouter = (): JSX.Element => {
    return(<>
        <CHeader/>
        <Routes>
            <Route path="dataCenter/*" element={<DataCenter />} />
            <Route path="home/*" element={<Home />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="account/*" element={<Account />} />
            <Route path="account" element={<Navigate to="/account/profile" />} />
            <Route path="event/*" element={<Event />} />
            <Route path="resource/*" element={<Resource />} />
            <Route path="resource" element={<Navigate to="/resource/server" />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <CFooter />
    </>);
};

const App = (): JSX.Element => {
    return (
        <Suspense fallback={<CFullLoading />}>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path ="*" element={< AppRouter />} />
            </Routes>
        </Suspense>
    );
};

ReactDOM.render(
    <BrowserRouter>
        <PersistGate loading={null} persistor={persist}>
            <Provider store={store}>
                <App />
            </Provider>
        </PersistGate>
    </BrowserRouter>,
    document.getElementById('root')
);
