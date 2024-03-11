// src/store/index.js
import { createStore } from 'vuex';

// ストアの作成
const store = createStore({
    state() {
        return {
            isLogin: false,
            userId: ''
        }
    },
    mutations: {
        auth(state, userid) {
            state.isLogin = true;
            state.userId = userid;
        }
    },
    actions: {
        fetch(context, userid) {
            context.commit('auth', userid);
        }
    },
    modules: {},
})

export default store;
