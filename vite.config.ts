import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';
import { existsSync } from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dotenv from 'dotenv';

// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中
dotenv.config({
    path: existsSync('.env') ?
        '.env'
        : path.resolve('envs', `.env.${process.env.NODE_ENV}`)
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    resolve: {
        alias: {
            '@@': path.resolve(__dirname),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#f5922f', //全局样式
                },
                javascriptEnabled: true,
            },
        },
    },
    server: {
        cors: true,
        port: process.env.VITE_PORT as unknown as number,
        hmr: {
            host: 'localhost',
            protocol: 'ws',
            port: process.env.VITE_PORT as unknown as number,
        }
    },
    build: {
        rollupOptions: {
            output: {
                // 最小化拆分包
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                    }
                    return null;
                },
                // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
                entryFileNames: 'js/[name].[hash].js',
                // 用于命名代码拆分时创建的共享块的输出命名
                chunkFileNames: 'js/[name].[hash].js',
                // 用于输出静态资源的命名，[ext]表示文件扩展名
                assetFileNames: '[ext]/[name].[hash].[ext]',
                // 拆分js到模块文件夹
                // chunkFileNames: (chunkInfo) => {
                //     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
                //     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
                //     return `js/${fileName}/[name].[hash].js`;
                // },
            },
        },
    },
});
