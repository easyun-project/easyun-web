import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import store, {persist} from '@/redux/store';
import '@/assets/styles/index.css';

import '@/i18n';
import {CFullLoading} from '@/components/Common/CFullLoading';
import {Route} from 'react-router';
import NotFound from '@/views/NotFound';
import Home from '@/views/Home';
import DataCenter from '@/views/DataCenter';
import Resource from '@/views/Resource';
import AddServer from '@/views/Resource/Server/AddServer';
import AddBucket from '@/views/Resource/Storage/AddBucket';
import AddDisk from '@/views/Resource/Storage/AddDisk/insex';
import LoginPage from '@/views/Login';
import Account from '@/views/Account';
import Event from '@/views/Event';
import {PersistGate} from "redux-persist/integration/react"; //原有是antd.css  只需要改为less就可以啦
import "antd/dist/antd.less";
import ServerDetail from "@/views/Resource/Server/ServerDetail";


const App = (): JSX.Element => {
    return (
        <Suspense fallback={<CFullLoading/>}>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="dataCenter" element={<DataCenter/>}/>
                <Route path="resource">
                    <Route index element={<Resource/>}/>
                    <Route path="addServer" element={<AddServer/>}/>
                    <Route path="server/:serverId" element={<ServerDetail/>}/>
                    <Route path="addBucket" element={<AddBucket/>}/>
                    <Route path="addDisk" element={<AddDisk/>}/>
                </Route>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="404" element={<NotFound/>}/>
                <Route path='account' element={<Account/>}/>
                <Route path="event" element={<Event />} />
            </Routes>
        </Suspense>
    );
};


ReactDOM.render(
    <BrowserRouter>
        <PersistGate loading={null} persistor={persist}>
            <Provider store={store}>
                <App/>
            </Provider>
        </PersistGate>
    </BrowserRouter>,
    document.getElementById('root')
);
