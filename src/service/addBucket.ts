import api from '@/utils/api';
import {AddBucket} from '@/constant/apiConst';
import {Result} from '@/constant/result';

export default class bucketManage {
	
	static async addBucket<T>(addBucketInfo:any): Promise<Result<T>> {
		const result = await api.post(AddBucket, addBucketInfo,{
                        headers: {Authorization:"Bearer 4m8O3O7J1WyYNjRew4QkWP+tfbV3I0uN"}
                    });
		return result.data as Result<T>;
	}

	// static async listBucket<T>():Promise<Result<T>>{
	// 	const result = await api.post(AddBucket, addBucketInfo);
	// 	return 0 as Result<T>;
	// }
}