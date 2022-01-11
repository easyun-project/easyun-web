import appService from '@/service/appService';
import store from '@/redux/store';

export const getHost = ():string=> {
    return appService.getHost();
};

export const getHeader = ():any=> {

    const token = store.getState().user.user.token;
    return {
        'Authorization': 'Bearer ' + token
    };
};
