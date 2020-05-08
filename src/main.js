import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import router from "./routes/index"
import * as firebase from "firebase"
import store from "./store"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyD6aKrwfVfwvXxc94My32rl2a2SoT6sfAU",
  authDomain: "vue-todo-f5555.firebaseapp.com",
  databaseURL: "https://vue-todo-f5555.firebaseio.com",
  projectId: "vue-todo-f5555",
  storageBucket: "vue-todo-f5555.appspot.com",
  messagingSenderId: "630245069061",
  appId: "1:630245069061:web:8220d4248aea3e8ef0e76c"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
