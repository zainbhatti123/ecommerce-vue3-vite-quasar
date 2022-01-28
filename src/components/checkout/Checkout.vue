<template>
    <q-page-container class="q-mt-md container q-pb-xl">
        <div class="row">
            <div class="col-12 text-center">
                <h4 class="text-h4 text-weight-medium">Checkout</h4>
                <Cart />
            </div>

            <div class="col-9 q-mx-auto">
                <div class="payment-method q-my-lg text-left">
                    <h5 class="text-h6 q-mb-md">Payment Method</h5>

                    <div class="row bg-grey-3 rounded-borders q-py-md">
                        <div class="col-6 q-px-md">
                            <q-radio v-model="pay_method" val="credit-card" label="Credit Card" />
                        </div>
                        <div class="col-6 q-px-md">
                            <q-radio v-model="pay_method" val="cash-on-delivery" label="Cash On Delivery" />
                        </div>
                        <div class="row" v-if="pay_method == 'credit-card'">
                             <div class="col-12 q-px-md">
                                <h6 class="text-subtitle1 q-mb-sm">Pay with your credit/debit card</h6>
                            </div>
                            <div class="row full-width">
                                <div class="col-12 q-px-md">
                                    <q-input type="number" :rules="[val => val.length >= 16 || 'Card number should be 16 digits']" v-model="card_number" label="Card Number" />
                                </div>
                                <div class="col-6 q-px-md">
                                    <q-input
                                        ref="date"
                                        v-model="exp_date"
                                        label="Expire Month"
                                        :rules="[ val => val !== null && val !== '' || 'Please select a date']"
                                    @click="$refs.qDateProxy.show()"
                                        >
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy">
                                                <q-date
                                                minimal
                                                v-model="exp_date"
                                                default-view="Months"
                                                mask="MM/YYYY"
                                                />
                                            </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col-6 q-px-md">
                                    <q-input type="number" :rules="[val => val.length >= 3 || 'CVV should be 3 digits']" v-model="cvv" label="CVV" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <q-btn :loading="loading" align="around" label="Submit" icon="check_circle" class="q-py-sm" style="width: 150px" color="primary" @click="simulateProgress()" :disable="loading">
                    <template v-slot:loading>
                        <q-spinner-hourglass class="on-left" />
                        Loading...
                    </template>
                    </q-btn>
                </div>
            </div>
        </div>
    </q-page-container>
</template>

<script setup>
import Cart from '../cart/Cart.vue';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import {  useRouter } from 'vue-router';

const store = useStore();

const router = useRouter();

const pay_method = ref('credit-card');
const card_number = ref('');
const cvv = ref('');
const exp_date = ref('');
const loading = ref(false);

 const simulateProgress = () => {
      loading.value = true
      
      setTimeout(() => {
        router.push({ name: 'congrats'})
        store.commit('removeAllItems');
        store.commit('orderSuccess', true);
        store.commit('removeAllItems');
      }, 1000);
    }

</script>