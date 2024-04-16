<template>
    <div>
        <h3>
            增加API
        </h3>

        <br>
        <br>
        <div>
            名字：
            <Input name="name" placeholder="请输入分组名字" style="width: 300px"
                   v-model="form.name"  v-validate="validation.name"/>
            <span>{{ errors.first('name') }}</span>
        </div>
        <br>

        <div>
            标识：
            <Input placeholder="请输API标识(不可修改)" style="width: 300px"
                   v-model="form.e_name" v-validate="validation.ename" />
            <span>{{ errors.first('e_name') }}</span>
        </div>
        <br>

        <div>
            地址：
            <Input placeholder="请输入API地址" style="width: 300px"
                   v-model="form.url"
                   v-validate="validation.url"/>
            <span>{{ errors.first('url') }}</span>
            <span> 不包含域名 </span>
        </div>
        <br>

        <div>
            请求类型/展示方式：
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

        <div>
            请求类型/展示方式：
            <RadioGroup v-model="form.data_type">
                <Radio label="json"></Radio>
                <Radio label="xml"></Radio>
                <Radio label="string"></Radio>
            </RadioGroup>
        </div>

        <div>
            文件夹：
            <span style="font-size: 15px;font-weight: 900;">{{form.dir}}</span>
        </div>


        <br>
        <Button @click="save" type="primary">保存</Button>

    </div>
</template>

<script>

  import lists from '@/logic/lists'
  import lodash from 'lodash'
  import tool from "../../libs/tool";

  export default {
    name: 'kong',
    data () {
      return {
        listo: {},
        lists: {},
        form: {
          request_type: 'post',
          data_type: 'json',
          name: '默认名字',
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
            alpha_dash: true,
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
        this.form.uniqid = tool.uniqid()
        this.listo.add_api(this.form, (apiinfo) => {
          console.log('apiinfo',apiinfo);
          this.refresh_list();
          this.$Message.success("保存成功");
          this.$router.push({name: 'api', params: {apiid: apiinfo.uniqid}})
          setTimeout(()=>{
            this.position_api();
          },1000)
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