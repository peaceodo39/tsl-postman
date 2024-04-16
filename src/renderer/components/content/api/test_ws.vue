<template>
    <div>WS --
        API : {{api}}<br>
        group:{{group}}<br>
        send: {{send2}}{{send}} <br>
      send3: {{send3}} <br>


      sendstr : {{sendstr}}
        <br>
      <div>
        <div v-if="!empty2(send.get)" >
          <span>get参数</span>
          <form_input2 :list="send.get"
                       :form="send3.get"
                       @save="send_save"
                       index2="get">
          </form_input2>
        </div>


        <div v-if="!empty2(send.form)" >
          <span>form参数</span>
          <div>
            <form_input2 :list="send.form"
                         :form="send3['form']"
                         index2="form"
                         @save="send_save">
            </form_input2>
          </div>
        </div>



      </div>

        <Button @click="jiegou" size="small" type="primary">应用结构</Button>
        <Button @click="random" size="small" type="primary">应用生成器</Button>

      <Button @click="wsrecon" size="small" type="primary">WS重连</Button>


      <br>

        <Button @click="test" size="small" type="primary">进行测试</Button>
        <Button @click="test100" size="small" type="primary">进行测试*100</Button>

      {{request_end -request_start }} ms

      <response_ws :response="response"></response_ws>

    </div>
</template>
<script>
  import test from '../../../logic/test'
  import response_ws from './response_ws'
  import Mock from 'mockjs'
  import form_input2 from './form_input2'
  import form_list from './form_list'
  export default {
    name: 'test_ws',
    data () {
      return {
        request_start:0,
        request_end:0,
        testob: {},
        response: {},
        send2: {},
        send3:{
          get:{},
          form:{},
          headers:{}
        },
        sendstr: ''
      }
    },

    props: [
      //数据传参
      'api',
      'group',
      'send',
      'grnerated'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
      response_ws,
      form_input2,
      form_list
    },
    methods: {
      //方法列表
      send_save(index,fdata){

        console.log('save',index,fdata);
        // this.send2[index]=fdata;
        this.$set(this.send3,index,fdata);
        this.$forceUpdate();
        this.jiegou();
        this.random();
      },

      wsrecon(){
          this.testob.wsrecon();
      },
      random () {
        console.log('应用生成器!')
        let mmrule = {}
        let send = this.send2
        var Random = Mock.Random
        for (let valu of this.grnerated) {
          mmrule[valu.name] = {}
          if (this.$lodash.isEmpty(valu.format)) {
            //没有参数
            mmrule[valu.name][valu.name2] = Random[valu.unit]()
          } else {
            if (this.$lodash.isArray(valu.format)) {
              //多个参数
              mmrule[valu.name][valu.name2] = Random[valu.unit](...valu.format)
            } else {
              //一个参数
              mmrule[valu.name][valu.name2] = Random[valu.unit](valu.format)
            }
          }
        }

        this.send2 = this.$lodash.merge(send, mmrule)
        console.log('se4nd', this.send2)

      },
      jiegou () {
        console.log('进行结构应用!')
        this.sendstr = this.send.structure
        this.sendstr = this.sendstr.replace('$url', this.api.url)
        this.sendstr = this.sendstr.replace('$get', JSON.stringify(this.send3.get))
        this.sendstr = this.sendstr.replace('$form', JSON.stringify(this.send3.form))

      },
      test () {
        //进行测试
        this.test1(this.sendstr)
      },
      test100 () {
        //进行测试
        for (let i = 0; i < 100; i++) {
          this.test1(this.sendstr)
        }

      },
      test1 (send) {
        console.log('send', send)
        this.request_start = new Date();
        // 准备发送数据

        this.testob.send(send, (data) => {
          console.log('返回数据!', data)
          this.response = JSON.parse(data)
          this.request_end = new Date();
        })
      },
      init () {
        this.send2 = this.$lodash.cloneDeep(this.send)
        console.log('log,init', this.api, this.group)
        this.jiegou()
        if (!this.$lodash.isEmpty(this.api) && !this.$lodash.isEmpty(this.group)) {
          this.testob = new test(this.api, this.group)
        }

      }
    },
    watch: {
      //监听列表
      send: {
        deep: true,
        handler (noww1) {
          console.log(noww1)
          this.init()
        }
      },
      group (value) {
        if (!this.$lodash.isEmpty(value)) {
          this.init()
        }
      }
    },

    created () {
      //创建完成后
      this.init()
    },
    beforeDestroy () {
      console.log('beforeDestroy', this.group)
      if (this.group.persistence == '1') {
        console.log('持久化不销毁')
      } else {
        this.testob.close()
      }
    },
    beforeRouteLeave () {
      this.beforeDestroy()
    }
  }
</script>

<style>

</style>
