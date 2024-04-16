<template>
  <div>
    <div>
      <div>
        <div v-if="!empty2(send.get)" >
          <span>get参数</span>
          <form_input2 :list="send.get"
                     :form="send2.get"

                     index2="get" @save="send_save">
          </form_input2>
        </div>
        <div v-if="!empty2(send.path)" >
          <span>path 参数</span>
          <form_list :list="send.path"
                     :form="send2.path"

                     index2="path" @save="send_save">
          </form_list>
        </div>

        <div v-if="!empty2(send.form)" >
          <span>form参数</span>
          <div>
            <form_input2 :list="send.form"
                       :form="send2['form']"
                       index2="form"
                       @save="send_save">
            </form_input2>
          </div>
        </div>

        <div v-if="!empty2(send.headers)" >
          <span>header 参数</span>

          <form_list :list="send.headers"
                     :form="send2.headers"

                     index2="headers" @save="send_save">
          </form_list>
        </div>
      </div>



    </div>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button @click="random" size="small" type="primary">数据生成</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button @click="test" size="small" type="primary">进行测试</Button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button @click="test13" size="small" type="primary">生成 & 测试</Button>

    <Button @click="test100" size="small" type="primary">生成 & 测试 *100</Button>

    {{request_end -request_start }}ms
    <response :response="response" :api="api" :errormsg="errormsg"></response>

  </div>
</template>
<script>
import test from '../../../logic/test'
import response from './response'
import Mock from 'mockjs'
import jsonFormat from 'json-format'
import form_input2 from './form_input2'
import form_list from './form_list'

export default {
  name: 'test',
  data() {
    return {
      request_start:0,
      request_end:0,
      testob: {},
      response: {},
      send2: {
        get:{},
        form:{},
        headers:{}
      },
      loading: true,
      errormsg: '',
      info_xy: false
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
    response,
    form_input2,
    form_list
  },
  methods: {
    send_save(index,fdata){

      console.log('save',index,fdata);
      // this.send2[index]=fdata;
      this.$set(this.send2,index,fdata);
      this.$forceUpdate();
    },
    //方法列表
    info() {
      this.info_xy = !this.info_xy;
    },
    // 处理数据
    random() {
      console.log('应用生成器!')
      let mmrule = {}
       let send = this.send2
        send.url = this.api.url;
      var Random = Mock.Random
      for (let valu of this.grnerated) {
        if (typeof mmrule[valu.name] == 'undefined') {
          mmrule[valu.name] = {};
        }
        if (this.$lodash.isEmpty(valu.format)) {
          //没有参数
          console.log('56!', valu)
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
      send = this.$lodash.merge(send, mmrule)
      // get参数，排除空数据
      let get = {};
      for (let li in send.get){
        let val150 = send.get[li];
        if(val150 !== ''){
          get[li] = val150;
        }
      }
      send.get = get;
      // Url 参数应用
      let url = send.url;
      for (let li141 in send.path){
        url= url.replace('{'+li141+'}', send.path[li141]);
      }
      send.url = url;

      // 赋值并强刷页面
      for (let li126 in send){
        this.$set(this.send2,li126,this.object_copy(send[li126]));
      }
      this.$forceUpdate();
      console.log('se4nd', this.send2)

    },
    test() {
      //进行测试
      if(typeof this.send2.url =='undefined'){
        // 需要生成数据
        this.$Message.warning('需要先生成数据！');
        return false;
      }
      if (this.loading === false) {
        this.loading = true;
        this.test1(this.send2)
      }

    },
    test13() {

      this.random();
      this.test();
    },
    test100() {
      for (let i = 0; i < 100; i++) {
        this.loading=false;
        this.test13();
      }
    },
    // 实际请求方法
    test1(send) {

      this.errormsg = '';
      if (this.$lodash.isEmpty(this.testob)) {
        this.init();
      }
      this.request_start = new Date();
      // 准备发送数据

      this.testob.send(send, (data) => {
        console.log(136,data);
        this.request_end = new Date();
        // 成功处理
        this.loading = false;
        this.response = this.$lodash.cloneDeep(data);

      }, (error) => {
        this.request_end = new Date();
        this.errormsg = error;
        // 错误处理
        this.loading = false;

        if (error.response) {
          //请求已发出,但服务器使用状态代码进行响应
          //落在2xx的范围之外
          console.log('error.response', error.response)
          this.response = error.response;

        } else {
          //在设置触发错误的请求时发生了错误
          this.errormsg = error;
          console.log('Error', error.message)
        }
        //console.log(error.config)
        //this.response = this.$lodash.cloneDeep(error.config)
      })
    },
    init() {
      this.response = {};
      this.loading = false;
      this.send2 = {
        get:{},
        form:{},
        headers:{}
      };
      if (!this.$lodash.isEmpty(this.api) && !this.$lodash.isEmpty(this.group)) {
        this.testob = new test(this.api, this.group)
      }
      this.$forceUpdate();
    }
  },
  watch: {
    //监听列表
    send: {
      deep: true,
      handler(noww1) {
        console.log(noww1)
        this.init()
      }
    },
    api: {
      deep: true,
      handler(noww1) {
        console.log(noww1)
        this.init()
      }
    },
    group:{
      deep: true,
      handler(noww1) {
        console.log(noww1)
        this.init()
      }
    },
    loading(new1) {
      if (new1 === true) {
        this.$Spin.show();
      } else {
        this.$Spin.hide();
      }
    }
  },

  created() {
    //创建完成后
    this.init()
  },
  filters: {
    //过滤器
    format(value1) {
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
