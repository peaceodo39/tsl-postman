<template>
  <div>

    <h1>
      关于我们
    </h1>


    <RadioGroup v-model="status" type="button">
      <Radio label="env">环境变量信息</Radio>
      <Radio label="version">版本信息</Radio>
      <Radio label="team">开发团队信息</Radio>
      <Radio label="gitee">Gitee 仓库信息</Radio>
      <Radio label="other">其他信息</Radio>

    </RadioGroup>
    <div v-if="status ==='env'">
      <pre>{{ env }}</pre>
    </div>

    <div v-if="status==='version'">
      <pre>{{ version | jsonFormat }}</pre>
    </div>

    <div v-if="status==='team'">
      <pre>{{ team | jsonFormat }}</pre>
    </div>
    <div v-if="status==='gitee'">
      <img src="https://gitee.com/tsl-postman/tsl-postman/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b"
           alt="">
    </div>

    <div v-if="status==='other'">
      <pre>{{ other | jsonFormat }}</pre>
    </div>

  </div>
</template>

<script>

import jsonFormat from 'json-format'
import config from "../../config";
import {remote} from 'electron'

export default {
  name: "about",
  data() {
    return {
      status: 'env',
      env: jsonFormat(process.env),
      version: {
        electron: config.version_dependencies.electron,
        vue: config.version_dependencies.vue,
        vuex: config.version_dependencies.vuex,
        iview: config.version_dependencies.iview,
        vue_electron: config.version_dependencies.vue_electron,
        vuex_electron: config.version_dependencies.vuex_electron,
      },
      other: {
        userDataPath: remote.app.getPath('userData')
      },
      team: [
        {
          "name": "tsl-postman 项目组"
        }
      ]
    };
  }
}
</script>

<style scoped>

</style>