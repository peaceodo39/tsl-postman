<template>
    <div>
        WS 测试结果组件
        <br>
        <ButtonGroup>
            <Button :style="bus" @click="open('all')" ghost type="primary">ALL</Button>

          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button @click="copy" size="small" type="primary">复制数据</Button>
        </ButtonGroup>
        <div>
            <div v-if="status.all">
                <pre>{{response|format}}</pre>
            </div>

        </div>
    </div>
</template>

<script>

  import jsonFormat from 'json-format'
  import {clipboard} from "electron";

  export default {
    name: 'response_ws',
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
        status: {
          all: true
        }
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
      'response'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
    },
    methods: {
      copy(){
        clipboard.writeText(this.format_data2(this.response,'json'));
      },
      format_data2(value1,dt='json'){
        let aa = '';

        if (dt == 'json') {
          aa = jsonFormat(value1, {
            type: 'space',
            size: 4
          })
        } else {
          aa = value1;
        }

        console.log(aa);
        return aa;
      },
      //方法列表
      open (name) {
        this.status.data = false
        this.status.config = false
        this.status.headers = false
        this.status.status = false
        this.status.all = false
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
