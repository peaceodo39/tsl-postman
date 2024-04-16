<template>
    <div>
        测试结果组件
        <br>
        <div>
          <div class="error" v-if="errormsg">

             <Alert type="error" show-icon>
                出错了
                <span slot="desc">
                    {{errormsg}}
                </span>
            </Alert>
          </div>

          <dir>


            <RadioGroup v-model="status2" type="button">
              <Radio label="data">data</Radio>
              <Radio label="config">config</Radio>
              <Radio label="status">status</Radio>
              <Radio label="headers">headers</Radio>
              <Radio label="all">all</Radio>
              <Radio label="view">view</Radio>
            </RadioGroup>

            </dir>
            <div>
            <div v-if="status2 === 'data' && api && response.data" >


              <response_data v-if="api.request_type!== 'view' || api.request_type!== 'image'"

                             :data="response.data"
                             :data_type="api.data_type"
                             :request_type="api.request_type">

              </response_data>
              <div v-if="api.request_type== 'view'">
                视图显示(红框不是内容)
                <br>
                <iframe width="100%" height="500px" style="border: 1px red solid;"
                        frameborder="0"
                        :src="response.config.url">
                </iframe>
              </div>


              <div v-if="api.request_type== 'image'">
                图片显示 (红框不是内容,1px宽)
                <br>
                <div style="border: 1px red solid;">
                  <img :src="response.config.url" >
                </div>


              </div>
            </div>

            <div v-if="status2 === 'config'">
                <pre>{{response.config|format}}</pre>
            </div>
            <div v-if="status2 === 'status'">
                <pre>{{response.status|format}}</pre>
            </div>
            <div v-if="status2 === 'headers'">
                <pre>{{response.headers|format}}</pre>
            </div>
            <div v-if="status2 === 'all'">
                <pre>{{response|format}}</pre>
            </div>
            <div v-if="status2 === 'view'">
                <!--                   v-html="response.data"  > -->
                渲染显示(框框不是内容,1px宽)
                <iframe
                    width="100%" height="500px" style="border: 1px burlywood solid;"
                    :srcdoc="response.request.responseText"
                    frameborder="0"></iframe>
            </div>
          </div>

        </div>
    </div>
</template>

<script>

  import jsonFormat from 'json-format'
  import response_data from './response_data'
  export default {
    name: 'response',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        bus: {
          width: '100px'
        },
        status2:'data',
        status: {
          data: true,
          config: false,
          status: false,
          headers: false,
          all: false,
          view:false
        },
        view:false
      }
    },
    //无状态组件
    functional: false,

    extends: {
      // 扩展
    },
    model: {
      //定制v-model,双向绑定
    },
    props: [
      //数据传参
      'response',
      'api',
      'errormsg'
    ],
    computed: {
      //计算属性
      data_html(){
        console.log('data_html',this.response.request.responseText);
        return this.response.request.responseText;
      }
    },
    components: {
      //注册组件
      response_data
    },
    methods: {
      //方法列表
      open (name) {
        this.status.data = false
        this.status.config = false
        this.status.headers = false
        this.status.status = false
        this.status.all = false
        this.status.view = false
        this.status[name] = true
      }
    },
    watch: {
      //监听列表

    },
    beforeCreate () {
      //初始化之后
    },
    created () {
      //创建完成后
    },
    beforeMount () {
      //挂载开始之前
    },
    mounted () {
      //挂载之后

    },
    beforeUpdate () {
      //更新开始之前
    },
    updated () {
      //更新之后
    },
    activated () {
      //组件 激活
    },
    deactivated () {
      //组件停用
    },
    beforeDestroy () {
      //销毁之前
    },
    destroyed () {
      //销毁之后
    },
    errorCaptured () {
      //子孙组件的错误
    },
    directives: {
      //自定义指令
    },
    filters: {
      //过滤器
      format (value1) {
        let aa = jsonFormat(value1, {
          type: 'space',
          size: 2
        })
        console.log(aa)
        return aa
      }
    }
  }
</script>

<style>

</style>
