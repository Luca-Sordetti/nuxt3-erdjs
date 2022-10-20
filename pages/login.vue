<script setup lang="ts">
import { useVueErd } from "vue-erdjs";
import CustomQRCodeHandler from "~~/erdjs/CustomQRCodeHandler";

const qrcode = ref<any>(new CustomQRCodeHandler()) 

const { erd, account } = useVueErd();

const logout = () => {
    erd.logout();
}
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-1 border-b pb-5">
            <h2 class="text-lg md:text-xl font-medium">Login</h2>
            <p class="text-sm">Log in with your account using several methods.</p>
        </div>

        <VueErdjsConnect :qrcode-handler="qrcode" token="hello" v-if="!account.address" />

        <div v-else class="flex flex-col gap-5">
            <p class="truncate">Your address : <span :title="account.address">{{ account.address }}</span></p>
            <button class="bg-slate-700 px-3 py-2 rounded-xl text-white" type="button" @click.prevent="logout">Logout</button>
            <NuxtLink to="/" class="text-center text-sm text-blue-500 hover:opacity-70 transition">Go to transition page</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss">
.vue3rdj5__modes{
    @apply flex gap-10 flex-wrap;

    .vue3rdj5__modes-open{
        @apply flex-1 hover:opacity-70 transition;
    }
}
</style>