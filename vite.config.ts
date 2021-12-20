import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import * as path from 'path';
import {existsSync} from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dotenv from 'dotenv';

// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中
dotenv.config({
    path: existsSync('.env') ?
        '.env' : path.resolve('envs', `.env.${process.env.NODE_ENV}`)
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
                    "primary-color": "#f5922f", //全局样式
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
    }
});
