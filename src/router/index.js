import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home/Home.vue";
import Checkout from "../components/checkout/Checkout.vue";
import Congrats from "../components/congrats/Congratulation.vue";
import Login from "../components/auth/login/Login.vue";
import Register from "../components/auth/register/Register.vue";
import Dashboard from "../components/dashboard/Index.vue";
import Settings from "../components/settings/Settings.vue";
import Profile from "../components/profile/Profile.vue";
import Users from "../components/users/Users.vue";
import { permissions } from '../response/permissions.json';
import store  from "../store";
import { Cookies } from "quasar";


const auth_role = Cookies.get('auth_role');

let auth_permissions = [];

if(auth_role){
  permissions.forEach((user) => {
    if(auth_role === user.role){
      store.commit('setPermissions', user)
      auth_permissions = store.state.permission[0].permissions;
    }
  });
}

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      sidebar: false,
      auth: false,
    },
    beforeEnter: (to, from, next) => {
      if(auth_permissions.order_placement === false){
        next('/dashboard')
      }else {
        next();
      }
    },
    component: Home,
  },
  {
    path: "/checkout",
    name: "checkout",
    meta: {
      sidebar: false,
      auth: false,
    },
    beforeEnter: (to, from, next) => {
      if(auth_permissions.order_placement === false){
        next('/dashboard')
      }else {
        next();
      }
    },
    component: Checkout,
  },
  {
    path: "/congratulations",
    name: "congrats",
    meta: {
      sidebar: false,
      auth: false,
    },
    beforeEnter: (to, from, next) => {
      if(auth_permissions.order_placement === false){
        next('/dashboard')
      }else {
        next();
      }
    },
    component: Congrats,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      sidebar: false,
      auth: false,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.isAuthenticate && !auth_permissions.order_placement){
        next('/dashboard')
      }else if(store.getters.isAuthenticate && auth_permissions.order_placement){
        next('/');
      } else {
        next();
      }
    },
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    meta: {
      sidebar: false,
      auth: false,
    },
    beforeEnter: (to, from, next) => {
      if(store.getters.isAuthenticate && !auth_permissions.order_placement){
        next('/dashboard')
      }else if(store.getters.isAuthenticate && auth_permissions.order_placement){
        next('/');
      }
      else{
        next();
      }
    },
    component: Register,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      sidebar: true,
      auth: true,
    },
    beforeEnter: (to, from, next) => {
      if(auth_permissions.dashboard === false){
        next({name: 'home'})
      }else {
        next();
      }
    },
    component: Dashboard
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      sidebar: true,
      auth: true,
    },
    beforeEnter: (to, from, next) => {
      if(auth_permissions.settings === false){
        next('/dashboard')
      }else {
        next();
      }
    },
    component: Settings
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      sidebar: true,
      auth: true,
    },
    beforeEnter: (to, from, next) => {
      if(auth_permissions.profile === false){
        next({name: 'dashboard'})
      }else {
        next();
      }
    },
    component: Profile
  },
  {
    path: "/users",
    name: "users",
    meta: {
      sidebar: true,
      auth: true,
    },
    beforeEnter: (to, from, next) => {
      if(auth_permissions.users === false){
        next({name: 'dashboard'})
      }else {
        next();
      }
    },
    component: Users
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;