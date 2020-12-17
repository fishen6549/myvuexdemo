import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, val) {
      state.inputValue = val
    },
    addItem (state, val) {
      const obj = {
        id: state.nextId,
        done: false,
        info: val
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem (state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatus (state, params) {
      const i = state.list.findIndex(x => x.id === params.id)
      if (i !== -1) {
        state.list[i].done = params.status
      }
    },
    clearDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图的关键字
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    async getList (context) {
      const { data: res } = await axios.get('/list.json')
      console.log(res)
      context.commit('initList', res)
    }
  },
  getters: {
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }

      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }

      return state.list
    }
  },
  modules: {
  }
})
