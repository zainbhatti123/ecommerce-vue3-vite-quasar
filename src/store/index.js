import { Cookies, Notify } from 'quasar';
import Vuex from 'vuex'
import apiService from '../api';
import { permissions } from '../response/permissions.json';

const store = new Vuex.Store({
    state: {
        items: [],
        carted_items: [],
        authentication: false,
        auth_role: '',
        user_data: [],
        order_success: false,
        permission: [],
        allUsers: [],
        loading: false,
    },
    mutations: {
        setItems(state, item) {
            state.carted_items.push(item);
        },
        setAllItems(state, all) {
            state.items.push(all);
        },
        isAuthenticate(state, option) {
            state.authentication = option;
        },
        removeItems(state, data) {
            state.carted_items.map((cart_item, index) => {
                if (data.item.id === cart_item.id) {
                    state.carted_items.splice(index, 1)
                }
            })
        },
        setAuthRole(state, role) {
            state.auth_role = role;
        },
        setUserData(state, data) {
            state.user_data = data;
        },
        removeAllItems(state) {
            state.carted_items = [];
        },

        orderSuccess(state, option) {
            state.order_success = option;
        },

        setPermissions(state, data) {
            state.permission.push(data);
        },
        setAllUsers(state, data) {
            state.allUsers = data;
        },
        setLoading(state, option) {
            state.loading = option;
        },
        removeUser(state, payload){
            let findIndex = state.allUsers.findIndex((item, index) => item == payload)
            state.allUsers.splice(findIndex, 1);
        }
    },

    actions: {
        logout(context) {
            Cookies.remove('auth_token');
            Cookies.remove('auth_role');
            Cookies.remove('data');
            context.commit('isAuthenticate', false);
            localStorage.setItem('logout-event', 'logout');
            window.location.reload();
        },

        async addNewUser(context, data) {
            context.commit('setLoading', true);
            await apiService.addNewUser(data).then((response) => {
                context.commit('setLoading', false);
                context.state.allUsers.unshift(response.data.user);
                Notify.create({
                    message: 'User Has been added successfully',
                    type: 'positive',
                    html: true,
                    position: 'top-right',
                    actions: [
                        { icon: 'close', color: 'white', size: 'sm' }
                    ]
                });
            }).catch((error) => {
                    context.commit('setLoading', false);
                    Notify.create({
                        message: error.response.data,
                        type: 'negative',
                        html: true,
                        position: 'top-right',
                        actions: [
                            { icon: 'close', color: 'white', rounded: true, size: 'sm' }
                        ]
                    })
                })
        },

        async userLogin(context, credentials) {
            context.commit('setLoading', true);
            await apiService.login(credentials).then((response) => {
                    Notify.create({
                        message: "Login Successfully",
                        type: "positive",
                        position: "top-right",
                        actions: [
                            { icon: 'close', color: 'white', size: 'sm' }
                        ]
                    });
                    Cookies.set("auth_token", response.data.accessToken);
                    Cookies.set("auth_role", response.data.user.role);
                    Cookies.set("data", response.data.user);
                    context.commit("isAuthenticate", true);
                    context.commit("setUserData", response.data.user);
                    context.commit("setAuthRole", response.data.user.role);
                    context.commit('setLoading', false);
                    localStorage.removeItem('logout-event');
                    permissions.forEach((user) => {
                        if(response.data.user.role === user.role){
                          store.commit('setPermissions', user);
                        }
                      });
                })
                .catch((error) => {
                    context.commit('setLoading', false);
                    if(error.response) {
                        Notify.create({
                            message: error.response.data,
                            type: "negative",
                            position: "top-right",
                            actions: [
                                { icon: 'close', color: 'white', rounded: true, size: 'sm' }
                            ]
                        });
                    }
                });
        }
    },
    getters: {
        getItems(state) {
            return state.carted_items
        },
        isAuthenticate(state) {
            return state.authentication
        },
        getAuthRole(state) {
            return state.auth_role;
        },
        getUserData(state) {
            return state.user_data;
        },
        getOrderSuccess(state) {
            return state.order_success;
        },
        getPermissions(state) {
            return state.permission;
        },
        isloading(state) {
            return state.loading;
        }
    }
});

export default store;