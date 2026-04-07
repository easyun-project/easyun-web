//react 相关
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';

//redux 相关
import { Provider } from 'react-redux';
import store, { persist } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// API client 初始化
import { client } from '@/api-client/client.gen';
import { getHostUrl } from '@/utils/api';

client.setConfig({ baseUrl: getHostUrl() });
client.interceptors.request.use((request) => {
    const token = store.getState().user.currentUser?.token;
    const region = store.getState().dataCenter.current?.regionCode;
    if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
        if (region) request.headers.set('region', region);
    }
    const dcName = store.getState().dataCenter.current?.dcName;
    if (dcName) request.headers.set('X-Datacenter', dcName);
    return request;
});
client.interceptors.response.use((response) => {
    if (response.status === 401) {
        window.location.href = '/login';
    }
    return response;
});

//样式
import '@/assets/styles/index.css';
import '@/i18n';
//视图与组件
import routes from '@/routes';
import { Spinner } from '@/components/ui/spinner';


const App = (): JSX.Element => {
    const element = useRoutes(routes);
    return (
        <Suspense fallback={<div className="bg-black w-screen h-screen flex items-center justify-center"><Spinner className="size-16 text-purple-500" /></div>}>
            {element}
        </Suspense>
    );
};

import { Toaster } from '@/components/ui/sonner';

const root = createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
                <App />
                <Toaster position="top-center" richColors />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);
