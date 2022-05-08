import store from '@/redux/store';

export const getHost = ():string=> {
    // return appService.getHost();
    // 先偷一下懒
    return 'http://35.76.66.98:6660';
    // return 'http://54.156.105.123:6660';
};

export const getHeader = ():Record<string,string> | undefined=> {

    const token = localStorage.getItem('token') ? localStorage.getItem('token') : store.getState().user.currentUser.token;
    // const token =  store.getState().user.currentUser.token;
    const region = store.getState().dataCenter.currentDC?.basicInfo?.dcRegion;
    // 如果缓存及redux中都没有token，则跳转至登录页面
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