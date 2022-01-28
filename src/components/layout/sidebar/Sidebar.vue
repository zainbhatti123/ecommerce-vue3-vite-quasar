<template>
  <q-drawer
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    mini-to-overlay
    show-if-above
    :width="250"
    v-model="leftDrawerOpen"
    side="left"
    class="bg-blue-8"
  >
    <q-toolbar style="height: 66px">
      <q-toolbar-title>
        <router-link
          :to="setRedirect()"
          class="text-white"
          style="text-decoration: none"
        >
          <q-item class="q-pl-none">
            <q-item-section avatar>
              <q-icon size="md">
                <q-img
                  src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                  alt=""
                />
              </q-icon>
            </q-item-section>
            <q-item-section>Go For Shopping</q-item-section>
          </q-item>
        </router-link>
      </q-toolbar-title>
    </q-toolbar>
    <q-list bordered class="text-white">
      <q-item
        clickable
        v-ripple
        :to="'/dashboard'"
        class="text-white"
        v-if="permissons.dashboard"
      >
        <q-item-section avatar>
          <q-icon name="dashboard" />
        </q-item-section>
        <q-item-section>Dashboard</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        :to="'/profile'"
        class="text-white"
        v-if="permissons.profile"
      >
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>Profile</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        :to="'/users'"
        class="text-white"
        v-if="permissons.users"
      >
        <q-item-section avatar>
          <q-icon name="people" />
        </q-item-section>
        <q-item-section>Users</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        :to="'/settings'"
        class="text-white"
        v-if="permissons.settings"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>Settings</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        class="text-white"
        @click="store.dispatch('logout')"
      >
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { computed, reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";

const store = useStore();

const miniState = ref(true);

const permissons = store.getters.getPermissions[0].permissions;

const props = defineProps({
  auth: Boolean,
  authRole: String,
  userData: Object,
});
const leftDrawerOpen = ref(true);

const setRedirect = () => {
  let path = permissons.order_placement ? "/" : "/dashboard";
  return path;
};
</script>