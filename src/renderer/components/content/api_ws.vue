<template>
  <div style="overflow: auto;height: 600px;">
    <div v-if="!dd1">
      未成功读取数据
      <Button @click="refresh">
        点击刷新
      </Button>
    </div>
    <div v-if="dd1">
      <div>
        <h3>
          {{ dd1.name }}
          <span v-if="!empty2(dd_softlink)" style="color: #a1a1a1">
          {{ dd_softlink.name }} - {{ dd_softlink.e_name }}
          <Button @click="deletee_link" v-if="!empty2(dd_softlink)"
                  size="small" type="primary">
          删除软连接
        </Button>
        </span>

        </h3>
        <div style="font-size: 20px">
              <span class="request_type">
                {{ dd1.request_type }}
              </span>
          <span>
                {{ dd1.url }}
              </span>

          <span style="color: #a1a1a1">
                {{ dd1.e_name }}
              </span>
          <Button @click="deletee" v-if="empty2(dd_softlink)"
                  size="small" type="primary">
            删除API
          </Button>

          <Button @click="deletee" v-if="empty2(dd_softlink)"
                  size="small" type="primary">
            删除API
          </Button>

        </div>


      </div>
      apiid : {{ apiid }} <br>
      dd1 : {{ dd1 }} <br>
      分组信息 : {{ group }} <br>
      {{group_env}} <br>
      SEND : {{ send }} <br>
      grnerated: {{ grnerated }}
      <br>
      <div>
        <Menu @on-select="select1" active-name="readme" mode="horizontal" theme="light">
          <MenuItem name="readme" style="padding: 0 10px;">
            <Icon type="ios-paper"/>
            readme
          </MenuItem>
          <MenuItem name="jiben" style="padding: 0 10px;">
            <Icon type="ios-settings"/>
            基本信息
          </MenuItem>
          <MenuItem name="jiben2" style="padding: 0 10px;">
            <Icon type="ios-settings"/>
            软连接信息
          </MenuItem>


          <MenuItem name="structure" style="padding: 0 10px;">
            <Icon type="ios-construct"/>
            结构
          </MenuItem>
          <MenuItem name="get" style="padding: 0 10px;">
            <Icon type="ios-construct"/>
            get
          </MenuItem>

          <MenuItem name="form" style="padding: 0 10px;">

            <Icon type="ios-apps"/>
            form
          </MenuItem>


          <MenuItem name="test" style="padding: 0 10px;">
            <Icon type="ios-alarm"/>
            test
          </MenuItem>

          <MenuItem name="generated" style="padding: 0 10px;">
            <Icon type="ios-alarm"/>
            generated
          </MenuItem>


        </Menu>

        <div v-show="select.readme">
          <div>
            <readme :dd="dd" :edit="edit.readme"></readme>
          </div>

        </div>
        <div v-if="is_init" v-show="select.jiben">
          基本信息
          <basic :dd="dd" :edit="edit.jiben"></basic>
        </div>

        <div v-if="is_init" v-show="select.jiben2">
          基本信息
          <basic :dd="dd_softlink" :edit="edit.jiben"></basic>
        </div>

        <div v-if="is_init" v-show="select.structure">
          <Button @click="()=>{this.edit.structure=!this.edit.structure}" icon="ios-search"
                  shape="circle"
                  type="primary">编辑
          </Button>
          <api_structure :dd="dd" :edit="edit.structure" v-model="send.structure"></api_structure>
        </div>

        <div v-if="is_init" v-show="select.get">

          <api_get :dd="dd" :edit="edit.get" v-model="send.get"></api_get>
        </div>


        <div v-if="is_init" v-show="select.form">

          <api_form :dd="dd" :edit="edit.form" v-model="send.form">
          </api_form>
        </div>


        <div v-if="is_init" v-show="select.test">
          <api_test :api="dd" :grnerated="grnerated"
                    :group="group_env"
                    :send="send"></api_test>
        </div>

        <div v-if="is_init" v-show="select.generated">
          <Button @click="()=>{this.edit.generated=!this.edit.generated}" icon="ios-search"
                  shape="circle"
                  type="primary">编辑
          </Button>
          <generated :api="dd"
                     :edit="edit.generated"
                     :group="group_env"
                     :send="send"

                     v-model="grnerated"></generated>
        </div>


      </div>
    </div>





  </div>
