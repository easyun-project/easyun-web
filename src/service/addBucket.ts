import {getHost,getHeader} from '@/utils/api';
import {AddBucket,ListBucket,DeleteBucket} from '@/constant/apiConst';
import {Result} from '@/constant/result';
import axios from "redaxios";

export default class bucketManage {
	
	static async addBucket<T>(addBucketInfo:any,token:string): Promise<Result<T>> {
		const result = await axios.post(AddBucket, addBucketInfo,{
                        headers: getHeader(token)
                    });
		return result.data as Result<T>;
	}

	static async listBucket<T>():Promise<Result<T>>{
		const result = await axios.post(ListBucket);
		return result.data as Result<T>;
	}

	static async deleteBucket<T>(deleteBucketInfo:string,token:string):Promise<Result<T>>{
		const result = await axios.post(DeleteBucket,{bucketName:deleteBucketInfo},{
                        headers: getHeader(token)
                    });
		return result.data as Result<T>;
	}
}