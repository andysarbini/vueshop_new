// import { mapActions } from "vuex";
import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/stores/cart' 
import alert from '@/stores/alert'


Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        carts : [],
    },
    mutations: {
        
       
    },
    actions: {
       
    },
    getters: {
        carts : state => state.carts
    },
    modules: {
        cart,
        alert
    }

})