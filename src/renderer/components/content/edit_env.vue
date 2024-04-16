<template>
  <div>
    修改环境变量

    <br/>
    <RadioGroup @on-change="change_select"
                v-model="now_select" type="button">
      <Radio v-for="(envs,index) in env_list"
             :key="index" :label="index">
      </Radio>
    </RadioGroup>
    <Input placeholder="请输入环境变量组的名字" v-model="addenvname" style="width: 200px">
      <Button slot="append" @click="addenvlist" icon="ios-add"></Button>
    </Input>
    <div style="font-size:18px ">
      <p>
        环境变量使用说明： 使用大括号包裹变量名，如： <span style="color: #134cbb">{access_token}</span>
      </p>
    </div>

    <div>

      <envlist v-model="form"
               :defaultValue="this.env_list['default']"
               @save="save_select">
      </envlist>
    </div>
  </div>
</template>

<script>

import envv from '../../logic/envv'
import envlist from "./env/envlist";
import lodash from 'lodash'

export default {
  name: 'edit_env',
  data() {
    return {
      listo: {},
      env_list: {},
      now_select: 'default',
      addenvname: '',
      form: [],
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
        type: '类型'
      }
    }
  },
  props: [
    'dir',
    'e_name'
  ],
  components: {envlist},
  methods: {
    /**
     * 增加一个环境变量组
     */
    addenvlist() {
      this.env_list[this.addenvname] = [];
      this.listo.save(this.env_list, () => {
        this.$Message.success("保存成功");
        this.$forceUpdate();
      });
    },
    /**
     * 当前选中改变
     * @param nowselect
     */
    change_select(now_select) {
      console.log('更改', now_select);
      this.form = this.env_list[now_select];
    },
    /**
     * 
     * @param fdata
     */
    save_select(fdata){
      let data = [];
      for (let aa of fdata){
        if(aa.name){
          data.push(aa);
        }
      }
      // this.env_list[this.now_select] = data;
      this.$set(this.env_list,this.now_select,data)

      this.listo.save(this.env_list, () => {
        this.$Message.success("保存成功");
        this.$forceUpdate();
      });
    },
    init() {
      console.log("init", this.dir, this.e_name);
      this.listo = new envv()
      this.listo.read((data) => {
        this.env_list = data
        this.change_select(this.now_select);
        console.log('106', this.env_list)
      })
    }
  },
  created() {
    this.init()
    this.$validator.localize('zh_CN', {
      attributes: this.attributes
    })
    this.$validator.extend('e_name', {
      getMessage(field) {
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
