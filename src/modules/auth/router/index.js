
export default {

    name: 'auth',
    component: () => import(/* webpackChunkName: "Auth Layout" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
       {
           path: '/auth/login',
           name: 'login',
           component: () => import(/* webpackChunkName: "Login" */ '@/modules/auth/views/Login.vue'),
       },
       {
           path: '/auth/register',
           name: 'register',
           component: () => import(/* webpackChunkName: "Register" */ '@/modules/auth/views/Register.vue'),
       },
    ]

}