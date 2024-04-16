<template>
  <div>
    即将在{{countdown}} 秒后执行 {{content}}
  </div>
</template>

<script>
export default {
  name: "Countdown",
  data() {
    return {
      countdown: 0,
      index:null
    };
  },
  props: [
    "count", 'content'
  ],
  methods:{
    sub(){

      if(this.countdown > 0){
        this.countdown--;
        setTimeout(()=>{
          this.sub();
        },1000);
      }else{
        this.$emit('ok',[]);
      }
    }
  },
  created() {
    this.countdown = this.count;
    setTimeout(()=>{
      this.sub();
    },1000);
  },
  destroyed() {

  }
}
</script>

<style scoped>

</style>