<script setup lang="ts">
import { useVueErd } from "vue-erdjs";

defineProps({
    qrcodeHandler: {
        type: Object,
        default: { props: { code: Object } }
    },
    token: {
        require: false,
        type: String
    }
});

const { account } = useVueErd();

const currentTab = ref("");

watch(() => account.address, (address) => {
    if(address != null){
        const searchParams = new URLSearchParams(window.location.search);
        const fromUrl = searchParams.get("fromUrl");
        if (fromUrl) window.location.href = fromUrl;
    }
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-5 flex-col md:flex-row">
            <vue-erdjs-tab
                name="Defi Wallet"
                @select-mode="currentTab = $event"
                :selected-mode="currentTab"
            />
            <vue-erdjs-tab
                name="Maiar"
                @select-mode="currentTab = $event"
                :selected-mode="currentTab"
            />
            <vue-erdjs-tab
                name="Ledger"
                @select-mode="currentTab = $event"
                :selected-mode="currentTab"
            />
            <web-wallet-login
                @select-mode="currentTab = $event"
                :selected-mode="currentTab"
                :token="token"
            />
        </div>

        <Transition name="page" mode="out-in">
            <div v-if="currentTab != ''" class="border-t pt-5 flex items-center justify-center text-center">
                <defi-wallet-login
                    :selected-mode="currentTab"
                    :token="token"
                />

                <maiar-login
                    :selected-mode="currentTab"
                    :qrcodeHandler="qrcodeHandler"
                    :token="token"
                />

                <ledger-login
                    :selected-mode="currentTab"
                    :token="token"
                />
            </div>
        </Transition>
    </div>
</template>

<style lang="scss">
.vue3rdj5__modes-open{
    @apply flex-1 flex flex-col flex-wrap gap-2 items-center hover:opacity-70 transition;

    img{
        @apply mx-auto my-auto h-32;
    }
}
</style>