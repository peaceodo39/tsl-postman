<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo{
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav{
  width: 500px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center{
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark"
              :active-name="activename">
          <div class="layout-logo">tsl-postman</div>
          <div class="layout-nav">
            <MenuItem name="1"   >
              <Icon type="md-home" ></Icon>
              <span @click="gohome">
                首页
              </span>

            </MenuItem>
            <MenuItem name="2" :to="{name:'about'}">
              <Icon type="ios-at-outline" />
              关于我们
            </MenuItem>
            <MenuItem name="3" :to="{name:'setting'}">
              <Icon type="md-settings" />
              设置
            </MenuItem>
            <MenuItem name="4" :to="{name:'help'}">
              <Icon type="md-help-circle" />
              帮助文档
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">

        </Breadcrumb>
        <Card>
          <div :style="{height:content2_height}" style="overflow-y: scroll">
            <router-view></router-view>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">
        <tsl-postmanfooter></tsl-postmanfooter>
      </Footer>

    </Layout>
  </div>
</template>
<script>
import tsl-postmanfooter from './software/tsl-postman-footer';

export default {
  name: "software",
  data(){
    return {
      activename:1,
      content2_height:100
    }
  },
  components:{
    tsl-postmanfooter
  },
  methods:{
    init(){
      let h94 = 64 + + 49 + 24 + 24 + 24;
      // ivu-layout-header 64 +
      // ivu-breadcrumb 21+16+16(高+外框)
      // ivu-layout-footer 49
      // ivu-layout-content pading 24*2
      // list 按钮 55
      this.content2_height = (document.body.clientHeight - h94).toString() + 'px';
    }
  },
  created() {
    this.init();
    window.onresize=()=>{
      console.log('onresize');
      this.init();
      this.$forceUpdate();
    }
  }
}
</script>
