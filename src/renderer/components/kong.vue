<template>
    <div>
        这是一个kong的Vue组件
    </div>
</template>

<script>


  export default {
    name: 'kong',
    //混合
    mixins: [],
    delimiters: [
      //改变纯文本插入分隔符
    ],
    data () {
      return {}
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
      //数据传参
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
    },
    beforeCreate () {
      //初始化之前
    },
    created () {
      //创建完成后
    },
    beforeMount () {
      //挂载开始之前
    },
    mounted () {
      //挂载之后
    },
    beforeUpdate () {
      //更新开始之前
    },
    updated () {
      //更新之后
    },
    activated () {
      //组件 激活
    },
    deactivated () {
      //组件停用
    },
    beforeDestroy () {
      //销毁之前
    },
    destroyed () {
      //销毁之后
    },
    errorCaptured () {
      //子孙组件的错误
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
