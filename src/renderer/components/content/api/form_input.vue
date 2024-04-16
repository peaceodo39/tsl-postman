<template>
    <div>
      <Form label-position="right" :label-width="100">
        <FormItem v-for="(input,key) in value" :label="input.name" >
          <Row>
            <Col span="14">
              <div >
                <div >
                  <Input v-if="input.type=='text'"
                          v-model="input.value"/>
                </div>

                <div v-if="input.type=='textarea'">
                  <Input type="textarea" :rows="6"  v-model="input.value"/>
                </div>

                <div v-if="input.type=='swich'">

                  <i-switch
                          true-value="1"
                          false-value="0"
                          v-model="input.value" >
                  </i-switch>
                </div>

                <div v-if="input.type=='json'">
                  <Input type="textarea" :rows="6"  v-model="input.value"/>
                </div>

                <div v-if="input.type=='number'">
                  <Input  type="number" v-model="input.value"/>
                </div>

                <div v-if="input.type=='radio'">
                  <RadioGroup v-model="input.value">
                    <Radio :label="val87" v-for="(opt87,val87) in  input.optional" :key="val87">{{opt87}}</Radio>

                  </RadioGroup>

                </div>
                <div v-if="input.type=='select'">

                  <Select style="width:200px" v-model="input.value">
                    <Option :key="val87" :value="val87"
                            v-for="(opt87,val87) in  input.optional">{{opt87}}
                    </Option>
                  </Select>

                </div>
                <div v-if="input.type=='checkbox'">

                  <CheckboxGroup v-model="input.value">
                    <Checkbox :label="val87"
                              v-for="(opt87,val87) in  input.optional"
                              :key="val87">{{opt87}}</Checkbox>
                  </CheckboxGroup>

                </div>


                <div v-if="input.type=='date'">

                  <DatePicker :format="input.optional|dateformat"
                              placeholder="Select date and time(Excluding seconds)"
                              style="width: 200px"
                              type="datetime"
                              v-model="input.value"></DatePicker>


                </div>

                <div v-if="input.type=='time'">

                  <TimePicker :format="input.optional|timeformat" :value="input.value" style="width: 112px"
                              type="time"
                              v-model="input.value"></TimePicker>

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
    name: 'form_input',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {}
    },

    props: [
      'value'
    ],
    computed: {
      //计算属性
    },
    components: {
      
      //注册组件
    },
    methods: {
      //方法列表
    },
    watch: {
      //监听列表
      value (input) {
        this.$emit('input', input)
      }
    },
    directives: {
      //自定义指令
    },
    mounted () {
      //挂载之后
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
