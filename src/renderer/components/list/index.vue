<template>
  <div >
    <div :style="style2"
         style="margin-top: 10px;margin-left: 3px;margin-right: 2px;">
      <div :id="'listgroup_'+_uid">

        <Collapse v-model="openname">
          <Panel
                 v-for="(groupobj,index) in listdata.group"
                 :name="groupobj.e_name"
                 :key="index">
            {{ groupobj.name }}
            <span class="group_type">{{ groupobj.type }}</span>
            ({{ groupobj['api_count'] }})

            <p slot="content">
              <list_index :add="add"
                          @count="countfun"
                          :dd="groupobj"
                          :dir="groupobj.e_name|dirr(dir)"
                          :zhantie="zhantie"
                          v-on:fuzhi="fuzhi"
                          :f5="f5"
                          :nowapi="nowapi"
                          @open="open_panel"
                          @add_content="add_content">
              </list_index>
            </p>
          </Panel>

        </Collapse>
        <div>
          <div v-for="(apiobj,index) in listdata.api" :key="index">
            <div :class="apicalss">
              <div :id="'listapi_'+apiobj.number"
                   @click.left="goto(apiobj)"
                   @click.right="youjian(apiobj)">
                <Poptip trigger="focus"
                        content="点击打开，右击复制,再点取消复制">
                  <div>

                    <span>
                       {{ apiobj.name }}
                    </span>
                    <span  >
                      <Icon v-if="apiobj.soft_link" type="ios-link"/>
                      <span v-if="!apiobj.soft_link" class="request_type">
                        {{ apiobj.request_type }}
                      </span>
                      <Icon v-if="apiobj.number === nowapi" color="red"
                            size="20" type="md-locate"/>
                    </span>


                  </div>
                </Poptip>

              </div>

            </div>
          </div>
        </div>
      </div>
      <span>
        API:{{ now_api_count }};合计 {{ count.api_count }}

        <br>
        分组:{{ now_group_count }};合计 {{ count.group_count }}

        {{openname}}

      </span>
      <div style="margin-bottom: 1px" v-if="add">
        <Button @click="add_group" size="small" type="primary">+分组</Button>

        <Button @click="open_in_folder" size="small" type="info">OIF</Button>
      </div>


      <div v-if="dir!='.' && add">

        <Button v-if="dd.type  != 'test'"
                @click="add_api" size="small" type="primary">+API
        </Button>
        <Button v-if="dd.type  == 'test'"
                @click="add_test" size="small" type="info">+TEST
        </Button>

        <Button v-if="dd.type  != 'test'"
                @click="group_info" size="small" type="primary">当前分组参数
        </Button>
        <Button @click="edit_group" size="small" type="primary">编辑分组</Button>
        <Button @click="del_group" size="small" type="error">删除分组</Button>

        <Button v-if="zhantie" @click="zhantie2"
                size="small" type="warning">粘贴到此分组
        </Button>
      </div>
    </div>


  </div>

</template>

<script>
import lists from '@/logic/lists'
// import tool from '@/libs/tool'
import list_index from './index'
import path from 'path'
import {shell} from 'electron'
import lodash from 'lodash';

