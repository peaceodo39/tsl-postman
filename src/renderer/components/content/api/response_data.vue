<template>
  <div>
    <div v-if="data_type ==='json'">
      <i-switch v-model="switch1"></i-switch>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button @click="copy" size="small" type="primary">复制数据</Button>

      <tree-view :data="data" v-if="switch1" :options="{maxDepth: 5}"></tree-view>
      <pre v-if="!switch1" >{{ data|format_data(data_type) }}</pre>
    </div>
    <div v-if="data_type !=='json'">
      <pre>{{ data|format_data(data_type) }}</pre>
    </div>

  </div>

</template>

<script>
import jsonFormat from "json-format";
import {clipboard} from "electron";

export default {
  name: "response_data",
  data() {
    return {
      switch1: false
    }
  },
  props: [
    'data',
    'data_type',
    'request_type'
  ],
  methods:{
    copy(){
      clipboard.writeText(this.format_data2(this.data,this.data_type));
    },
    format_data2(value1,dt){
      let aa = '';

      if (dt == 'json') {
        aa = jsonFormat(value1, {
          type: 'space',
          size: 4
        })
      } else {
        aa = value1;
      }

      console.log(aa);
      return aa;
    }
  },
  filters: {
    format_data(value1, dt) {
      let aa = '';

      if (dt == 'json') {
        aa = jsonFormat(value1, {
          type: 'space',
          size: 4
        })
      } else {
        aa = value1;
      }

      console.log(aa);
      return aa;
    }
  }
}
</script>

<style scoped>

</style>
