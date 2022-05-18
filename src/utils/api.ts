import store from '@/redux/store';


export const getHostUrl = ():string | undefined=> {
    // fix-me: Uncaught ReferenceError: can't access lexical declaration 'store' before initialization
    // const hostUrl = store.getState().app.hostUrl;
    const hostUrl = localStorage.getItem('server');
    if (hostUrl) {
        return hostUrl;
    } else {
        // 如未定义，暂时初始化为demo环境后端地址
        return 'http://35.76.66.98:6660';
    }
};

export const getHeader = ():Record<string,string> | undefined=> {

    const token =  store.getState().user.currentUser.token;
    const region = store.getState().dataCenter.currentDC?.basicInfo?.dcRegion;
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