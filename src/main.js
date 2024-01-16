import {createApp} from 'vue';
import App from './App.vue';
import store from './store';  // Make sure this path is correct
import router from './router'

createApp(App).use(router).use(store).mount('#app')