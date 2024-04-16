<template>
    <div>
        <mavon-editor
                :defaultOpen="defaultOpen"
                :subfield="false"
                :toolbarsFlag="true"
                @save="save"
                style="height: 100%"
                v-model="readme"></mavon-editor>
    </div>
</template>

<script>
  import api from '@/logic/api'

  export default {
    name: 'readme',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        readme: '',
        defaultOpen: 'preview',
        toolbarsFlag: true,
        apiobj: {}
      }
    },
    props: [
      //数据传参
      'dd',
      'edit',
      'value'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
    },
    methods: {
      //方法列表
      init () {
        console.log('init', this.dd)
        if (typeof this.dd.dir == 'string') {

          this.apiobj = new api(this.dd)
          this.apiobj.readme((data) => {
            console.log('readme', data)
            this.readme = data
            this.$emit('input', true)
          })
        }
      },
      save () {
        this.apiobj.readme_save(this.readme, () => {
          // console.log('保存成功')
          this.$Message.info('保存成功');
        })

      }
    },
    watch: {
      dd: {
        immediate: true,
        handler (value, old) {
          console.log('readme changge', value, old)
          this.init()
        }

      }
    },
    beforeCreate () {
      //初始化之后
    },
    created () {
      //创建完成后
      this.init()
    }
  }
</script>

<style>

</style>
