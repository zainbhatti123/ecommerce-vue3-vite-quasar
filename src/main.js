import { createApp } from 'vue';
import App from './App.vue';
import { Quasar , Notify } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import store from './store';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import customScss from './assets/saas/app.scss';
import customCss from './assets/css/app.css';

const myApp = createApp(App);

myApp.use(Quasar, {
    plugins:{
        Notify
    },
    config: {
        notify: {  }
      }
});
myApp.use(router);
myApp.use(store);
myApp.use(customScss);
myApp.use(customCss);
myApp.use(VueAxios, axios);

myApp.mount('#app');
