<template>
  <div>
    内容展示
    <span>
      list_string: {{tab0}} {{nowselectenv}}
    </span>
  </div>
</template>

<script>


  export default {
    name: 'content_index',
    data(){
      return {
        tab0: true,
        tab1: true,
        tab2: true
      }
    },
    computed:{
      nowselectenv(){
        return this.$store.state.envselect;
      }
    },
    filters: {},

    components: {  },
    methods: {},
    mounted(){
      //组件激活
      this.refresh_list();
    
    }
  }
</script>

<style>

</style>
