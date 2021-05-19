import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/LoginModule'
import ResidentInfo from '@/components/ResidentInfo/ResidentInfoModule'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/residentInfo',
            name: 'ResidentInfo',
            component: ResidentInfo
        }
    ]
})