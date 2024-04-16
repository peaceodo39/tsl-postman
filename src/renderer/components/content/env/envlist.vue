<template>
  <div>
    <form action="">
      <table border="1" style="    width: 100%;">
        <tr>
          <th>
            变量名字
          </th>
          <th>
            变量默认值
          </th>
          <th>
            提示信息
          </th>
        </tr>
        <tr v-for="(input,key) in from2">
          <th class="thinput">
            <Input type="text"
                   v-model="from2[key].name"
                   placeholder="变量名字" />
          </th>
          <th class="thinput">
            <Input type="text" v-model="from2[key].value" placeholder="变量值" />
          </th>
          <th class="thinput">
            <Input type="text" v-model="from2[key].description" placeholder="提示信息" />
          </th>
        </tr>
        <tr>
          <th colspan="3">
            <div @click="add_one">
              增加一个
            </div>
          </th>
        </tr>
      </table>
    </form>
    <Button  @click="save" type="warning" >保存</Button>
    <Button  @click="mergedefault" type="error" >合并默认</Button>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  name: "envlist",
  data(){
    return {
      from2:[]
    }
  },
  props: [
    //数据传参
    'value',
    'defaultValue'
  ],
  watch:{
    value: {
      handler:function() {
       this.init();
      },
      deep:true
    }
  },
  methods: {
    init(){
      this.from2 = lodash.cloneDeep(this.value);
    },
    add_one() {
      this.from2.push({
        name: '',
        value: '',
        description: ''
      })
    },
    save(){
      this.$emit('input',this.from2);
      this.$emit('save',this.from2);
    },
    mergedefault(){
      console.log("合并默认");
      let de = lodash.cloneDeep(this.defaultValue);
      this.from2 = lodash.merge(de,this.from2)
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>
.thinput{
  padding: 5px;
}
</style>