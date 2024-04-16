<template>
    <div>
        分组信息
        <br>
        文件夹: &nbsp;&nbsp;<span style="font-size: 1.2em;font-weight: 900;">{{dir}}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;标识:&nbsp; <span style="font-size: 1.2em;font-weight: 900;"> {{e_name}}</span>
        <br>

        <div v-if="dataempty">
            <span style="color: red;">当前分组参数为空,继承父级信息为(
                <span style="color: #3737a5;font-weight: bold;">
                     表单信息保存后不再继承父级信息
                </span>

                ):</span>
            <br>
            <pre>{{ pdata }}</pre>


        </div>


        <form name="addgroup">
            <div>
                域名/IP：
                <Input v-model="form.domain" name="domain" v-validate="validation.domain"
                       placeholder="域名" style="width: 300px"/>
                <span>{{ errors.first('domain') }}</span>
            </div>
            <br>

            <div>
                 端 &nbsp;&nbsp;&nbsp;&nbsp;口 ：
                <Input name="port" placeholder="端口" style="width: 300px"
                       v-model="form.port" v-validate="validation.port"/>
                <span>{{ errors.first('port') }}</span>
            </div>
            <br>

            <div>
                协议类型：
                <RadioGroup v-model="form.type" v-validate="validation.persistence">
                    <Radio label="http"></Radio>
                    <Radio label="https"></Radio>
                    <Radio label="ws"></Radio>
                    <Radio label="wss"></Radio>
                </RadioGroup>

            </div>
            <br>

            <div>
                接口持久化：
                <RadioGroup v-model="form.persistence" v-validate="validation.persistence">
                    <Radio label="1"></Radio>
                    <Radio label="0"></Radio>
                </RadioGroup>

            </div>
            <br>

            <Button type="primary" @click="save">保存</Button>

        </form>
    </div>
</template>

<script>

  import group from '@/logic/group'
  import lodash from 'lodash'

  export default {
    name: 'add_group',
    data () {
      return {
        groupob: {},
        groupinfo: {},
        form: {
          persistence: '',
          port: '',
          domain: ''

        },
        pdata: {},
        dataempty: false,
        validation: {
          port: {

          }
        },
        attributes: {
          name: '名字1',   //设置表单属性对应的中文名
          ename: '标识',
          type: '类型'
        }
      }
    },
    props: [
      'dir',
      'e_name'
    ],
    watch: {
      dir () {
        this.init()
      },
      e_name () {
        this.init()
      }
    },
    components: {},
    methods: {
      save () {
        // 先进行验证

        this.$validator.validate().then((result) => {
          console.log('验证结果:', result, this.$validator.errors.all())
          if (result) {
            // 验证通过
            this.save_file()
          }
        })
      },
      save_file () {

        this.groupob.save('info', this.form, (data) => {
          console.log('save_ok', data)
          this.$Message.success('保存成功!')
          this.init()
        })

      },
      init () {
        console.log('init', this.dir, this.e_name)
        this.groupob = new group(this.dir + '/' + this.e_name)
        this.groupob.read('info', {}, (data) => {
          this.form = this.$lodash.clone(data)
          this.dataempty = this.$lodash.isEmpty(this.form)
          if (this.dataempty) {
            //读取父级分组的信息
            this.groupob.readp('info', {}, (data) => {
              console.log('readp', data)
              this.pdata = data
              this.form = this.pdata
            })
          }

        })
      }
    },
    created () {
      this.init()
      this.$validator.localize('zh_CN', {
        attributes: this.attributes
      })
      this.$validator.extend('e_name', {
        getMessage (field) {
          return field + '字段不能为这个值(保留字/重复的标识)!'
        },
        validate: (value) => {

          let no = [
            '0',
            'list',
            'api',
            'lists',
            'group'
          ]
          no = lodash.concat(no, this.lists.biaoshi)
          if (lodash.indexOf(no, value) > -1) {
            return false
          }
          return true
        }
      })
    }
  }
</script>

<style>

</style>
