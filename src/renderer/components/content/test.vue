<template>
    <div style="overflow: auto;height: 600px;">
        <div>
            TEST :
            {{dd1}}
            <Button @click="deletee" size="small" type="primary">删除API</Button>
            <br>
            分组信息 : {{group}} <br>
        </div>

        <br>

        


    </div>
</template>

<script>
  import readme from './api/readme'
  import lists from '../../logic/lists'


  export default {
    name: 'api',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        group: {},
        is_init: false,
        dd1: this.$store.state.api_list[this.number],
        send: {
          get: {},
          form: {},
          headers: {}
        },
        select: {
          readme: true,
          jiben: false,
          get: false,
          form: false,
          header: false,
          test: false,
          generated: false
        },
        grnerated: {},
        edit: {
          readme: false,
          jiben: false,
          get: false,
          form: false,
          header: false,
          test: false,
          generated: false
        }
      }
    },
    //无状态组件
    functional: false,

    extends: {
      // 扩展
    },

    props: [
      'number'
    ],

    components: {
      //注册组件
      readme
    },
    watch: {
      number () {
        this.init()
      }
    },
    methods: {
      deletee () {
        console.log('删除')
        let listb = new lists(this.dd1.dir)
        listb.read((data) => {
          console.log('data', data)
          listb.remove_test(this.dd1.e_name, () => {
            this.$Message.success('删除成功!')
            this.$router.push('/open/')
          })
        })

      },
      //方法列表
      select1 (name) {
        console.log('select1')
        this.select.readme = false
        this.select[name] = true
      },
      //初始化
      init () {
        return false;
       
      }
    },

    created () {
      //创建完成后
      this.init()
    }
  }
</script>

<style>

</style>
