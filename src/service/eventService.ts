import { EventLogList } from '@/constant/apiConst';
import { Result, EventLogListModel } from '@/constant/result';
import axios from 'redaxios';
import { getHost } from '@/utils/api';

export default class Event {
    static async getEventLogList(): Promise<Result<EventLogListModel>> {
        const url = getHost() + EventLogList;
        const result = await axios.get(url);
        return result.data;
    }
}
