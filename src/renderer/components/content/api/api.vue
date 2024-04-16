<template>
    <div>
        <div>
            这是API信息:
            {{dd}}
        </div>
        <div>
            <div>
                <h3>
                    增加API
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
                    <Input placeholder="请输入分组标识(不可修改)" style="width: 300px" v-model="form.e_name"/>
                    <span>{{ errors.first('e_name') }}</span>
                </div>
                <br>

                <div>
                    请求类型：
                    <RadioGroup v-model="form.request_type">
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

            </div>
        </div>


    </div>
</template>

<script>
  import {Validator} from 'vee-validate'

  Validator.localize('zh_CN', {
    attributes: {
      name: '名字',   //设置表单属性对应的中文名
      e_name: '标识',
      type: '类型',

    }
  })
  export default {
    name: 'api',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {
        dd: this.$store.state.api_list[this.number],
        form: {
          request_type: 'post',
          name: '默认名字',
          e_name: 'biaoshi',
          dir: '.',
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
    //无状态组件
    functional: false,

    extends: {
      // 扩展
    },
    model: {
      //定制v-model,双向绑定
    },
    props: [
      'number'
    ],
    computed: {
      //计算属性
    },
    components: {
      //注册组件
    },
    methods: {
      //方法列表
      save () {

      }
    },

    created () {
      //创建完成后
    },

    directives: {
      //自定义指令
    },
    filters: {
      //过滤器
    }
  }
</script>

<style>

</style>
