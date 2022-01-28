<template>
    <Header :authRole="store.getters.getAuthRole" :auth="store.getters.isAuthenticate" :userData="userData" :permissions="permissions" />
    <Sidebar :authRole="store.getters.getAuthRole" v-if="store.getters.isAuthenticate && route.meta.sidebar" :userData="userData" />
</template>


<script setup>
import Sidebar from './sidebar/Sidebar.vue';
import Header from './header/Header.vue'
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from '@vue/runtime-core';

const route = useRoute();
const store = useStore();

const userData = computed(() => {
    return store.getters.getUserData[0];
})

const permissions = computed(() => {
    if(store.state.permission.length > 0){
        return store.state.permission[0].permissions;
    }
})

</script>