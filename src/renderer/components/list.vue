<template>
  <div>
    <!-- 这是列表 -->

    <div style="line-height: 25px;width: 250px;">
      <Button @click="view_button" size="small"
              icon="md-eye"
              type="error">按钮可见
      </Button>
      <Button @click="f5=!f5" size="small"
              icon="md-refresh"
              type="primary" id="f5">刷新列表
      </Button>
      <Button @click="view_all"
              size="small"
              icon="md-list"
              type="info">全部API
      </Button>


      <Button type="warning" shape="circle"
              size="small"
              id="position_api"
              @click="openopenapiinlist"
              icon="md-locate">定位当前API
      </Button>
      <br>
    </div>
    <div :style="{height:list_height}" class="listdiv25">

      <list_index :f5="f5"
                  :nowapi="nowapi"
                  :zhantie="fuzhi"
                  @fuzhi="fuzhi2" :add="add"
                  @add_content="add_content" dir=".">
      </list_index>
    </div>


  </div>

</template>

<script>
import list_index from './list/index'

export default {
  name: 'list',
  data() {
    return {
      style21:{},
      listdata: {},
      add: true,
      f5: true,
      fuzhi: false,
      nowapi: ''
    }
  },
  components: {list_index},
  computed: {

  },
  methods: {
    /**
     * 构建索引,将数据哭写入数据库方便搜索
     *
     */
    index_call(){
      for (let li in this.$store.state.api_list) {
        // console.log('46',api)
        let api = this.object_copy(this.$store.state.api_list[li]);
        api.object = this.$store.state.now_object;
        if (typeof api.uniqid === 'string' ) {
          //存在唯一标志,可用
          this.$db.api.findOne({
            'uniqid':api.uniqid
          },(err, doc)=>{
            if(err) throw err;
            if(doc){
              this.$db.api.update({
                'uniqid':api.uniqid
              },api,{},()=>{
                this.$Message.success("更新一个索引成功!")
              });
            }else{
              this.$db.api.insert(api,()=>{
                this.$Message.success("增加一个索引成功!")
              });
            }
          });
        }
      }
    },
    /**
     * 打开当前一打开的API所属的位置
     */
    openopenapiinlist() {
      this.nowapi = this.$store.state.nowapi;
    },
    fuzhi2() {
      this.fuzhi = !this.fuzhi;
      console.log('fuzhi2fuzhi2fuzhi2');
    },
    add_content(content) {
      if (this.$lodash.isString(content)) {
        this.$router.push('/open/' + content)
      } else {
        console.log(content)
        this.$router.push({
          name: content.name,
          query: content.query
        })
      }

    },
    view_all() {
      this.$router.push({
        name: 'all_api'
      })
    },
    view_button() {
      this.add = !this.add
    }
  },
  created() {
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
