<template>
  <div>
    <br><br><br>
    <form name="jijk">
      <div>
        项目名字：
        <Input v-model="form.name"
               v-validate="validation.name"
               placeholder="Enter name" style="width: auto"/>

      </div>
      <br>

      <br>
      <div>
        项目标示：

        <Input v-model="form.e_name"
               v-validate="validation.e_name"
               placeholder="项目标识符,不应于其他项目重复"/>
      </div>
      <Button type="success" @click="success">保存</Button>
      <Button type="success">
        <router-link to="/open">项目首页</router-link>
      </Button>

      <debugview>{{ index }}--</debugview>

    </form>
  </div>
</template>

<script>
import tool from "../libs/tool";
// import  lodash from 'lodash';
import debugview from "./common/debugview";
import object from "../logic/object";

export default {
  name: 'create',
  data() {
    return {
      form: {
        name: '项目名字',
        e_name: tool.uniqid()
      },
      validation: {
        name: {
          required: true,
          min: 2,
          max: 30
        },
        e_name: {
          required: true,
          alpha_dash: true,
          min: 3,
          max: 50
        }
      },
      attributes: {
        name: "名字",
        e_name: "标示"
      }
    }
  },
  props: ['index'],
  components: {debugview},
  methods: {
    success() {
      console.log(this.index, this.form);

      this.$validator.validate().then((result) => {

        if (result) {
          let objetc = new object(this.index);
          objetc.save('index', this.form, () => {
            //console.log('文件已保存');
            this.$Message.warning('保存成功!')
            this.$router.go(-1)
          })
        } else {
          this.$Message.warning(this.$validator.errors.all().toString());
        }
      })


    },
    read() {
      let objetc = new object(this.index);
      objetc.read('index', {}, (data) => {
        this.form = data
      });
    },
  },
  created() {
    console.log('this.attributes',this.attributes);
    this.$validator.localize('zh_CN', {
      attributes: this.attributes
    })
  },
  mounted() {
    console.log('当前项目目录:', this.index)
    this.read()

  }
}
</script>

<style>

</style>
