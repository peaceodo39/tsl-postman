<template>
  <div>
    <Form label-position="right" :label-width="100">
      <FormItem v-for="input in list2" :label="input.name" >
        <Row>
          <Col span="6">
            <Input @on-change="input_data" v-model="formRight[input.name]"></Input>
          </Col>
          <Col span="6">
            <span>
               &nbsp; &nbsp;{{ input.description }}
            </span>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "form_list",
  data(){
    return {
      list2:[],
      formRight:{

      }
    };
  },
  props:[
      'list',
      'form',
      'index2'
  ],
  methods:{
    init(){

      this.formRight={};
      this.list2 =JSON.parse(JSON.stringify(this.list));
      for(let a of this.list2){

        this.formRight[a.name] = a.value;
      }
      this.input_data();
    },
    input_data(){
      console.log("值发生改变",this.formRight);
      this.$emit('save',this.index2,this.formRight);
    }
  },
  watch:{
    list(){
      this.init();
    },
    form: {
      handler (newval) {
        console.log('value',newval);
        this.formRight = newval;
      },
      deep: true
    }

  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>