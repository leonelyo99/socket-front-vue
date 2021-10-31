import store from '@/store'


const isAuthenticatedGuard = async( to, from, next ) => {

    const token = store.getters["auth/getToken"];

    if ( !!token && token.length > 1 ) next()
    else next({ name: 'login' })
}

export default isAuthenticatedGuard