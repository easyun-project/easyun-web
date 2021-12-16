import api from '@/utils/api';
import {AddBucket} from '@/constant/apiConst';
import {Result} from '@/constant/result';

export default class bucketManage {
	static async addBucket<T>(addBucketInfo:any): Promise<Result<T>> {
		const result = await api.post(AddBucket, addBucketInfo);
		return result.data as Result<T>;
	}
}