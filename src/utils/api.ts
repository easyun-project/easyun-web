import store from '@/redux/store';

export const getHost = ():string=> {
    // return appService.getHost();
    // 先偷一下懒
    return 'http://35.76.66.98:6660';
    // return 'http://54.156.105.123:6660';
};

export const getHeader = ():Record<string,string>=> {

    const token = store.getState().user.user.token;
    const region = store.getState().dataCenter.currentDc.basicInfo?.dcRegion;
    return region
        ? {
            'Authorization': 'Bearer ' + token,
            region
        }
        : {
            'Authorization': 'Bearer ' + token
        };
};