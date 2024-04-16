import Vue from 'vue';
import axios from 'axios';
import Storage from 'vue-ls';
import _ from 'lodash';
import App from './App';
import router from './router';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/css/index.css';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import mixincommon from "./mixin/common";
const ipc = require('electron').ipcRenderer

Vue.use(mavonEditor);
Vue.mixin(mixincommon);
Vue.use(VueI18n)
// 加载  vxe-table 表格组件
import 'xe-utils'
import VXETable from 'vxe-table'
// 加载 VXETable 插件
import VXETablePluginIView from 'vxe-table-plugin-iview'
import 'vxe-table-plugin-iview/dist/style.css'
VXETable.use(VXETablePluginIView)
// 加载 VXETable 插件 end
import 'vxe-table/lib/index.css'
Vue.use(VXETable)
// 加载 vxe-table 表格组件 end
// 加载 json展示
import TreeView from "vue-json-tree-view"
Vue.use(TreeView)
// 加载 json展示 end
// 加载 nedb 数据库 start
import db from './libs/datastore'
Vue.prototype.$db = db
// 加载 nedb 数据库 end

const i18n = new VueI18n({
  locale: 'zh_CN',
})

Vue.use(VeeValidate, {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    zh_CN
  }
})
let options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
}

Vue.prototype.$lodash = _
Vue.use(Storage, options)
Vue.use(iView)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
ipc.on('router.about',()=>{
  router.push({
    name:"about"
  })
});
ipc.on('router.setting',()=>{
  router.push({
    name:"setting"
  })
});



// 

// Vue.store=store;
/* eslint-disable no-new */
var bus = new Vue()
new Vue({
  bus: bus,
  components: {App},
  router,
  store,
  template: '<App/>'
}).$mount('#app')