</template>

<script>
import readme from './api/readme'
import basic from './api/basic'
import api_get from './api/get'
import api_form from './api/form'
import api_header from './api/header'
import api_test from './api/test_ws'
import lists from '../../logic/lists'
import group from '@/logic/group'
import generated from './api/generated'
import api_structure from './api/api_structure'
import api from "../../mixin/api";
import envv from "../../logic/envv";

export default {
  name: 'api_ws',
  //混合
  mixins: [api],
  delimiters: [
    //改变纯文本插入分隔符
  ],
  data() {
    return {
      group: {},
      group_env:{},
      dd_softlink: {},
      is_init: false,
      dd1: {},
      dd: {},
      send: {
        get: {},
        form: {},
        header: {},
        structure: '',
        data: {}
      },
      select: {
        readme: true,
        jiben: false,
        jiben2: false,
        get: false,
        form: false,
        structure: false,
        test: false,
        generated: false
      },
      grnerated: {},
      edit: {
        readme: false,
        jiben: false,
        jiben2: false,
        get: false,
        form: false,
        structure: false,
        test: false,
        generated: false
      },
      envlist: {},
      now_env: [],
    }
  },
  //无状态组件
  functional: false,

  extends: {
    // 扩展
  },
  watch: {
    envselect() {
      this.group_env = this.apply_env(this.group)
    },
  },
  computed: {
    apiid() {
      return this.$route.params.apiid;
    },
    envselect() {
      return this.$store.state.envselect;
    }
  },
  components: {
    //注册组件
    readme,
    basic,
    api_get,
    api_form,
    api_header,
    api_test,
    generated,
    api_structure
  },

  methods: {

    read_group() {
      let groupb = new group(this.dd1.dir)
      groupb.read('info', {}, (data) => {
        if (this.$lodash.isEmpty(data)) {
          groupb.readp('info', {}, (data) => {
            console.log('read group', data)
            this.group = data
            this.group_env = this.apply_env(this.group)
          })

        } else {
          this.group = data
          this.group_env = this.apply_env(this.group)

        }
      })
    },
    //方法列表
    select1(name) {
      console.log('select1')
      this.select.readme = false
      this.select.jiben = false
      this.select.jiben2 = false
      this.select.get = false
      this.select.form = false
      this.select.structure = false
      this.select.test = false
      this.select.generated = false
      this.select[name] = true
    },
    //初始化
    init() {
      this.init_data()


    },
    init_data() {

      this.group = {}
      this.is_init = false
      this.$store.commit('set_nowapi', this.apiid)
      this.dd1 = this.$store.state.api_list[this.apiid];
      this.dd_softlink = {};
      if (typeof this.dd1.soft_link === 'boolean') {
        if (this.dd1.soft_link) {
          // 跳转
          console.log('软连接');
          this.dd_softlink = this.object_copy(this.dd1);
          this.dd1 = this.$store.state.api_list[this.dd_softlink.soft_link_id];
          // return '软连接';
        }
      }


      this.dd = {}
      this.send = {
        get: {},
        form: {},
        header: {},
        structure: '',
        data: {}
      }
      this.select = {
        readme: true,
        jiben: false,
        get: false,
        form: false,
        structure: false,
        test: false,
        generated: false
      }
      this.grnerated = {}
      this.edit = {
        readme: false,
        jiben: false,
        get: false,
        form: false,
        structure: false,
        test: false,
        generated: false
      }
      this.read_env()
    },
    read_api() {
      console.log('read_api', this.dd1.dir)
      let listo = new lists(this.dd1.dir)
      listo.read((data) => {
        this.is_init = true
        console.log('read_api ok:', data)
        this.dd = data.api[this.dd1.e_name]
      })
    },
    /**
     * 读取环境变量
     */
    read_env() {
      let envvob = new envv();
      envvob.read((data) => {
        console.log("环境变量读取成功!");
        this.envlist = data;
        this.read_api();
        this.read_group();
      })

    },
  },

  created() {
    //创建完成后
    this.init()
  }
}
</script>

<style>

</style>
