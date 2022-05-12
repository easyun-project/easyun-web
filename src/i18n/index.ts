import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUsTrans from '@/assets/i18n/en-US.json';
import zhCnTrans from '@/assets/i18n/zh-CN.json';
import jaJpTrans from '@/assets/i18n/ja-JP.json';

i18n
    .use(LanguageDetector) // 嗅探当前浏览器语言
    .use(initReactI18next) // init i18next
    .init({
        // 引入资源文件
        resources: {
            en: {
                translation: enUsTrans
            },
            zh: {
                translation: zhCnTrans
            },
            ja: {
                translation: jaJpTrans
            },
        },
        // 选择默认语言，选择内容为上述配置中的key，即en/zh/ja
        fallbackLng: 'en',
        // debug: true,
        detection: {
            caches: ['localStorage', 'sessionStorage', 'cookie'],
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    }).then(()=>console.log('i18n init succeed...'));

export default i18n;
