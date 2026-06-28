import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte({
            compilerOptions: {
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true,

                customElement: true,
            },
        }),
    ],

    build: {
        target: 'esnext',
        sourcemap: true,
        cssMinify: 'lightningcss',
        license: true,
        manifest: true,
        minify: 'oxc',

        lib: {
            entry: {
                index: './src/lib',
                components: './src/lib/components',
            },

            name: '@aevix/atom-components',
            formats: ['es'],
        },
    },

    css: { transformer: 'lightningcss' },
});
