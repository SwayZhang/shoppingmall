<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isTrue"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>  <!--<把颜色也拿出来封装-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      link:String,
      activeColor:{
        type:String,
        default:"red"
      }
    },
    data(){
      return{

      }
    },
    computed:{
      isTrue(){
        return this.$route.path.indexOf(this.link) !== -1;  //判断当前活跃路由是不是和父组件传进来的link相同
      },
      activeStyle(){
        return this.isTrue ? {color:this.activeColor} : {}  //封装颜色
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.link).catch(err => {})  //路由切换
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>