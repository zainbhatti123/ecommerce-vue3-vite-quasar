<template>
    <q-dialog v-model="show_modal" persistent>
    <q-card style="min-width: 500px" v-if="!loading">
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-medium">Edit Your Profile</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
            @submit.prevent="onSubmit"
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
              disable
            />

            <div class="text-right">
                <q-btn
                label="Cancel"
                @click="close_modal"
                color="red"
                flat
                class="q-ml-sm"
              />
              <q-btn
                type="submit"
                label="Save"
                flat
                color="primary"
              />
            </div>
          </q-form>

      </q-card-section>
    </q-card>

    <q-card class="q-px-lg q-pb-sm" v-else>
        <q-card-section class="text-center q-pa-xl">
          <q-spinner-cube
            color="primary"
            size="5.5em"
          />
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import apiService from "../../api";
import { useStore } from 'vuex';
import { Cookies , useQuasar } from "quasar";
import { inject } from "@vue/runtime-core";

const store = useStore();
const $q = useQuasar();

const profile = inject('editable_profile');
const show_modal = inject('show_modal');
const close_modal = inject('close_modal');

const loading = ref(false);
const name = ref(profile.name);
const email = ref(profile.email);
const role = ref(profile.role);

if(role.value.includes('_')){
    role.value.split(' ').join(' ');
}

const options = ref([
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
])

const onSubmit = () => {
    loading.value = true;
    let data = {
        "name": name.value,
        "email" : email.value,
        "role" : role.value
    }

    apiService.updateUser(data, profile.id).then((response) => {
        loading.value = false;
        store.commit('setUserData', response.data);
        Cookies.set('data', response.data);
        $q.notify({
            message: 'User has been updated successfully',
            type: 'positive',
            position: 'top-right',
            actions: [
                { icon: 'close', color: 'white', size: 'sm' }
            ]
        });
        close_modal();
    })
    .catch((error) => {
        loading.value = false;
        console.log(error);
         $q.notify({
            message: 'Something wents wrong',
            type: 'negative',
            position: 'top-right',
            actions: [
                { icon: 'close', color: 'white', size: 'sm' }
            ]
        })
    })
}


</script>