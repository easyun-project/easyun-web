import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUsTrans from './en-us.json';
import zhCnTrans from './zh-cn.json';
import jaJpTrans from './ja-jp.json';

i18n
    .use(LanguageDetector) // 嗅探当前浏览器语言
    .use(initReactI18next) // init i18next
    .init({
        // 引入资源文件
        resources: {
            'en-US': {
                translation: enUsTrans
            },
            'zh-CN': {
                translation: zhCnTrans
            },
            'ja-JP': {
                translation: jaJpTrans
            },
        },
        // 选择默认语言，选择内容为上述配置中的key，即en/zh/ja
        fallbackLng: 'en',
        // debug: true,
        detection: {
            caches: [ 'localStorage', 'sessionStorage', 'cookie' ],
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
