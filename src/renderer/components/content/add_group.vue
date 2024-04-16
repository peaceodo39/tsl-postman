<template>
    <div>
        增加分组
        <form name="addgroup">
            <div>
                名字：
                <Input v-model="form.name" name="name" v-validate="validation.name"
                       placeholder="请输入分组名字" style="width: 300px"/>
                <span>{{ errors.first('name') }}</span>
            </div>
            <br>

            <div>
                标识：
                <Input name="ename" placeholder="请输入分组标识(不可修改)" style="width: 300px"
                       v-model="form.e_name" v-validate="validation.e_name"/>
                <span>{{ errors.first('ename') }}</span>
            </div>
            <br>

            <div>
                接口类型：
                <RadioGroup v-model="form.type" v-validate="validation.e_name">
                    <Radio label="http">Http请求</Radio>
                    <Radio label="ws">WebSocket请求</Radio>
                    <Radio label="test">流水测试(自动化测试)</Radio>
                </RadioGroup>
                <div style="color:red;font-size:1.5em">
                  文件夹类型直接影响下级接口的类型,选择流水测试类型下级将只能添加自动化测试流水线,而不能添加API接口
                </div>
            </div>

            <div>
                文件夹：
                <span style="font-size: 15px;font-weight: 900;">{{form.dir}}</span>
                <span>{{ errors.first('url') }}</span>
            </div>
            <br>
            <Button type="primary" @click="save">保存</Button>

        </form>
    </div>
</template>

<script>

  import lists from '@/logic/lists'
  import lodash from 'lodash'

  export default {
    name: 'add_group',
    data () {
      return {
        listo: {},
        lists: {},
        form: {
          name: '默认名字',
          e_name: 'fenzu',
          dir: this.dir,
          type:'http'
        },
        validation: {
          name: {
            required: true,
            min: 2,
            max: 20
          },
          ename: {
            required: true,
            alpha_num: true,
            min: 5,
            max: 20,
            e_name: true
          },
          type: {
            required: true
          }
        },
        attributes: {
          name: '名字1',   //设置表单属性对应的中文名
          ename: '标识',
        }
      }
    },
    props:[
      'dir'
    ],
    watch:{
      dir(ddd){
        this.form.dir=ddd;
        this.init();
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

        this.listo.add_group(this.form, () => {
          this.$Message.success("分组处理成功");
          this.$router.push('/open')
        })

      },
      init () {
        this.listo = new lists(this.form.dir)
        this.listo.read((data) => {
          this.lists = data
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
