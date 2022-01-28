<template>
  <q-btn-dropdown
    flat
    padding="0"
    :rounded="false"
    unelevated
    class="q-ml-md"
    no-caps
  >
    <template v-slot:label>
      <q-avatar>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
      </q-avatar>
    </template>
    <q-list style="width: 220px">
      <q-item>
        <q-item-section>
          <q-item-label
            >You are login as
            <span class="text-capitalize">{{ auth_name }}</span></q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup v-if="permissions.profile" to="/profile">
        <q-item-section avatar>
          <q-item-label
            ><q-icon name="person" size="sm" color="primary" class="q-mr-sm" />
            Profile</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-close-popup
        v-if="permissions.settings"
        to="/settings"
      >
        <q-item-section>
          <q-item-label
            ><q-icon
              name="settings"
              size="sm"
              color="primary"
              class="q-mr-sm"
            />
            Setting</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label @click="logout()"
            ><q-icon name="logout" size="sm" color="red" class="q-mr-sm" />
            Logout</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted } from "@vue/runtime-core";

const store = useStore();
const router = useRouter();

const permissions = store.getters.getPermissions[0].permissions;

const logout = async () => {
  await store.dispatch("logout");
  router.push("/login");
  store.commit("setAuthRole", "");
};

const authRole = computed(() => {
  return store.getters.getAuthRole;
});

const auth_name = computed(() => {
  if (authRole == "super_admin") {
    return authRole.split("_")[0];
  } else {
    return authRole.value;
  }
});
</script>