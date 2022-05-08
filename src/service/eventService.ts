import { EventLogList } from '@/constant/apiConst';
import { Result, EventLogListModel } from '@/constant/result';
import axios from 'axios';

export default class Event {
    static async getEventLogList(): Promise<Result<EventLogListModel>> {
        const url = EventLogList;
        const result = await axios.get(url);
        return result.data;
    }
}
