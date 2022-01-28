<template>
  <q-page-container class="q-mt-xl text-center">
    <div class="text-h4 text-weight-medium">Profile</div>
    <div class="row">
      <div class="col-md-7 q-mx-auto">
        <div class="row q-mt-xl text-h6">
          <div class="col-12 text-right q-pb-sm">
            <q-btn color="primary" icon="edit" size="sm" @click="show_modal = true">
              <q-tooltip
                class="bg-blue-7 text-body2"
                transition-show="scale"
                transition-hide="scale"
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                Edit profile
              </q-tooltip>
            </q-btn>
          </div>
          <div class="col-6 q-pa-sm border">Name:</div>
          <div class="col-6 q-pa-sm text-blue-9 border">
            {{ profile.name }}
          </div>
          <div class="col-6 q-pa-sm border">Email:</div>
          <div class="col-6 q-pa-sm text-blue-9 border">
            {{ profile.email }}
          </div>
          <div class="col-6 q-pa-sm border">Role:</div>
          <div class="col-6 q-pa-sm text-blue-9 border text-capitalize">
            {{ role_format }}
          </div>
        </div>
      </div>
    </div>
  </q-page-container>

  <EditProfileModal />
</template>


<script setup>
import { computed, ref } from "@vue/reactivity";
import { defineComponent, provide } from "@vue/runtime-core";
import { useStore } from "vuex";
import EditProfileModal from '../modals/EditProfileModal.vue';

defineComponent({
    EditProfileModal,
})

const store = useStore();

const show_modal = ref(false);

const profile = computed(() => {
  return store.state.user_data;
});

const role_format = computed(() => {
  if (profile.value.role.includes("_")) {
    return profile.value.role.split("_").join(" ");
  } else {
    return profile.value.role;
  }
});

const closeModal = () => {
    show_modal.value = !show_modal.value;
}

provide('show_modal', show_modal);
provide('close_modal', closeModal);
provide('editable_profile', profile.value);

</script>

<style scoped>
.border {
  border: 2px solid #dadada;
}
</style>