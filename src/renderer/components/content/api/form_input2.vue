<template>
    <div>
      <Form label-position="right" :label-width="100">
        <FormItem v-for="(input,key) in list2" :label="input.name" >
          <Row>
            <Col span="12">
              <div>
                <div>
                  <Input v-if="input.type=='text'"
                         @on-change="input_data"
                         v-model="formRight[input.name]"/>
                </div>

                <div v-if="input.type=='textarea'">
                  <Input type="textarea"
                         @on-change="input_data"
                         :rows="6"
                         v-model="formRight[input.name]"/>
                </div>

                <div v-if="input.type == 'swich'">
                  <i-switch
                      true-value="1"
                      false-value="0"
                      @on-change="input_data"
                      v-model="formRight[input.name]"  />

                </div>


                <div v-if="input.type=='json'">
                  <Input type="textarea"
                         @on-change="input_data"
                         :rows="6"
                         v-model="formRight[input.name]"/>
                </div>

                <div v-if="input.type=='number'">
                  <Input  type="number"
                          @on-change="input_data"
                          v-model="formRight[input.name]"/>
                </div>

                <div v-if="input.type=='radio'">
                  <RadioGroup @on-change="input_data" v-model="formRight[input.name]">
                    <Radio :label="val87"
                           v-for="(opt87,val87) in  input.optional"
                           :key="val87">{{opt87}}</Radio>

                  </RadioGroup>

                </div>
                <div v-if="input.type=='select'">

                  <Select @on-change="input_data" style="width:200px" v-model="formRight[input.name]">
                    <Option :key="val87" :value="val87"
                            v-for="(opt87,val87) in  input.optional">{{opt87}}
                    </Option>
                  </Select>

                </div>
                <div v-if="input.type=='checkbox'">

                  <CheckboxGroup @on-change="input_data" v-model="formRight[input.name]">
                    <Checkbox :label="val87" v-for="(opt87,val87) in  input.optional" :key="val87">{{opt87}}</Checkbox>
                  </CheckboxGroup>

                </div>


                <div v-if="input.type=='date'">

                  <DatePicker @on-change="input_data" :format="input.optional|dateformat"
                              placeholder="Select date and time(Excluding seconds)"
                              style="width: 200px"
                              type="datetime"
                              v-model="formRight[input.name]"></DatePicker>


                </div>

                <div v-if="input.type=='time'">

                  <TimePicker @on-change="input_data" :format="input.optional|timeformat" :value="input.value" style="width: 112px"
                              type="time"
                              v-model="formRight[input.name]"></TimePicker>

                </div>
              </div>
            </Col>

            <Col span="8">
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
  import lodash from 'lodash'
  export default {
    name: 'form_input2',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
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
    },
    filters: {
      //过滤器
      dateformat (valuu) {
        if (lodash.isEmpty(valuu.format)) {
          return 'yyyy-MM-DD'
        }
        return valuu.format
      },
      timeformat (valuu) {
        if (lodash.isEmpty(valuu.format)) {
          return 'HH:mm:ss'
        }
        return valuu.format
      }
    }
  }
</script>

<style>

</style>
