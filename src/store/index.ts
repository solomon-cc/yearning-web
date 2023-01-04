import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    mutations: {
        lock() {
            localStorage.setItem('locking', '1')
        },
        unlock() {
            localStorage.setItem('locking', '0')
        },
    }
});
