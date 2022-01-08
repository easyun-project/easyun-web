import appService from '@/service/appService';

export const getHost = () :string=> {
    return appService.getHost();
};

export const getHeader = (token) => {
    return {
        'Authorization': 'Bearer ' + token
    };
};
