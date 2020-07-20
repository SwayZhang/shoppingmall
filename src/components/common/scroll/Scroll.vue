<template>
  <div class="wrapper">
    <div class="content">         <!-- 必要的两层因为better scroll插件 只解析内部第一层-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{             //通过父组件传入probeType的值来节省性能浪费
      probeType:{
        type:Number,
        default (){
          return 0
        }
      },
      pullUpLoad: {
        type:Boolean,
        default (){
          return false
        }
      }
    },
    data (){
      return{
        scroll:null
      }
    },
    mounted (){
      this.scroll = new BScroll('.content',{
        probeType:this.probeType,  //接收
        pullUpLoad:this.pullUpLoad,
        click:true
      })
      this.scroll.on('scroll', (position) =>{
        this.$emit('scroll',position)             //发送事件 到父组件处理
      })
      this.scroll.on('pullingUp', () =>{       //注意这里的事件是pullingUp不是pullUpLoad
        this.$emit("pullingUp")
      })
    },
    methods:{
      scrollTo (x,y,time=500){
        this.scroll.scrollTo(x,y,time)    //封装scrollTo方法 home直接访问
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>