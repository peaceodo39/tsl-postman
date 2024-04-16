<template>
  <div>
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
      唯一标识符：
      <Input :disabled="true"  style="width: 300px" v-model="form.uniqid"/>
      <span style="color: red">
          如为空则保存后自动生成
      </span>
    </div>
    <br>
    <div>
      地址：
      <Input placeholder="请输入API地址" style="width: 300px" v-model="form.url"/>
      <span>{{ errors.first('url') }}</span>
      <Tooltip max-width="200"
               :content="tip.url">
         <Icon type="md-help" size="18" />
      </Tooltip>
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
    <div>
      请求类型/展示方式：
      <RadioGroup v-model="form.data_type">
        <Radio label="json"></Radio>
        <Radio label="xml"></Radio>
        <Radio label="string"></Radio>
      </RadioGroup>
    </div>
    <div v-if="!isPackaged">
      {{form}}
    </div>

    <Button @click="save" type="primary">保存</Button>
    <Button @click="go_api" type="primary">返回API页面</Button>
  </div>
</template>

<script>

import {Validator} from 'vee-validate'
import e_name from '@/validation/e_name'
import api_basic from "../../../logic/api_basic";

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
  name: 'basic',
  data () {
    return {
      listo: {},
      api_basic:{},
      listdata: {},
      dir:'',
      e_name:'',
      form: {
        request_type: 'post',
        name: '默认名字',
        e_name: 'biaoshi',
        dir: '.',
        url: '/'
      },
      tip:{
        url:'地址可以使用变量 \n格式: “/aa/{name}/{age}/a.html” 参数内容来自GET参数。'
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
    'dd'
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


      // eslint-disable-next-line no-unreachable
      this.api_basic.save(this.form, () => {
        console.log('保存成功')
        this.$emit('save',[]);
        this.$Message.info("保存成功!");
        this.refresh_list();

      })
    },
    init () {
      this.dir = this.dd.dir;
      this.e_name = this.dd.e_name;

      this.api_basic = new api_basic( this.dir,this.e_name)
      this.api_basic.read((data) => {
        console.log('data', data)
        this.form = data
      })
    }
  },
  watch:{
    dd(){
      this.init();
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>

</style>
