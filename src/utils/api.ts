import appService from "@/service/appService";

export const getHost = () => {
    return appService.getHost()
}


// /* eslint-disable @typescript-eslint/no-explicit-any*/
// const apiClient = (): any => {
// 	return axios.create({
// 		baseURL: import.meta.env.VITE_APP_BASE_API as string
// 	});
// };
//
// export default apiClient();