import appService from '@/service/appService';
import store from '@/redux/store';

interface tokenHeader{
    'Authorization': string;
}

export const getHost = ():string=> {
    return appService.getHost();
};

export const getHeader = ():tokenHeader => {

    const token = store.getState().user.user.token;
    return {
        'Authorization': 'Bearer ' + token
    };
};
