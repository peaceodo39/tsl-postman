<template>
    <div>
        结构 信息编辑{{edit}}
        <div v-if="edit">
            编辑
            <form action="">
                <Input v-model="form" type="textarea"
                       :autosize="{minRows: 2,maxRows: 5}" placeholder="数据格式"/>

                <span>
                    可用变量$url:地址
                    $get :get参数(数组格式)
                    $form:post表单(数组格式)
                </span>
            </form>
        </div>

        <div v-if="!edit">
            {{form2}}
        </div>
    </div>
</template>

<script>
  import api from '@/logic/api'

  export default {
    name: 'api_structure',

    data () {
      return {
        form: '',
        form2: '',
        ddata1: {}
      }
    },
    props: [
      //数据传参
      'dd',
      'edit',
      'value'
    ],
    methods: {
      //方法列表
      //方法列表
      init () {
        if (typeof this.dd.dir == 'string') {
          this.apiobj = new api(this.dd)
          this.apiobj.read('structure', this.form, (data) => {
            console.log('ragetd_structure', data)
            this.form = data
            this.init_data()

          })
        }

      },
      init_data () {
        this.form2 = this.$lodash.cloneDeep(this.form)
      },
      save () {
        console.log('save4strcuture')
        this.form2 = this.$lodash.cloneDeep(this.form)
        this.apiobj.save('structure', this.form, () => {
          console.log('保存成功')
        })
      },

      input2 () {
        console.log('form2', this.form2)
        this.$emit('input', this.form2)

      }
    },
    watch: {
      //监听列表
      edit (new1) {
        if (new1 === false) {
          this.save()
        }
      },
      dd () {
        this.init()
      },
      form2: {
        handler () {
          this.input2()
        },
        deep: true
      }
    },
    created () {
      //创建完成后
      this.init()
    },
  }
</script>

<style>

</style>
