<template>
    <div>
        <h3>
            增加TEST(自动化测试,流水测试)
        </h3>

        <br>
        <br>
        <div>
            名字：
            <Input name="name" placeholder="请输入分组1名字" style="width: 300px"
                   v-model="form.name"  v-validate="validation.name"/>
            <span>{{ errors.first('name') }}</span>
        </div>
        <br>

        <div>
            标识：
            <Input placeholder="请输API标识(不可修改)" style="width: 300px"
                   v-model="form.e_name" v-validate="validation.ename"/>

            <span>{{ errors.first('e_name') }}</span>
        </div>
        <br>
        <div>
                接口类型：
                <RadioGroup v-model="form.type" v-validate="validation.e_name">
                    <Radio label="http">Http请求</Radio>
                    <Radio label="ws">WebSocket请求</Radio>
                </RadioGroup>
                <div style="color:red;font-size:1.5em">
                  接口的类型是单选,一个流水线只能添加一种类型的接口,如果添加了不同类型的接口会出错的!
                </div>
            </div>
        <br>
        <Button @click="save" type="primary">保存</Button>

    </div>
</template>

<script>

  import lists from '@/logic/lists'
  import lodash from 'lodash'

  export default {
    name: 'kong',
    data () {
      return {
        listo: {},
        lists: {},
        form: {
          name: '默认1名字',
          e_name: 'api',
          dir: this.dir,
          url: '/'
        },
        validation: {
          name: {
            required: true,
            min: 2,
            max: 30
          },
          ename: {
            required: true,
            alpha_num: true,
            min: 3,
            max: 50,
            e_name: true
          },
          type: {
            required: true
          },

        },
        attributes: {
          name: '名字1',   //设置表单属性对应的中文名
          ename: '标识',
          type: '类型',
          url: '地址'
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
          console.log(result)
          if (result) {
            // 验证通过
            console.log('验证通过!')
            this.save_file()
          }else{
            this.$Message.warning(this.$validator.errors.all().toString());
          }
        })
      },
      save_file () {

        this.listo.add_api(this.form, () => {
          this.$Message.success("保存成功");
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
          return field + '字段不能为这个值(保留字)!'
        },
        validate: (value) => {
          let no = [
            'list',
            'api',
            'lists',
            'group'
          ]
          if (typeof this.lists.biaoshi == 'object') {
            no = lodash.concat(no, this.lists.biaoshi)
          }


          console.log('验证', no, value, lodash.indexOf(no, value))
          if (lodash.indexOf(no, value)>-1) {
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