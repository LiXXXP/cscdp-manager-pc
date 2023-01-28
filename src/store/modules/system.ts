// 系统属性

const state = () => ({
  // 顶部tags
  tags: []
})

const mutations = {
  // 添加tags
  ADD_TAGS(state: any, tag: Array<any>) {
    state.tags = tag
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
