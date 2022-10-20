import { VueErdJsPlugin } from "vue-erdjs";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueErdJsPlugin);
});