export default {
  name: 'list_index',
  data() {
    return {
      openname:'',
      count: {
        api_count: 0,
        group_count: 0
      },
      count_list: {},
      listdata: {
        group: {},
        api: {}
      }
    }
  },
  props: [
    'dir',
    'add',
    'dd',
    'f5',
    'nowapi',
    'zhantie'
  ],
  watch: {
    f5() {
      console.log('f5')
      this.init()
    },
    nowapi(){
      // 当前分组有API
      this.openopen();
    }

  },
  //dir
  filters: {
    dirr(value, dir) {
      return path.posix.join(dir, value)
    },
    apito(value) {
      console.log('79', value)
      if (value.request_type == 'ws') {
        return {name: 'api_ws', query: {number: value.number}}
      } else {
        return {name: 'api', query: {number: value.number}}
      }

    }
  },
  computed: {
    style2() {
      return {
        // 'border-color':tool.getRandomColor()
      }

    },
    now_api_count() {
      return Object.keys(this.listdata.api).length;
    },
    now_group_count() {
      return Object.keys(this.listdata.group).length;
    },
    apicalss() {
      if (this.dd.type == 'test') {
        return 'api-li-test';
      }
      if (this.dd.type == 'ws') {
        return 'api-li-ws';
      }

      return 'api-li';
    }
  },
  components: {list_index},
  methods: {
    openopen(){
      if(this.now_api_count){
        let  noinowapi =this.nowapi;
        let has = lodash.findKey(this.listdata.api,['number',noinowapi]);
        let app1 = this.listdata.api[has];
        console.log('nowapi',noinowapi,has,app1 ,this.dd['e_name'] )
        if(has){
          // 存在
          this.$emit('open',this.dd['e_name']);
          setTimeout(()=>{
            let appdom = document.getElementById('listapi_'+app1.number);
            if(appdom){
              appdom.scrollIntoView({
                behavior:"smooth",
                block: "center"
              });
              // appdom.scroll(0,50)
            }

          },1000)

        }
      }
    },
    open_panel(nowopen){
      this.openname=[nowopen];
      this.$emit('open',this.dd.e_name)
    },
    countfun([ename, sub_count]) {
      if (ename) {
        // this.count_list[ename]= sub_count;
        let gg169 = this.object_copy(lodash.merge(this.listdata.group[ename], sub_count));
        console.log('gg169',ename,gg169);
        this.$set(this.listdata.group,
            ename,
            gg169
        );

        let api_count = this.now_api_count;
        let group_count = this.now_group_count;
        for (let li in this.listdata.group) {
          let gg = this.listdata.group[li];

          if (typeof gg['api_count'] === 'number') {
            api_count = api_count + gg['api_count'];
            group_count = group_count + gg['group_count'];
          }
        }
        this.count = {
          api_count: api_count,
          group_count: group_count
        };

      }

      if (typeof (this.dd) === 'object') {
        console.log('emit1911', this.dd['e_name'], this.count)
        // let argg= [];
        this.$emit('count', [this.dd['e_name'], this.count]);
      }


    },
    apito(value) {
      let apiid;
      if(typeof value.uniqid === 'undefined'){
        this.$Message.warning("项目API数据格式是旧版本的,请到全部列表升级API数据格式");
        return ;
      }
      apiid = value.uniqid;
      if (this.dd.type == 'test') {
        return {name: 'test', params: {apiid: apiid}}
      } else {
        if (value.request_type == 'ws') {
          return {name: 'api_ws', params: {apiid: apiid}}
        } else {

          return {name: 'api', params: {apiid: apiid}}
        }
      }
    },
    goto(api) {
      console.log(11155, this.apito(api));
      // this.nowapi = api.number;
      this.$router.push(this.apito(api));
      console.log(api);
    },
    youjian(api) {
      this.$ls.set('fuzhi', api);
      this.fuzhi();
    },
    fuzhi() {
      this.$emit('fuzhi');
    },
    zhantie2() {
      console.log("粘贴1");

      this.$emit('add_content', {
        name: 'fuzhi_api',
        query: {
          dir: this.dir
        }
      })
      this.$emit('fuzhi');
    },
    open_in_folder() {
      this.$Message.loading('正在使用文件管理器打开...')
      setTimeout(() => {
        shell.showItemInFolder(path.join(this.$store.state.now_open, this.dir))
      }, 1000)

    },
    empty(valuee) {
      console.log('ll', valuee)
      return this.$lodash.isEmpty(valuee)
    },
    group_info() {
      this.$router.push({
        name: 'group_info', query: {
          dir: this.dd.dir,
          e_name: this.dd.e_name
        }
      })
    },
    edit_group() {
      if (this.dir != '.' && this.listdata.dir != '.') {
        this.$router.push({
          name: 'edit_group', query: {
            dir: this.dd.dir,
            e_name: this.dd.e_name
          }
        })
      }

    },
    del_group() {
      console.log('shanchu', this.dd)
      this.$Modal.confirm({
        title: '删除警告!',
        content: '<p>您确定要删除这个分组么?名字:' + this.name,
        onOk: () => {
          let listo = new lists(this.dd.dir)
          listo.read(() => {
            listo.remove_group(this.dd.e_name, () => {
              this.$Message.info('删除完成!')
              // this.$router.currentRoute;

              // this.$router.push('/open')
            })
          })

        },
        onCancel: () => {
          this.$Message.info('出尔反尔!')
        }
      })

    },
    add_group() {
      console.log('增加分组')
      this.$emit('add_content', {
        name: 'add_group',
        query: {
          dir: this.dir
        }
      })
    },
    add_content(content) {
      this.$emit('add_content', content)
    },
    add_api() {
      console.log('增加API')
      this.$emit('add_content', {
        name: 'add_api',
        query: {
          dir: this.dir
        }
      })
    },
    add_test() {
      this.$emit('add_content', {
        name: 'add_test',
        query: {
          dir: this.dir
        }
      })
    },
    init() {
      let listo = new lists(this.dir)
      listo.read((data) => {
        let api={};
        let group={};
        this.$lodash.forIn(data.group, (b, key) => {
          if(typeof this.listdata.group[key] ==='undefined'){
            this.$store.commit('add_group', this.$lodash.clone(b))
          }
          group[key] = b;
        })
        this.$set(this.listdata,'group',group);
        // this.listdata = this.object_copy(data);
        this.$lodash.forIn(data.api,(b,key)=>{
        //
          console.log(360,b)
          if(lodash.findIndex(this.listdata.api,['e_name',b.e_name] )=== -1){
            // 不存在
            if(typeof this.listdata.api[key] ==='undefined'){
              this.$store.commit('add_api', b)
            }

            api[key] = b;

          }
          this.$set(this.listdata,'api',api);
        });


        // this.$lodash.forIn(this.listdata.api, (b,key) => {
        //   this.$store.commit('add_api', b)
        //   this.listdata.api[key].number = this.$store.getters.apinum
        //
        // })


        this.count = {
          api_count: this.now_api_count,
          group_count: this.now_group_count
        };
        this.countfun([false, {}]);
        this.openopen();
      })
    }
  },
  created() {
    this.init()

  }
}
</script>

<style>

.type {
  font-size: 1.1em;
  font-weight: bold;
  color: brown;
}

.ivu-cell-extra {
  font-size: 1.1em;
  font-weight: bold;
  color: brown;
}
</style>
