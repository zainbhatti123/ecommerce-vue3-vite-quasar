<template>
  <q-dialog v-model="add_user_modal" persistent>
    <q-card style="min-width: 500px" v-if="!loading">
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-medium">Add New User</div>
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
            <div class="text-right">
                <q-btn
                label="Cancel"
                @click="emit('close_add_user_modal')"
                color="red"
                flat
                class="q-ml-sm"
              />
              <q-btn
                type="submit"
                label="Add User"
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
import { useStore } from 'vuex';

const store = useStore();

const loading = ref(false);

const props = defineProps({
  add_user_modal: Boolean,
});
const emit = defineEmits(["close_add_user_modal"]);

const name = ref("");
const email = ref("");
const role = ref("");
const password = ref("");

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

const onSubmit = () => {
  loading.value = true;
    var data = {
        'name': name.value,
        'email': email.value,
        'role': role.value.value,
        'password': password.value,
    }

    store.dispatch('addNewUser', data).then(() => {
      loading.value = false;
      name.value = "";
      email.value = "";
      role.value = "";
      password.value = "";
      emit('close_add_user_modal');
    })
}
</script>