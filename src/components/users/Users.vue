<template>
    <q-page-container class="text-center q-mt-xl">
        <div class="text-h4 text-weight-medium">Users</div>
        <div class="q-mt-xl text-right q-mx-auto" style="width: 1000px">
            <q-btn color="primary" label="Add User" icon="add" @click="add_user_modal = true" style="letter-spacing: 1px" />
            <q-table
                row-key="index"
                class="q-mt-md"
                :rows="rows"
                :filter="filter"
                :visible-columns="visibleColumns"
                :columns="columns"
                v-model:pagination="pagination"
                hide-pagination
                :loading="loading"
            >
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>

            <template v-slot:top-right>
                 <q-select
                    v-model="visibleColumns"
                    multiple
                    outlined
                    dense
                    options-dense
                    :display-value="$q.lang.table.columns"
                    emit-value
                    map-options
                    :options="columns"
                    option-value="name"
                    style="min-width: 150px"
                />
            </template>

            <template v-slot:top-left>
                <q-input dense filled v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

            <template v-slot:body-cell-index="props">
                <q-td>
                    {{props.rowIndex + 1}}
                </q-td>
            </template>


            <template v-slot:body-cell-action="props">
                <q-td :props="props">
                    <q-btn color="primary" size="sm" padding="xs" class="q-mr-md" rounded icon="edit" disable />
                    <q-btn color="red" size="sm" padding="xs" rounded icon="close" @click="deleteUser(props.row);" :disable="props.row.role === 'super_admin'" />
                </q-td>
            </template>
            </q-table>

             <div class="row justify-center q-mt-xl">
                <q-pagination
                    v-model="pagination.page"
                    color="blue-8"
                    ripple
                    :max="pagesNumber"
                    boundary-links
                    size="md"
                    round
                />
            </div>
        </div>

        <AddUserModal :add_user_modal="add_user_modal" @close_add_user_modal="modalAddUserClose()" />
        <ConfirmModal @close_modal="modalClose()" :open_modal="open_modal" :clicked_user="clicked_user" />
    </q-page-container>
</template>


<script setup>

import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import apiService from '../../api';
import ConfirmModal from '../modals/ConfirmModal.vue';
import AddUserModal from '../modals/AddUserModal.vue';
import { defineComponent } from '@vue/runtime-core';

defineComponent({
    ConfirmModal,
    AddUserModal
})

const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3
    })

const filter = ref('');

const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage));
const visibleColumns = ref(['index','id','name','email','role','action'])

const store = useStore();
const loading = ref(true);
const open_modal = ref(false);
const add_user_modal = ref(false);
const clicked_user = ref();

const columns = [
  {
    name: 'index',
    label: '#',
  },
  {
    name: 'id',
    label: 'User Id',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
  { name: 'role', align: 'left', label: 'Role', field: row => row.role.split('_').join(' '), sortable: true },
  { name: 'action', align: 'center', label: 'Action', }
]

const rows = ref([]);

if(store.state.allUsers.length > 1)
{
    loading.value = false;

    rows.value = store.state.allUsers;

    rows.value.map((row, index) => {
        if(row.email === store.getters.getUserData.email){
            rows.value.splice(index, 1)
        }
    })
} 
else 
{
    apiService.getAllUsers().then((res) => {
        loading.value = false;
        rows.value = res.data.reverse();
        rows.value.map((row, index) => {
        if(row.email === store.getters.getUserData.email){
            rows.value.splice(index, 1)
        }
    })
        store.commit('setAllUsers', rows.value);
    }).catch((err) => {
        console.log(err);
    })
}

const deleteUser = (user) => {
    clicked_user.value = user;
    open_modal.value = true;
}

const modalClose = () => {
    open_modal.value = !open_modal.value;
}
const modalAddUserClose = () => {
    add_user_modal.value = !add_user_modal.value;
}

</script>