import { defineStore } from "pinia";

export const gestureStore = defineStore("gesture", {
  state: () => ({
    gesture: null,
    finger_locx: null,
    loaded: false,
  }),
  actions: {
  },
  // persist: {//持久化
  //   storage: sessionStorage,
  //   key: 'pinia-base'
  // },
});
