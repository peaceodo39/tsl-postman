import datastore from "../../libs/datastore";

const state = {
  main: 0,
  now_open: '',
  content_list: {},
  group_list: [],
  api_list: {},
  api_num: 0,
  envselect:'default',
  nowapi:''
}
const getters = {
  getcontent_list: state => {
    return state.content_list
  },
  fruitsCount (state) {
    return state.content_list.length
  },
  now_open (state) {
    return state.now_open
  },
  now_object (state) {
    return state.now_object
  },
  apinum: (state) => {
    return state.api_num
  },
  env_select:(state)=>{
    return state.envselect
  },
  now_api(state){
    return state.nowapi
  }
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  set_now (state, now) {
    state.now_open = now
  },
  set_now_object (state, now) {
    state.now_object = now
  },
  set_envselect (state, now) {
    state.envselect = now
  },
  set_nowapi (state, now) {
    state.nowapi = now
  },
  content_add (state, content) {
    console.log('content_add')
    state.main++
    let temp = state.content_list
    temp[state.main] = content
    state.content_list = temp
  },
  content_delete (state, main) {
    delete state.content_list[main]
  },
  content_empty (state) {
    console.log('content_empty')
    state.content_list = {}
  },
  add_api (state, api) {
    console.log(51)
    if(typeof api.uniqid === 'string'){
      api.number= api.uniqid;
      state.api_list[api.uniqid] = api

      let api2 = JSON.parse(JSON.stringify(api));
      console.log(datastore)
      //存在唯一标志,可用
      datastore.api.findOne({
        'uniqid':api2.uniqid
      },(err, doc)=>{
        if(err) throw err;
        if(doc){
          datastore.api.update({
            'uniqid':api2.uniqid
          },api2,{},()=>{
            // Vue.$Message.success("更新一个索引成功!")
          });
        }else{
          datastore.api.insert(api2,()=>{
            // Vue.$Message.success("增加一个索引成功!")
          });
        }
      });


      return api.uniqid
    }
    state.api_num++
    api.number = state.api_num
    state.api_list[state.api_num] = api
    return state.api_num
  },
  add_group (state, group) {
    return state.group_list.push(group)
  },
  api_num (state) {
    state.api_num = 0
  },
  api_numadd (state) {
    state.api_num++
  }

}

const actions = {
  someAsyncTask ({commit}) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  set_now (context, reload) {
    context.commit('set_now', reload.content)
  },
  set_now_object (context, reload) {
    context.commit('set_now_object', reload.content)
  },
  set_nowapi (context, reload) {
    context.commit('set_nowapi', reload.content)
  },
  content_add (context, reload) {
    console.log('content_add,action')
    context.commit('content_add', reload.content)
  },

  content_empty (context) {
    context.commit('content_empty')
  },
  add_api (context, reload) {
    context.commit('add_api', reload.data)
  },
  add_group (context, reload) {
    context.commit('add_group', reload.data)
  },
  api_num (context) {
    context.commit('api_num')
  }
}

export default {
  getters,
  state,
  mutations,
  actions
}
