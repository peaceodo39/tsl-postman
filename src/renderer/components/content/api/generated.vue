<template>
    <div>

        <div v-if="edit">
            编辑
            <form action="">
                <table class="generated_table" border="1" style="    width: 100%;">
                    <tr>
                      <th>
                        位置
                      </th>
                      <th>
                        unit生成器
                      </th>
                      <th>
                        规则
                      </th>
                    </tr>
                    <tr v-for="(input,key) in form" v-bind:key='key'>
                        <th>

                            <Select style="width:200px"
                                    v-model="form[key].name">
                                <Option :key="key18"
                                        :value="key18"
                                        v-for="(item,key18) in send">{{ key18 }}
                                </Option>
                            </Select>
                            <br>
                            <Select  style="width:200px"
                                    v-model="form[key].name2">
                                <Option :key="item.name"
                                        :value="item.name"
                                        v-for="(item,key2) in send[form[key].name]" 
                                        >
                                        {{ item.name }}
                                </Option>
                            </Select>


                        </th>
                        <th>
                            <Select  style="width:100px"
                                    v-model="form[key].unit">
                                <Option :key="key3"
                                        :value="key3"
                                        v-for="(item,key3) in format">{{ key3 }}
                                </Option>
                            </Select>
                        </th>
                        <th>
                            <div>
                                <Input :rows="4"
                                       placeholder="format格式,JSON格式化字符串,数组将作为多参数传递"
                                       type="textarea"
                                       v-model="form[key].format2"></Input>
                                <br> <br>
                                <div style="line-height: 12px;white-space: pre;"
                                     v-html="format[form[key].unit]"></div>
                            </div>

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
        </div>

        <div v-if="!edit">
            <div v-for="(input,kk) in value" v-bind:key="kk">
                {{ input.name }} :{{input.name2}}
                <span>
                    {{ input.unit }} -> {{ input.format }}
                </span>

            </div>
        </div>
      <Button  @click="save" type="warning" >保存</Button>
    </div>
</template>

<script>
  import api from '@/logic/api'
  import formatdata from './formatdata'
  export default {
    name: 'generated',
    data () {
      return {
        form: [],
        ddata1: {},
        format: formatdata,
      }
    },
    props: [
      //数据传参
      'api',
      'group',
      'edit',
      'send',
      'value'
    ],
    methods: {
      //方法列表
      //方法列表
      init () {
        console.log('generated init')
        this.apiobj = new api(this.api)
        this.apiobj.read('generated', this.form, (data) => {
          console.log('generated', data)
          for(let d of data){
            d.format2 = JSON.stringify(d.format);
          }
        
          console.log(data);
          this.form = data
          this.init_data()

        })
      },
      init_data () {
        let send = this.$lodash.cloneDeep(this.value)
        let form2 = this.$lodash.cloneDeep(this.form)
        if (!this.$lodash.isEmpty(send)) {
          this.$lodash.forIn(form2, (d) => {
            if (!this.$lodash.isUndefined(send[d.name])) {
              d.value = send[d.name]
            }
          })
        }
        this.$emit('input', form2)
      },
      save () {

        let newdata = []
        for (let val of this.form) {
          console.log(val.format2);
          val.format=JSON.parse(val.format2);
          if (val.name != '') {
            newdata.push(val)
          }
        }
        this.form = newdata
        console.log('save4generated')
        this.$emit('input', this.$lodash.cloneDeep(this.form))
        this.apiobj.save('generated', newdata, () => {
          console.log('保存成功')
        })
      },
      add_one () {
        this.form.push({
          name: 'get',
          name2: '',
          unit: 'natural',
          format: null,
          format2:"null"
        })
      },
    },
    watch: {
      //监听列表
      edit (new1) {
        if (new1 === false) {
          this.save()
        }
      },
      api () {
        this.init()
      }
    },
    created () {
      //创建完成后
      this.init()
    },
  }
</script>

<style lang="less">
.generated_table{
    th{
      padding: 5px;

    }

}
</style>
