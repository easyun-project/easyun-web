import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, path.resolve(__dirname, 'envs'));

    return {
        plugins: [ react(), tailwindcss() ],
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
            chunkSizeWarningLimit: 600,
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (!id.includes('node_modules')) return null;
                        return id.split('node_modules/')[1].split('/')[0];
                    },
                    entryFileNames: 'js/[name].[hash].js',
                    chunkFileNames: 'js/[name].[hash].js',
                    assetFileNames: '[ext]/[name].[hash].[ext]',
                },
            },
        },
    };
});
