import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgrPlugin from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    build: {
        emptyOutDir: false,
        outDir: 'dist',
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'MUIFeedbackDialog',
            fileName: 'mui-feedback-dialog',
            formats: ['cjs', 'es']
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'React'
                }
            }
        }
    }
})
