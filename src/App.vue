<template>
  <q-layout view="lHh Lpr lff">
    <Main />
    <router-view></router-view>
  </q-layout>
</template>


<script setup>
import Main from "./components/layout/Main.vue";
import { useStore } from "vuex";
import { Cookies } from "quasar";
import { computed } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUpdated } from "@vue/runtime-core";

const store = useStore();
const router = useRouter();
const route = useRoute();

const auth_token = Cookies.get("auth_token");
const auth_role = Cookies.get("auth_role");
const auth_data = Cookies.get("data");

const authentication = computed(() => {
  return store.getters.isAuthenticate;
});
const user_data = computed(() => {
  return store.getters.getUserData;
});

if (auth_data) {
  store.commit("setUserData", auth_data);
}

if (auth_token) {
  store.commit("isAuthenticate", true);
} else {
  store.commit("isAuthenticate", false);
  router.push("/login");
}

if (auth_role) {
  store.commit("setAuthRole", auth_role);
} else {
  store.commit("setAuthRole", "");
}

onMounted(() => {
  window.addEventListener('storage', function (event){
    if (event.key == 'logout-event') {
        this.window.location.href = '/login';
    }
}, false);
})

</script>
