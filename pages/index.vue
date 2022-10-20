<script setup lang="ts">
import { useVueErd } from 'vue-erdjs';
import { TokenPayment, Transaction, TransactionPayload } from "@elrondnetwork/erdjs";

definePageMeta({ middleware: ["auth"] })

const { erd, fetchAccount } = useVueErd();

const account = ref();
const amount = ref(0.1);
const loading = ref(false);
const transactionState = ref();
const transactionResult = ref();
const transactionUrl = ref();

const accountBalance = computed(() => {
    if(!account.value) return "";
    return TokenPayment.egldFromBigInteger(account.value.balance.toString()).toPrettyString();
});

const submit = async () => {
    if( loading.value ) return;

    transactionResult.value = null;
    transactionState.value = null;
    transactionUrl.value = null;
    loading.value = true;

    const networkConfig = await erd.proxy.getNetworkConfig();
    const transaction = new Transaction({
        data: new TransactionPayload("vue-erdjs"),
        gasLimit: 70000,
        receiver: account.value!.address,
        value: TokenPayment.egldFromAmount(amount.value),
        chainID: networkConfig.ChainID,
        sender: account.value!.address
    });

    transaction.setNonce(account.value!.getNonceThenIncrement())
    
    transactionState.value = "Waiting for transaction to be signed"
    
    erd.providers.signAndSend(transaction)
        .then((result: Transaction) => {
            transactionState.value = 'Waiting for transaction to be validated'
            transactionUrl.value = erd.explorerTransactionUrl(result);
            return erd.providers.transactionResult(result);
        }).catch((error: Error) => {
                transactionResult.value = error
        }).finally(() => loading.value = false);
}

fetchAccount().then(data => account.value = data).catch(() => {});
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-1 border-b pb-5">
            <h2 class="text-lg md:text-xl font-medium">Transaction</h2>
            <p class="text-sm">Make a simple transaction.</p>
            <NuxtLink to="/login" class="text-sm text-blue-500 hover:opacity-70 transition">Go to my account</NuxtLink>
        </div>

        <div class="flex flex-col gap-4">
            <p>Your balance : {{ accountBalance }}</p>

            <form action="" method="POST" class="flex flex-col gap-2" @submit.prevent="submit">
                <div class="flex flex-col gap-1 text-sm">
                    <label for="">Amount</label>
                    <input type="number" step="0.01" v-model="amount" class="bg-slate-200 rounded-lg p-2">
                </div>

                <button class="bg-slate-700 px-3 py-2 rounded-xl text-white" type="submit">Send</button>
            </form>

            <div v-if="loading">
                {{ transactionState }}...
            </div>

            <a v-if="transactionUrl" :href="transactionUrl" target="_blank" class="text-center text-sm text-blue-500 hover:opacity-70 transition">See on explorer</a>
        </div>
    </div>
</template>