import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  count: number,
  componentList: any[]
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

// Create a new store instance.
export default createStore<State>({
  state() {
    return {
      count: 0,
      componentList: []
    }
  },
  getters: {
    double(state) {
      return 2 * state.count
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  }
})
