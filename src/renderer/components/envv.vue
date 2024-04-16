<template>
    <div >
      <Select  @on-change="select_change"
               v-model="selectmodel"
               size="small" style="width:100px">
        <Option v-for="(item,index) in env_list" :value="index"
                :key="index">{{ index}}</Option>
      </Select>
      <Button type="primary" shape="circle" icon="md-settings"
              @click="editenv"></Button>
    </div>
</template>

<script>

  import envv from '../logic/envv'

  export default {
    name: 'envv',
    data () {
      return {
        envv:null,
        env_list: {},
        fuzhi:false,
        selectmodel:'default',
      }
    },
    components: {},
    methods: {
      select_change(now){
        console.log("改变当前选中的环境变量");
        this.$store.commit('set_envselect', now)
        this.$emit('change',[])
        this.init();
      },
      init(){
        this.envv = new envv();
        console.log(this.envv);
        this.envv.read((data)=>{
          this.env_list = data;
          this.selectmodel= this.$store.state.envselect;
        });
      },
      editenv(){
        console.log('修改环境变量')
        this.init();
        this.$router.push('/open/editenv')
      }
    },
    created () {
      this.init();
    }
  }
</script>

<style>

</style>
