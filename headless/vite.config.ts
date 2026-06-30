import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'es2022',
        sourcemap: false,
        cssMinify: 'lightningcss',
        minify: 'oxc',

        lib: {
            entry: {
                index: './lib/index.ts',
            },
            name: 'AevixAtom',
            formats: ['es'],
        },

        rolldownOptions: {
            // external: ['lit', 'lit/directives/*', '@lit/reactive-element'],
            platform: 'browser',

            treeshake: {
                annotations: true,
                moduleSideEffects: [{ test: /\.js$/, sideEffects: true }],
                propertyReadSideEffects: false,
                propertyWriteSideEffects: false,
                unknownGlobalSideEffects: false,
            },

            optimization: {
                inlineConst: { mode: 'all', pass: 3 },
                pifeForModuleWrappers: true,
            },

            experimental: {
                chunkOptimization: true,
                lazyBarrel: true,
            },

            output: {
                cleanDir: true,
                format: 'es',

                minify: {
                    compress: {
                        target: 'esnext',
                    },
                    codegen: true,
                    mangle: true,
                },

                minifyInternalExports: true,
                keepNames: false,
                comments: {
                    legal: false,
                },

                // entryFileNames: '[name].js',
                // chunkFileNames: '[name]-[hash].js',
                hashCharacters: 'base64',
            },
        },
    },

    css: {
        transformer: 'lightningcss',
    },

    define: {
        DEV: false,
        __DEV__: false,
        'process.env.NODE_ENV': '"production"',
    },
});
