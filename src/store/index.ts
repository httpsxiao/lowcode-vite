import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface ProjectDataIns {
  scaleX: number,
  scaleY: number,
  width: number,
  height: number
}

export interface State {
  count: number,
  projectData: ProjectDataIns,
  componentList: any[]
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

// Create a new store instance.
export default createStore<State>({
  state() {
    return {
      count: 0,
      componentList: [],
      projectData: {
        scaleX: 1,
        scaleY: 1,
        width: 375,
        height: 500
      }
    }
  },
  getters: {
    double(state) {
      return 2 * state.count
    }
  },
  mutations: {
    setState(state, { key, value }) {
      state[key as keyof State] = value
    }
  },
  actions: {
    setState(context, payload) {
      context.commit('setState', payload)
    }
  }
})
