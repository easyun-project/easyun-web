import appService from "@/service/appService";

export const getHost = () => {
    return appService.getHost()
}

export const getHeader = (token) => {
    return {
        "Authorization": "Bearer " + token
    };
}
