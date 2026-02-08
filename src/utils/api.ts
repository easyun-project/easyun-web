import store from '@/redux/store';


export const getHostUrl = (): string => {
    return localStorage.getItem('server') || import.meta.env.VITE_APP_BASE_API || 'http://localhost:6660';
};

export const getHeader = ():Record<string, string> | undefined=> {

    const token =  store.getState().user.currentUser.token;
    const region = store.getState().dataCenter.current?.regionCode;
    // 如果redux中没有token，则跳转至登录页面
    if(token)
    {return region
        ? {
            'Authorization': 'Bearer ' + token,
            region
        }
        : {
            'Authorization': 'Bearer ' + token
        };}
    else{
        window.location.href = '/login';
        return;
    }
};