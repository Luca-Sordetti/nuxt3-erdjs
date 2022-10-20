export default defineNuxtRouteMiddleware((to, from) => {
    const nuxtApp = useNuxtApp();
    
    setTimeout(() => {
        const isLogged = nuxtApp.vueApp.config.globalProperties.$erdAccount.logged();
        if (!isLogged) return navigateTo("/login?fromUrl=" + to.fullPath);
    }, 0);
});