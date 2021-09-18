// import { mapActions } from "vuex";
import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/stores/cart' 
import alert from '@/stores/alert'
import auth from '@/stores/auth'
import dialog from '@/stores/dialog'


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        carts : [],
        prevUrl: '',
    },
    mutations: {
        
       setPrevUrl: (state, value) => {
           state.prevUrl = value
       }
    },
    actions: {
       
        setPrevUrl: ({commit}, value) => {
            commit('setPrevUrl', value)
        },
    },
    getters: {
        carts : state => state.carts,
        prevUrl: state => state.prevUrl,
    },
    modules: {
        cart,
        alert,
        auth,
        dialog,
        region
    }

})