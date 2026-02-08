import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, path.resolve(__dirname, 'envs'));

    return {
        plugins: [ react() ],
        envDir: 'envs',
        base: env.VITE_BASE_URL || './',
        resolve: {
            alias: {
                '@@': path.resolve(__dirname),
                '@': path.resolve(__dirname, 'src'),
            }
        },
        server: {
            cors: true,
            host: true,
            port: Number(env.VITE_PORT) || 8888,
            hmr: {
                host: 'localhost',
                protocol: 'ws',
            }
        },
        build: {
            outDir: env.VITE_OUTPUT_DIR || 'dist',
            rollupOptions: {
                output: {
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
                    entryFileNames: 'js/[name].[hash].js',
                    chunkFileNames: 'js/[name].[hash].js',
                    assetFileNames: '[ext]/[name].[hash].[ext]',
                },
            },
        },
    };
});
