import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login'
import Register from '../components/Register'
import MyList from '../components/MyList'
import store from '../store';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '',
        name: 'Login',
        component: function () {
            if(store.getters.user.loggedIn){
                return import('../components/MyList.vue')
            }else{
                return import('../components/Login.vue')
            }
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/mylist',
        name: 'MyList',
        component: MyList
    }
]
});

export default router