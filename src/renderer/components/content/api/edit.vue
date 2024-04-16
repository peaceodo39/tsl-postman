<template>
    <div>
        <h3>
            编辑 {{dir}}{{e_name}} {{form}}
        </h3>

        <br>
        <br>
        <div>
            名字：
            <Input name="name" placeholder="请输入分组名字" style="width: 300px"
                   v-model="form.name" v-validate="validation.name"/>
            <span>{{ errors.first('name') }}</span>
        </div>
        <br>

        <div>
            标识：
            <Input :disabled="true" placeholder="请输API标识(不可修改)" style="width: 300px" v-model="form.e_name"/>
            <span>{{ errors.first('e_name') }}</span>
            <span style="color: red">
                请不要试图修改它,会出事情的!
            </span>
        </div>
        <br>

        <div>
            地址：
            <Input placeholder="请输入API地址" style="width: 300px" v-model="form.url"/>
            <span>{{ errors.first('url') }}</span>
        </div>
        <br>

        <div>
            请求类型：
            <RadioGroup v-model="form.request_type">
                <Radio label="ws"></Radio>
                <Radio label="get"></Radio>
                <Radio label="post"></Radio>
                <Radio label="put"></Radio>
                <Radio label="patch"></Radio>
                <Radio label="delete"></Radio>
                <Radio label="view"></Radio>
                <Radio label="image"></Radio>
            </RadioGroup>
        </div>
        <br>

        <Button @click="save" type="primary">保存</Button>
        <Button @click="go_api" type="primary">返回API页面</Button>
    </div>
</template>

<script>

  import {Validator} from 'vee-validate'
  import lists from '@/logic/lists'
  import e_name from '@/validation/e_name'

  Validator.localize('zh_CN', {
    attributes: {
      name: '名字',   //设置表单属性对应的中文名
      e_name: '标识',
      type: '类型',
      url: '地址'
    }
  })
  Validator.extend('e_name', e_name)
  export default {
    name: 'kong',
    data () {
      return {
        listo: {},
        listdata: {},
        form: {
          request_type: 'post',
          name: '默认名字',
          e_name: 'biaoshi',
          dir: '.',
          url: '/'
        },
        validation: {
          name: {
            required: true,
            min: 2,
            max: 20
          },
          e_name: {
            required: true,
            alpha_num: true,
            min: 5,
            max: 20,
            e_name: true
          },
          type: {
            required: true
          },

        }
      }
    },
    props: [
      'dir',
      'e_name'
    ],
    components: {},
    methods: {
      go_api () {
        this.$router.go(-1);
      },
      save () {
        // 先进行验证
        this.$validator.validate().then((result) => {
          console.log(result)
          if (result) {
            // 验证通过
            this.save_file()
          }
        })
      },
      save_file () {
        console.log('save_file')
        this.listo.savefile(this.listdata, () => {
          console.log('保存成功')
          this.$Modal.confirm({
            title: 'Title',
            content: '<p>保存成功,是否跳转到首页?</p>',
            onOk: () => {
              this.$router.push('/open')

            },
            onCancel: () => {

            }
          })
        })
      },
      init () {
        this.listo = new lists(this.dir)
        this.listo.read((data) => {
          console.log('data', data)
          this.listdata = data
          this.form = this.listdata.api[this.e_name]
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style>

</style>
