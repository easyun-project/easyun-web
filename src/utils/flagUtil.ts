import store from '@/redux/store';

type FlagType = {
    [flag: string]: {
        icon: string
    }
}

type RegionType = {
    countryCode: string
    regionCode: string
    regionName: string
}

const flag: FlagType = {
    USA: {
        icon: 'twemoji:flag-united-states'
    },
    ZAF: {
        icon: 'twemoji:flag-south-africa'
    },
    HKG: {
        icon: 'twemoji:flag-hong-kong-sar-china'
    },
    IND: {
        icon: 'twemoji:flag-india'
    },
    JPN: {
        icon: 'twemoji:flag-japan'
    },
    KOR: {
        icon: 'twemoji:flag-south-korea'
    },
    SGP: {
        icon: 'twemoji:flag-singapore'
    },
    AUS: {
        icon: 'twemoji:flag-australia'
    },
    IDN: {
        icon: 'twemoji:flag-indonesia'
    },
    CAN: {
        icon: 'twemoji:flag-canada'
    },
    DEU: {
        icon: 'twemoji:flag-germany'
    },
    IRL: {
        icon: 'twemoji:flag-ireland'
    },
    GBR: {
        icon: 'twemoji:flag-united-kingdom'
    },
    ITA: {
        icon: 'twemoji:flag-italy'
    },
    FRA: {
        icon: 'twemoji:flag-france'
    },
    SWE: {
        icon: 'twemoji:flag-sweden'
    },
    BHR: {
        icon: 'twemoji:flag-bahrain'
    },
    BRA: {
        icon: 'twemoji:flag-brazil'
    },
    CHN: {
        icon: 'twemoji:flag-china'
    }
};

class FlagUtil {
    regionList: Array<RegionType> | undefined;

    defaultFlag: string;

    constructor() {
        this.regionList = store.getState().dataCenter.regionList;
        this.defaultFlag = 'twemoji:flag-united-nations';
    }

    /**
     * 获取国旗国家icon
     * @param {String} code 国家对应的编码
     * @return {String} @iconify插件所需要的参数
     */
    getFlagIcon(code: string) {
        return flag[code]?.icon ?? this.defaultFlag;
    }

    /**
     * 根据regionCode获取国旗国家icon
     * 遍历查询regionCode对应的countryCode
     * @param {string} regionCode
     */
    getFlagIconByRegionCode(regionCode) {
        const region = this.regionList?.filter(item => {
            return item.regionCode === regionCode;
        })[0];
        return this.getFlagIcon(region ? region.countryCode : '');
    }

    /**
     * 根据regionName获取国旗国家icon
     * 遍历查询regionName对应的countryCode
     * @param {string} regionName
     */
    getFlagIconByRegionName(regionName) {
        const region = this.regionList?.filter(item => {
            return item.regionName === regionName;
        })[0];
        return this.getFlagIcon(region ? region.countryCode : '');
    }
};
export default FlagUtil;

