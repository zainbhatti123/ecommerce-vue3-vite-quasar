<template>
  <q-header class="bg-blue-8 text-white q-py-sm">
    <q-toolbar>
      <q-toolbar-title v-if="!auth || !route.meta.sidebar">
        <router-link to="/" class="text-white" style="text-decoration: none;">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="">
          </q-avatar>
          Go For Shopping
        </router-link>
      </q-toolbar-title>
      <q-list v-if="auth && !route.meta.sidebar && store.state.permission[0].permissions.dashboard">
          <q-item clickable :to="'/dashboard'" class="text-white">
            <q-item-section>
                <q-item-label class="text-weight-medium">
                  Dashboard
                </q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
      <q-space />
      <q-space />
      <q-space />
      <q-space />
      <q-btn color="white" v-if="route.name != 'checkout' && auth && permissions.order_placement" round text-color="black" icon="shopping_cart" @click="drawer = !drawer">
         <q-badge rounded floating color="red">{{setQty}}</q-badge>
      </q-btn>

      <ProfileDropDown v-if="auth" />
      <Cart :drawer_option="drawer" @drawer_close="drawer_close" />

     <q-list v-if="!auth" class="flex">
          <q-item clickable :to="'/login'" class="text-white text-weight-medium">
            <q-item-section>
                <q-item-label>
                  Login
                </q-item-label>
            </q-item-section>
          </q-item>
           <q-item clickable :to="'/register'" class="text-white text-weight-medium">
            <q-item-section>
                <q-item-label>
                  Register
                </q-item-label>
            </q-item-section>
          </q-item>
      </q-list>
    </q-toolbar>
  </q-header>

</template>

<script setup>
import { computed, onMounted, onUpdated, ref, watch } from "@vue/runtime-core";
import { useStore } from 'vuex';
import { useRouter , useRoute } from 'vue-router';
import ProfileDropDown from '../../custom-components/ProfileDropdown.vue';
import Cart from '../../cart/Cart.vue'

const store = useStore();
const router = useRouter();
const route = useRoute();
const drawer = ref(false);
const auth_role = ref(null);

const props = defineProps({
  auth:Boolean,
  authRole:String,
  userData:Object,
  permissions:Object,
})


const setQty = computed(() => {
  if(store.getters.getItems){
    return store.getters.getItems.length;
  }
});

const drawer_close = () => {
  drawer.value = !drawer.value;
}
</script>