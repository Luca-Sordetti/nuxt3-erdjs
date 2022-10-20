import NodeModulesPolyfillPlugin from "@esbuild-plugins/node-modules-polyfill";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    modules: [
        "@nuxtjs/tailwindcss"
    ],

    vite: {
        optimizeDeps: {
            esbuildOptions: {
                plugins: [
                    NodeModulesPolyfillPlugin()
                ],
            },
        },
    },
});