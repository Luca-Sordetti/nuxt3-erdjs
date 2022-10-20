<script setup lang="ts">

</script>

<template>
    <div class="w-screen h-screen flex items-center flex-col gap-5 justify-center p-5 bg-slate-50">
        <div class="flex flex-col gap-3 text-center">
            <h1 class="text-xl md:text-3xl font-bold">Nuxt3 - Vue ErdJS</h1>
            <p class="text-sm md:text-base">
                Using 
                <a href="https://github.com/stephaneLeroy/vue-erdjs" target="_blank" class="text-blue-500 hover:opacity-70 transition">stephaneLeroy/vue-erdjs</a>
                <br>By 
                <a href="https://luca-sordetti.com" target="_blank" class="text-blue-500 hover:opacity-70 transition">Luca Sordetti</a>
            </p>
        </div>

        <div class="bg-white rounded-xl shadow max-w-5xl w-full p-5">
            <Transition name="page" mode="out-in">
                <div :key="$route.name">
                    <slot />
                </div>
            </Transition>
        </div>
    </div>
</template>