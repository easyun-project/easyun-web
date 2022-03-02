import moment from 'moment-timezone';

interface UtcConvertTimeZoneParams {
    date?: Date | string | null;
    formatter?: string;
}

const TimeUtil = {
    /**
     * 获取用户时区
     */
    timeZone: moment.tz.guess(),
    /**
     * 将UTC中央时间转成用户时区对应时间
     * @param date 用户时间
     * @param formatter 转化格式 - 默认为 YYYY/MM/DD hh:ss
     * @return 用户时区对应时间 String
     */
    utcConvertTimeZone({ date, formatter = 'YYYY/MM/DD hh:ss' }: UtcConvertTimeZoneParams) {
        return moment(date).tz(this.timeZone).format(formatter);
    }
};

export default TimeUtil;
