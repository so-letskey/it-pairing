import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    adverts: [
      { title: "Mario-like game", description: "Great fun", id: 456 },
      { title: "Nice Website", description: "For fun and for money", id: 123 }
    ]
  },
  mutations: {
    addNewAdvert: (state, payload) => {
      state.adverts.push(payload);
    }
  },
  actions: {
    addNewAdvert: (context, payload) => {
      context.commit("addNewAdvert", payload);
    }
  }
});
