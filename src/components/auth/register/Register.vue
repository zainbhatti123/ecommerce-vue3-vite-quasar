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
            Register
          </div>
          <q-form
            @submit.prevent="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
           <q-input
              v-model="name"
              label="Name *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter name',
              ]"
            />
            <q-input
              v-model="email"
              label="Email *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please enter email',
              ]"
            />

            <q-select
              v-model="role"
              :options="options"
              label="Role"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please select role',
              ]"
            />

            <q-input
              type="password"
              v-model="password"
              label="Password *"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please enter password',
              ]"
            />
            <div class="text-center">
              <q-btn
                :loading="isLoading"
                type="submit"
                label="Register"
                color="primary"
                style="width: 150px"
                :disable="isLoading"
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
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const email = ref('');
const name = ref('');
const role = ref('');
const password = ref('');
const loading = ref(false);
const store = useStore();
const router = useRouter();

const options = [
    {
        label: 'Admin',
        value: 'admin'
    },
    {
        label: 'Super Admin',
        value: 'super_admin'
    },
    {
        label: 'User',
        value: 'user'
    }
]

const isLoading = computed(() => {
  return store.state.loading;
})

const onReset = () => {
  email.value = null;
  name.value = null;
  role.value = null;
  password.value = null;
};

const onSubmit = () => {
    var data = {
        'name': name.value,
        'email': email.value,
        'role': role.value.value,
        'password': password.value,
    }

   store.dispatch('addNewUser', data).then(() => {
     router.push('/login');
   });
}

</script>