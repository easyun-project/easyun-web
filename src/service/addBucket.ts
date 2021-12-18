import api from '@/utils/api';
import {AddBucket,ListBucket,DeleteBucket} from '@/constant/apiConst';
import {Result} from '@/constant/result';

export default class bucketManage {
	
	static async addBucket<T>(addBucketInfo:any): Promise<Result<T>> {
		const result = await api.post(AddBucket, addBucketInfo,{
                        headers: {"Authorization":"Bearer afPwHuC4l9wJdddbq0F5MjvrXd7B78KP"}
                    });
		return result.data as Result<T>;
	}

	static async listBucket<T>():Promise<Result<T>>{
		const result = await api.post(ListBucket);
		return result.data as Result<T>;
	}

	static async deleteBucket<T>(deleteBucketInfo:string):Promise<Result<T>>{
		const result = await api.post(DeleteBucket,{bucketName:deleteBucketInfo},{
                        headers: {"Authorization":"Bearer afPwHuC4l9wJdddbq0F5MjvrXd7B78KP"}
                    });
		return result.data as Result<T>;
	}
}