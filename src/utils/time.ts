import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface UtcConvertTimeZoneParams {
    date?: Date | string | null;
    formatter?: string;
}

const TimeUtil = {
    timeZone: dayjs.tz.guess(),
    utcConvertTimeZone({ date, formatter = 'YYYY/MM/DD HH:mm:ss' }: UtcConvertTimeZoneParams) {
        return dayjs(date as string | Date | undefined).tz(this.timeZone).format(formatter);
    }
};

export default TimeUtil;
