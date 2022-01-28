<template>
     <q-dialog v-model="open_modal" persistent>
      <q-card class="q-px-lg q-pb-sm" v-if="!loading">
        <q-card-section class="text-center">
          <q-icon name="warning" color="red" size="xl" text-color="white" />
          <div class="text-h5 q-mt-lg">Do you want to delete <span class="text-blue-9 text-weight-bold text-uppercase">{{clicked_user.name}}</span></div>
        </q-card-section>

        <q-card-actions class="q-py-md">
          <q-btn label="No" size="md" color="red" @click="emit('close_modal')" />
          <q-space />
          <q-btn label="Yes" size="md" color="blue" @click="userDelete()" />
        </q-card-actions>
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
import { onMounted, onUpdated } from "@vue/runtime-core";
import apiService from "../../api";
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const store = useStore();

const loading = ref(false);

const props = defineProps({
    clicked_user:Object,
    open_modal:Boolean
});

const emit = defineEmits(['close_modal']);

const userDelete = () => {
  loading.value = true;

    apiService.deleteUser(props.clicked_user.id).then((response) => {
      loading.value = false;
      store.commit('removeUser', props.clicked_user);
        emit('close_modal');
        $q.notify({
          message: 'User has been deleted successfully',
          type: 'positive',
          position: 'top-right',
          actions: [
            { icon: 'close', color: 'white', size: 'sm' }
          ]
        })
    })
    .catch((error) => {
      loading.value = false;
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