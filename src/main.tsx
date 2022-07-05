//react 相关
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import { Route } from 'react-router';
import { BrowserRouter, useRoutes } from 'react-router-dom';

//redux 相关
import { Provider } from 'react-redux';
import store, { persist } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

//样式
import 'antd/dist/antd.less';//原有是antd.css  只需要改为less就可以啦
import '@/assets/styles/index.css';
import '@/i18n';
//视图与组件
import routes from '@/routes';
import { CFullLoading } from '@/components/Common/CFullLoading';


import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
    const element = useRoutes(routes);
    return (
        <Suspense fallback={<CFullLoading />}>
            {element}
        </Suspense>
    );
};

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persist}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </QueryClientProvider>,
    document.getElementById('root')
);
