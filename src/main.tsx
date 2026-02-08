//react 相关
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';

//redux 相关
import { Provider } from 'react-redux';
import store, { persist } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

//样式
import '@/assets/styles/index.css';
import '@/i18n';
//视图与组件
import routes from '@/routes';
import { CFullLoading } from '@/components/Common/CFullLoading';


const App = (): JSX.Element => {
    const element = useRoutes(routes);
    return (
        <Suspense fallback={<CFullLoading />}>
            {element}
        </Suspense>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);
