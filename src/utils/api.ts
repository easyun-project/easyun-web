import store from "../redux/store";

export const getHost = () => {
    return store.getState().app.host
}


// /* eslint-disable @typescript-eslint/no-explicit-any*/
// const apiClient = (): any => {
// 	return axios.create({
// 		baseURL: import.meta.env.VITE_APP_BASE_API as string
// 	});
// };
//
// export default apiClient();