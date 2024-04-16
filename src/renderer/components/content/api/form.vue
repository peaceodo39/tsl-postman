<template>
    <div>
      <form action="">
        <table border="1" style="    width: 100%;">
          <tr>
            <th>表单name</th>
            <th>表单value</th>
            <th>表单类型</th>
            <th>注释</th>
            <th>选项</th>
          </tr>
          <tr v-for="(input,key) in form">
            <th style="width:90px">
              <Input placeholder="名字" style="width: 80px"
                     type="text"
                     v-model="input.name"></Input>
            </th>
            <th>

              <Input v-if="input.type != 'json'"
                     style="width: 95%" placeholder="默认值"
                     type="text" v-model="input.value"></Input>
              <div v-if="input.type == 'json'">
                {{ input.value }}

              </div>

            </th>
            <th>
              <div style="min-width: 150px;max-width:300px">
                <RadioGroup @on-change="type_change(input)" v-model="input.type">
                  <Radio label="text"></Radio>
                  <Radio label="number"></Radio>
                  <Radio label="swich"></Radio>
                  <Radio label="textarea"></Radio>
                  <Radio label="radio"></Radio>
                  <Radio label="select"></Radio>
                  <Radio label="checkbox"></Radio>
                  <Radio label="date"></Radio>
                  <Radio label="time"></Radio>
<!--                  // swich-->
                  <Radio label="file_pro"></Radio>
                  <Radio label="json"></Radio>
                </RadioGroup>
              </div>
            </th>
            <th>
              <Input placeholder="描述信息" type="text" v-model="input.description"></Input>
            </th>
            <th>
              <div v-if="input.optional1">
                选项
                <div>
                  <div v-for="(val40,key40) in input.optional">

                    <span>{{ key40 }}</span>:{{ val40 }}
                  </div>

                  <input placeholder="默认值" type="text" v-model="option.name">
                  <input placeholder="默认值" type="text" v-model="option.value">
                  <input @click="option_clean(input)" type="button" value="清空">
                  <input @click="add_option(input)" type="button" value="增加/修改">
                </div>
                <span>
                     {{ tip[input.type] }}
                 </span>
              </div>


            </th>
          </tr>
          <tr>
            <th colspan="5">

              <div @click="add_one">
                增加一个
              </div>
            </th>
          </tr>

        </table>

      </form>
      <Button  @click="save" type="warning" >保存</Button>
    </div>
</template>

<script>
  import api from '@/logic/api'
  import JsonEditor from 'vue-json-ui-editor';
  export default {
    name: 'api_form',
    components: {

      JsonEditor
      },
    data () {
      return {
        option: {
          name: 1,
          value: 1
        },
        tip: {
          date: '日期,默认格式为:yyyy-MM-DD,     ' +
            '格式参考: https://www.iviewui.com/components/date-picker,能接受的参数:format',
          time: '时间,默认格式为:HH:mm:ss, <br/>' +
            '格式参考: https://www.iviewui.com/components/time-picker,能接受的参数:format',
          radio: '',
          checkbox: '',
          select: '',
          file_pro: '独立的文件上传,参考:https://www.iviewui.com/components/upload ' +
            '能接受: action,multiple,accept,max-size',
          json: '符合json规范的字符串,会自动转换为json对象提交'
        },
        form: [

        ],
        form2: [],
        form3: {}
      }
    },
    props: [
      //数据传参
      'dd',
      'edit',
      'value'
    ],
    methods: {
      //方法列表
      //方法列表
      init () {
        this.apiobj = new api(this.dd)
        this.apiobj.read('form', [], (data) => {
          console.log('form1', data)
          this.form = data
          this.form2 = this.$lodash.cloneDeep(this.form)

        })
      },
      type_change (input) {
        let type = [
          'radio',
          'checkbox',
          'select',
          'date',
          'file_pro',
          'time'
        ]

        if (this.$lodash.indexOf(type, input.type) > -1) {
          console.log('119')
          input.optional1 = true
        } else {
          input.optional1 = false
        }
        if (input.type == 'date' || input.type == 'time') {
          this.option = {
            name: 'format',
            value: ''
          }
        }
        if (input.type == 'file_pro') {
          this.option = {
            name: 'accept',
            value: ''
          }
        }

      },
      save () {
        console.log('save4form')
        let newdata = []
        for (let val of this.form) {
          if (val.name != '') {
            if (val.type == 'checkbox') {
              if (typeof val.value == 'string') {
                val.value = val.value.split(',')
              }
            }
            newdata.push(val)
          }
        }
        this.form = newdata
        this.form2 = this.$lodash.cloneDeep(this.form)
        this.apiobj.save('form', this.form, () => {
          console.log('保存成功')
        })
      },
      add_one () {
        this.form.push({
          name: '',
          type: 'text',
          optional: {},
          value: '',
          description: ''
        })
      },
      add_option (input) {

        input.optional[this.option.name] = this.option.value
        console.log('add_option', input.optional)

      },
      option_clean (input) {
        input.optional = {}
      },
      empty (value) {
        console.log('empty', value)
        return !this.$lodash.isEmpty(value)
      }
    },
    watch: {
      //监听列表
      edit (new1) {
        if (new1 === false) {
          this.save()
        }
      },
      dd () {
        this.init()
      },
      form2: {
        handler:function(now2) {
          console.log('from2', now2)
          let va = {}
          for (let vv of now2) {
            va[vv.name] = vv.value
          }
          //this.value = va
          this.$emit('input', now2);
          this.$emit('save', now2);
        },
        deep: true
      }

    },
    created () {
      //创建完成后
      this.init()
    },
    filters: {}
  }
</script>

<style>

</style>
