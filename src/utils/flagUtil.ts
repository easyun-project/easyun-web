const flag = {
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

const FlagUtil = {
    /**
     * 获取国旗国家icon
     * @param code 国家对应的编码
     * @return @iconify插件所需要的参数 String
     */
    getFlagIcon(code:string) {
        return flag[code].icon;
    }
};
export default FlagUtil;

