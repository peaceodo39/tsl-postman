<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo" :class="{'dev-logo':!isPackaged}">

          </div>
          <div class="layout-nav">
            <router-link to="/">
              <Button type="success" ghost>返回首页</Button>
            </router-link>

            <Button type="warning" @click="edit" ghost>编辑</Button>

            <span v-if="obj_data" style="    color: white;">
                            项目名字: <span class="info">{{ obj_data.name }}</span>

                            描述: <span class="info">
                              {{ obj_data.description }}     {{ isPackaged }}
                          </span>
                        </span>

            <div style="width: 200px;float: right;color: white;">
              <envv @change="envselect_change"></envv>
            </div>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 10px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>{{ now }}</BreadcrumbItem>
          <BreadcrumbItem> 神马API（我还没想好这个怎么弄）</BreadcrumbItem>
        </Breadcrumb>

        <Content :style="{padding: '24px 0', minHeight: '280px',overflowY:true, background: '#fff'}">
          <Layout>
            <Sider hide-trigger width="270" :style="{background: '#fff'}">
              <div id="lists" style="min-height: 650px;max-height: 1000px;">
                <list v-model="content_list"></list>
              </div>
            </Sider>
            <Content :style="{padding: '2px', background: '#fff'}">
              <div class="content-div" :style="{height:content_height}">
                <router-view v-if="now"></router-view>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">
        <tsl-postmanfooter></tsl-postmanfooter>
      </Footer>
    </Layout>
  </div>
</template>

<script>

import fs from 'fs'
import path from 'path'
import list from './list'
import envv from './envv'
import content_index from './content/index'
import process from 'process'
import tsl-postmanfooter from './software/tsl-postman-footer';
import object from "../logic/object";
export default {
  data() {
    return {
      style21: {},
      isdir: false,
      index: '',
      obj_data: {},
      object: new object(),
      iframesrc: '/#/kong',
      content_index: 0,
      content_list: {},
      now: this.$store.state.now_open,
      isPackaged: true,
    }
  },
  name: 'open',
  components: {list, content_index, envv, tsl-postmanfooter},
  beforeRouteUpdate(to, from, next) {
    this.init()
    next()
  },
  methods: {

    envselect_change() {
      console.log("当前环境变量组改变");
      this.$forceUpdate();
    },
    dir_call() {
      this.object = new object(this.now)
      console.log(this.isdir, this.now, this.index)
      this.object.read('index', {}, (data) => {
        if (this.$lodash.isEmpty(data)) {
          this.create()
        } else {
          this.read(data)
        }
      });

    },
    read(data) {
      // 读取数据
      this.isPackaged = !process.env.WEBPACK_DEV_SERVER;
      // 保存历史
      let hist = this.$ls.get('history')
      if (hist == null) {
        hist = []
      }
      hist.push(this.now)
      hist = this.$lodash.uniq(hist)
      console.log('当前项目列表', hist)
      this.$ls.set('history', hist)
      console.log('这是配置文件的内容:', data)
      this.obj_data = data
      this.$store.commit('set_now_object', data)
    },
    edit() {
      console.log('edit')
      //this.$Message.warning("编辑的逻辑等待开发!");
      this.$router.push({name: 'create', params: {index: this.now}})
    },
    create() {
      //新建一个项目
      this.$router.push({name: 'create', params: {index: this.now}})
    },
    init() {
      this.$store.dispatch('api_num')
      if (this.now) {
        console.log('now', this.now)
        fs.stat(this.now, (err, stats) => {
          console.log(err, stats)
          if (err) {
            throw err
          } else {
            if (stats.isDirectory()) {
              //文件夹
              console.log('文件夹的处理逻辑!')
              this.isdir = true
              this.dir_call()
            } else {
              // 文件处理逻辑
              let pp = path.dirname(this.now)
              this.$store.commit('set_now', pp)
              this.$Message.success('正在打开!')

              this.$router.push('/open/')
            }
          }

        })
      }

    }

  },
  created() {

    if (this.now) {
      this.init()
    } else {
      this.$router.push('/')
    }


  }
}
</script>

<style>
.dev-logo {
  border-color: red;
}


.info {
  color: cadetblue;
}

.content-div {
  width: 100%;
  overflow-y: scroll
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;

  border-radius: 4px;
  height: 100vh;
}

.layout-logo {
  border-style: solid;
  border-width: 1px;
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 600px;
  margin: 0 auto;
  margin-right: 20px;
}


</style>
