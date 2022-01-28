<template>
    <q-page-container class="q-mt-xl text-center">
        <div class="text-h4 text-weight-medium">Settings</div>
    </q-page-container>
</template>


<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import apiService from '../../api';

const userData = ref([]);
const route = useRoute();
const router = useRouter();

</script>