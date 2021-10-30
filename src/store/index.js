import { createStore } from 'vuex'

import auth from '../modules/auth/store';
import page from '../modules/page/store';


const store = createStore({
    modules: {
        auth,
        page
    }
})




export default store