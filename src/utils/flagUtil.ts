import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';



type FlagIconType = {
    [flag: string]: {
        icon: string
    }
}

type RegionType = {
    countryCode: string
    regionCode: string
    regionName: string
}

const FlagIcons: FlagIconType = {
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
    public regionList: Array<RegionType> | undefined;
    defaultFlag: string;

    constructor() {
        // this.regionList = store.getState().dataCenter.regionList;
        this.regionList = useSelector((state: RootState) => state.dataCenter).regionList;
        this.defaultFlag = 'twemoji:flag-united-nations';
    }

    /**
     * 获取国旗国家icon
     * @param {String} code 国家对应的编码
     * @return {String} @iconify插件所需要的参数
     */
    getFlagIcon(code: string) {
        return FlagIcons[code]?.icon ?? this.defaultFlag;
    }

    /**
     * 根据regionCode获取国旗icon
     * 遍历查询regionCode对应的countryCode
     * @param {string} regionCode
     */
    getFlagIconByRegion(regionCode) {
        const region = this.regionList?.filter(item => {
            return item.regionCode === regionCode;
        })[0];
        return this.getFlagIcon(region ? region.countryCode : '');
    }

    /**
     * 根据regionCode获取regionName
     * 遍历查询regionCode对应的countryCode
     * @param {string} regionCode
     */
    getRegionName(regionCode) {
        const region = this.regionList?.filter(item => {
            return item.regionCode === regionCode;
        })[0];
        return (region ? region.regionName : '');
    }

};
export default FlagUtil;

