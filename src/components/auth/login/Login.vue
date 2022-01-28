<template>
  <q-page-container class="q-mt-lg">
    <div class="row">
      <div class="col-4 q-mx-auto shadow-3 q-mt-xl">
        <div class="q-pa-lg">
          <div
            class="
              text-h5 text-primary text-uppercase text-center text-weight-bold
              q-mb-xl
            "
          >
            Login
          </div>
          <q-form
            @submit.prevent="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              v-model="email"
              label="Your Email *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type your email',
              ]"
            />

            <q-input
              type="password"
              v-model="password"
              label="Password *"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type your password',
              ]"
            />
            <div class="text-center">
              <q-btn
                :loading="loading"
                type="submit"
                label="Login"
                color="primary"
                style="width: 150px"
                :disable="loading"
              >
                <template v-slot:loading>
                  <q-spinner-hourglass class="on-left" />
                  Loading...
                </template>
              </q-btn>
              <q-btn
                label="Reset"
                type="reset"
                color="secondary"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page-container>
</template>


<script setup>
import { computed, ref } from "@vue/reactivity";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { permissions } from '../../../response/permissions.json';

const $q = useQuasar();
const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");

const props = defineProps({
  auth: Boolean,
});

const loading = computed(() => {
  return store.state.loading;
})

const onReset = () => {
  email.value = null;
  password.value = null;
};

const onSubmit = () => {

  var credentials = {
    email: email.value,
    password: password.value,
  };

  store.dispatch('userLogin', credentials).then(() => {
    var user = store.state.permission[0];
    if(user) {
      if(user.permissions.order_placement){
      router.push({
        path: "/",
      });
    } else if(!user.permissions.order_placement){
      router.push({
        path: "/dashboard",
      });
    } 
    }
  });
}

</script>