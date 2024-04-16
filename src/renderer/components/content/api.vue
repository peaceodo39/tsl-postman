<template>
  <div>
    <div v-if="!dd1">
      数据读取失败
      <Countdown content="重新读取" count="3" @ok="refresh"></Countdown>
      <Button @click="refresh">
        立即 重新读取
      </Button>
    </div>
    <div v-if="dd1">
      <div>
        <h3>
          {{ dd1.name }}
          <span v-if="!empty2(dd_softlink)" style="color: #a1a1a1">
            {{ dd_softlink.name }} - {{ dd_softlink.e_name }}
            <Button @click="deletee_link"
                      icon="md-remove-circle"
                      v-if="!empty2(dd_softlink)"
                      size="small" type="primary">
              删除软连接
            </Button>
            <Button @click="share(dd_softlink)"
                    icon="md-share-alt"
                    v-if="!empty2(dd_softlink)"
                    size="small" type="warning">
              分享API
            </Button>
          </span>

        </h3>
        <div style="font-size: 20px">
              <span class="request_type">
                {{ dd1.request_type }}
              </span>
          <span>
                {{ request_true_url }}
              </span>

          <span style="color: #a1a1a1">
                {{ dd1.e_name }}
              </span>
          <Button @click="deletee"
                  icon="md-remove-circle"

                  v-if="empty2(dd_softlink)"
                  size="small" type="primary">
            删除API
          </Button>

          <Button @click="share(dd1)"
                  icon="md-share-alt"
                  v-if="empty2(dd_softlink)"
                  size="small" type="warning">
            分享API
          </Button>
          <Button @click="shareurl(dd1)"
                  icon="md-share-alt"
                  v-if="empty2(dd_softlink)"
                  size="small" type="warning">
            网址分享
          </Button>


        </div>

        <div v-if="status2 !== 'test'">
          <div v-show="status2 === 'get' || status2 ===  'readme'">
            <span>get参数</span>
            <form_input2 :list="send_env.get">
            </form_input2>
          </div>
          <div v-show="status2 === 'path' || status2 ===  'readme'">
            <span>path参数</span>
            <form_list :list="send_env.path">
            </form_list>
          </div>

          <div v-show="status2 === 'form' || status2 ===  'readme'">
            <span>form参数</span>
            <div>
              <form_input2 :list="send_env.form"></form_input2>
            </div>
          </div>

          <div v-show="status2 === 'header' || status2 === 'readme'">
            <span>header 参数</span>

            <form_list :list="send_env.headers">
            </form_list>
          </div>
        </div>
      </div>

      <br>
      <div>
        <RadioGroup v-model="status2" type="button">
          <Radio label="readme">readme</Radio>
          <Radio label="jiben">基本信息</Radio>

          <Radio label="jiben2" v-if="!empty2(dd_softlink)">软连接信息</Radio>

          <Radio label="get">get</Radio>
          <Radio label="path">path</Radio>
          <Radio label="form">form</Radio>
          <Radio label="header">header</Radio>
          <Radio label="test">test</Radio>
          <Radio label="generated">数据生成</Radio>

        </RadioGroup>


        <div v-show="status2 === 'readme'">
          <div>
            <readme :dd="dd1" v-model="is_init"></readme>
          </div>

        </div>
        <div v-if="is_init" v-show="status2 === 'jiben'">
          <basic :dd="dd1" @save="init"></basic>
        </div>

        <div v-if="is_init" v-show="status2 === 'jiben2'">
          <basic :dd="dd_softlink" @save="init"></basic>
        </div>

        <div v-if="is_init" v-show="status2 === 'get'">
          <api_get :dd="dd1"

                   @save="send_save"
                   v-model="send.get"></api_get>
        </div>
        <div v-if="is_init" v-show="status2 === 'path'">
          <api_path :dd="dd1"

                   @save="send_save"
                   v-model="send.path"></api_path>
        </div>
        <div v-if="is_init" v-show="status2 === 'form'">
          <api_form :dd="dd1"

                    @save="send_save"
                    v-model="send.form">
          </api_form>
        </div>
        <div v-if="is_init" v-show="status2 === 'header'">

          <api_header :dd="dd1"
                      @save="send_save"
                      v-model="send.headers">
          </api_header>
        </div>

        <div v-if="is_init && status2 === 'test'">
          <api_test :api="dd1" :grnerated="grnerated"
                    :group="group_env"
                    :send="send_env"></api_test>
        </div>

        <div v-if="is_init" v-show="status2 === 'generated'">

          <generated :api="dd1"

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
import api_path from './api/path'
import api_form from './api/form'
import api_header from './api/header'
import api_test from './api/test'
import lists from '../../logic/lists'
import group from '@/logic/group'
import generated from './api/generated'
import envv from "../../logic/envv";
import form_input from './api/form_input'
import form_input2 from './api/form_input2'
import api from "../../mixin/api";
import form_list from './api/form_list'
import Countdown from "../common/Countdown";

export default {
  name: 'api',
  //混合
  mixins: [api],

  delimiters: [
    //改变纯文本插入分隔符
  ],
  data() {
    return {
      dd_softlink: {},//
      dd1: {},
      envlist: {},
      now_env: [],
      group: {},
      group_env: {},
      is_init: false,
      send: {
        get: {},
        form: {},
        headers: {}
      },
      send_env: {},
      status2: 'readme',
      grnerated: {},
    }
  },
  //无状态组件
  functional: false,

  extends: {
    // 扩展
  },

  components: {
    //注册组件
    readme,
    basic,
    api_get,
    api_path,
    api_form,
    api_header,
    api_test,
    generated,
    form_input,
    form_input2,
    form_list,
    Countdown
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
    },
    request_true_url() {
      return this.group_env.type + '://' + this.group_env.domain + ':' + this.group_env.port + this.dd1.url;
    }
  },

  methods: {
    /**
     * 发送数据发生改变
     *
     */
    send_save(sedd) {
      console.log('send_save', JSON.stringify(sedd))
      this.send_env = this.apply_env(this.send);
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
    read_group() {
      let groupb = new group(this.dd1.dir)
      groupb.read('info', {}, (data) => {
        if (this.$lodash.isEmpty(data)) {
          groupb.readp('info', {}, (data) => {
            console.log('readgroup', data)
            this.group_env = this.apply_env(data);
            this.group = data;
          })

        } else {
          this.group_env = this.apply_env(data);
          this.group = data;
        }
      })
    },
    //初始化
    init() {
      this.$store.commit('set_nowapi', this.apiid)
      console.log('change', this.apiid);
      this.dd1 = this.$store.state.api_list[this.apiid];
      console.log('change', this.apiid, this.dd1);
      this.dd_softlink = {};
      if (typeof this.dd1 !== 'object') {
        return true;
      }
      if (typeof this.dd1['soft_link'] === 'boolean') {
        if (this.dd1.soft_link) {
          // 跳转
          console.log('软连接');
          this.dd_softlink = this.object_copy(this.dd1);
          this.dd1 = this.$store.state.api_list[this.dd_softlink.soft_link_id];

          // return '软连接';
        }
      }
      this.read_env();

    },
    read_api() {
      console.log('read_api', this.dd1.dir)
      let listo = new lists(this.dd1.dir)
      listo.read((data) => {
        console.log('read_api ok:', data)
        this.dd1 = data.api[this.dd1.e_name]
      })
    }
  },
  created() {
    //创建完成后
    this.init()
  }
}
</script>

<style>


</style>
