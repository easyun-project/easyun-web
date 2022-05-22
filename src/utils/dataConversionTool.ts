export type UnitType = {
    value: number,
    unit: string
}

const UnitList = [ 'Byte', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB' ];
const commonUnitList = [ 'K', 'M' ];

const DataConversionTool = {
    /**
     * 单位进制转换
     * @param value 当前数据
     * @param unit 当前进制单位
     * @return string 转换后的数值与单位 字符串
     */
    conversionUnit({ value, unit = 'GiB' }: UnitType) {
        if (value > 0) {
            // 获取当前进制的数位
            const unitIndex = UnitList.indexOf(unit);
            // 获取进位
            const base = Math.floor(Math.log(value) / Math.log(1024));
            const valTemp = (base ? value / Math.pow(1024, base) : value).toFixed(2);
            const _value = Math.round(Number(valTemp) * 100) / 100;
            return _value + ' ' + UnitList[base + unitIndex];
        } else {
            return value;
        }
    },
    /**
     * 数值转换
     * @param value 当前数据
     * @return 返回转换后的数据
     */
    conversionData(value: number) {
        if (value > 0) {
            // 获取进位
            const base = Math.floor(Math.log(value) / Math.log(1000));
            const valTemp = (base ? value / Math.pow(1000, base) : value).toFixed(2);
            const _value = Math.round(Number(valTemp) * 100) / 100;
            return base ? _value + commonUnitList[base - 1] : _value;
        } else {
            return value;
        }
    }
};

export default DataConversionTool;
