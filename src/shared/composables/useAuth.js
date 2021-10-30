import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router";

const useAuth = () => {
    const router = useRouter();
    const store = useStore()

    const createUser = async( user ) => {
        const {ok} = await store.dispatch('auth/signup', user )
        if (ok) router.push({ name: "page" });
    }

    const loginUser = async( user ) => {
        const {ok} = await store.dispatch('auth/login', user )
        if (ok) router.push({ name: "page" });
    }
    
    const logout = () => {
        router.push({ name: "login" });
        store.dispatch('auth/logout')
    }
    
    return {
        createUser,
        loginUser,
        logout,

        authStatus: computed(()=> store.getters['auth/getCurrentState']),
        username: computed(()=> store.getters['auth/getUsername'])
    }
}

export default useAuth