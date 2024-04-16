<template>
    <div>
      <envlist v-model="form" :defaultValue="[]" @save="save">
      </envlist>
    </div>
</template>

<script>
  import api from '@/logic/api'
  import envlist from "../env/envlist";

  export default {
    name: 'path',

    data () {
      return {
        form: [],
        form2: [],
        ddata1: {}
      }
    },
    components:{envlist},
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
          this.apiobj.read('path', this.form, (data) => {
            console.log('ragetd', data)
            this.form = data
            this.init_data()

          })
        }

      },
      init_data () {
        this.form2 = this.$lodash.cloneDeep(this.form)
      },
      save () {
        console.log('save4get')
        let newdata = []
        for (let val of this.form) {
          if (val.name != '') {
            newdata.push(val)
          }
        }
        this.form = newdata
        this.form2 = this.$lodash.cloneDeep(this.form)
        this.apiobj.save('path', newdata, () => {
          console.log('保存成功')
        })
      },
      add_one () {
        this.form.push({
          name: '',
          value: '',
          description: ''
        })
      },
      input2 () {
        this.ddata1 = {}
        this.$lodash.forIn(this.form2, (d) => {
          this.ddata1[d.name] = d.value
        })
        this.$emit('input', this.form2);
        this.$emit('save', this.form2)
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
