import store from '@/redux/store';

export const getHost = ():string=> {
    // return appService.getHost();
    // 先偷一下懒
    return 'http://54.156.105.123:6660';
};

export const getHeader = ():any=> {

    const token = store.getState().user.user.token;
    return {
        'Authorization': 'Bearer ' + token,
        'region':'us-east-1'
    };
};
