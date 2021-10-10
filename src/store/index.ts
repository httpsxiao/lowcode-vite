import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface ProjectDataIns {
  scaleX: number,
  scaleY: number,
  width: number,
  height: number,
  elements: any[],
  activeElementUuid: string
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
        height: 500,
        elements: [],
        activeElementUuid: ''
      }
    }
  },
  getters: {
    activeElementUuid(state) {
      return state.projectData.activeElementUuid
    }
  },
  mutations: {
    setState(state, { key, value }) {
      state[key as keyof State] = value
    },
    addElement(state, element) {
      state.projectData.elements.push(element)
    },
    setActiveElementUuid(state, uuid = '') {
      state.projectData.activeElementUuid = uuid
    },
    setElementPosition(state, payload: SetElementPositionIns) {
      const { uuid, data } = payload
      const elements = state.projectData.elements
      for (let i = 0; i < elements.length; i++) {
        if (uuid === elements[i].uuid) {
          elements[i].style = {
            ...elements[i].style,
            ...data
          }
          break
        }
      }
    }
  },
  actions: {
    setState(context, payload) {
      context.commit('setState', payload)
    }
  }
})
