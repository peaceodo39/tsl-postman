<template>
  <div id="app" style="height: 100vh">
    <div class="share-ding">
      <div v-if="share_input" style="float: left;width: 280px;">
        <Input style="width: 220px;"
               placeholder="输入分享码"
               v-model="share_text"></Input>
        <Button type="success"
                @click="share_check"
                color="red" shape="circle">
          确认
        </Button>
      </div>

      <Button style="float: left" type="error" @click="share_input=!share_input"
              color="red" shape="circle" icon="md-share"></Button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import object from "./logic/object";
import lodash from 'lodash';
import debugview from "./components/common/debugview";
import {clipboard, ipcRenderer} from "electron";
const ipc = require('electron').ipcRenderer

export default {
  name: 'api_demo',
  data() {
    return {
      hist: [],
      hist_list: {},
      share_input: false,
      share_text: ''
    }
  },
  components: {debugview},
  methods: {

    open_api(value) {
      let apitorter;
      if (value.request_type == 'ws') {
        apitorter = {name: 'api_ws', params: {apiid: value.uniqid}}
      } else {
        apitorter = {name: 'api', params: {apiid: value.uniqid}}
      }
      this.$router.push(apitorter);

    },
    share_open(object, apidata) {
      console.log(object, apidata)
      if (this.$store.state.now_open === object.dir) {
        // 当前项目已开启
        // this.$Message.success("当前项目已开启")
        this.open_api(apidata);
      } else {
        this.$store.commit('set_now', object.dir);
        this.$router.push('/open/')
        // 延迟三秒执行
        setTimeout(() => {
          this.open_api(apidata);
        }, 3000)

      }
    },

    shaer_gocheck(object, apidata) {
      this.share_input = false;
      // this.share_text = '';
      this.$Modal.confirm({
        title: '分享的API:' + apidata.name,
        content: "来自项目:" + object.name + ' <br>位于文件夹:' + object.dir,
        okText: "打开API",
        cancelText: "取消",
        onOk: () => {
          this.share_open(object, apidata);
        },
        onCancel: () => {

        }
      });
    },
    share_check() {
      if (this.share_text.substr(0, 4) === 'tsl-postman') {
        let qian = this.share_text.substr(7).split('/')[0];
        let aaaa = qian.split('.', 10);
        let object_code = aaaa[0];
        if (typeof this.hist_list[object_code] === 'object') {
          let dir = this.hist_list[object_code].dir;
          let uniqid = aaaa[1];
          this.$Message.success("找到项目:" + dir);
          this.$db.api.findOne({uniqid: uniqid}, {}, (err, doc) => {
            if (err) {
              throw  err;
            }
            // 读取成功
            if (doc) {
              console.log('索引数据!', doc)
              this.shaer_gocheck(this.hist_list[object_code], doc)

            } else {
              // 没有数据
              this.$Message.warning("没有找到相关API,你可以到项目中刷新索引重试");
            }
          });

        }
        console.log(aaaa, object_code)
      } else {
        this.$Message.warning("不合规");
      }
    },
    history() {
      let hist = this.$ls.get('history')
      this.hist = hist;
      for (let dir of this.hist) {

        let obj = new object(dir);
        obj.read('index', {}, (data) => {
          console.log("APP.readIndex",data);
          if (!lodash.isEmpty(data)) {
            // 存在数据
            if (typeof data.e_name === 'string') {
              // this.hist_list[data.e_name] = data;
              let dd = this.object_copy(data);
              dd.dir = dir;
              this.$set(this.hist_list, data.e_name, dd);
            }
          }
          this.openview();
        });
      }

    },
    openview(){
      console.log('open-view')
      ipcRenderer.send('open-view',['aaa'])
    },
    init() {
      // focus
      ipc.on('focus', () => {
        // alert('focus')
        let urlStr = clipboard.readText('clipboard');
        if(!lodash.isEmpty(urlStr)){
          if (urlStr.substr(0, 4) === 'tsl-postman') {
            if(this.share_text != urlStr){
              this.share_text = urlStr
              this.share_check();
            }

          }

        }

      });
      ipc.on('open-view', (event, args) => {
        console.log('open-view', args)
        if(!lodash.isEmpty(args.urlStr)){
          this.share_text = args.urlStr
          this.share_check();
        }

      });

    }
  },
  created() {
    this.history()
    setInterval(() => {
      console.clear();
      console.log("每个30秒清空一次")
    }, 300000);
    this.init();
    // fails and will log a warning.
    //this.$validator.locale = 'zh_CN'

    // works and will regenerate the error messages.
    //this.$i18n.locale = 'zh_CN'
  }
}
</script>

<style>
/* CSS */
.share-ding {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  padding: 5px;
  background-color: #409eff;
  border-radius: 5px;
}
</style>
