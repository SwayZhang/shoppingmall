<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="topShow"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="topClick" v-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'


  import HomeSwiper from './childCopms/HomeSwiper'
  import RecommendView from './childCopms/RecommendView'
  import FeatureView from './childCopms/FeatureView'

  import {getHomeMultidata,getHomeGoods} from 'network/home';




  export default {
    name: "Home",
    components:{
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []},
        },
        currentType:'pop',
        isShow:false
      }
    },
    created(){
      this.getHomeMultidata()      //进行必要的抽离封装

      this.getHomeGoods('pop')      //首页多个数据的获取 赋值
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      this.$bus.$on('itemImageLoad',() => {
        this.$refs.scroll.refresh()
      })
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      /**
       *   事件监听
       */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }

      },
      topClick (){
        this.$refs.scroll.scrollTo(0,0)
      },
      topShow (position) {
        this.isShow = (-position.y) > 1000
      },
      loadMore (){
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络模块的请求
       */
      getHomeMultidata () {
        getHomeMultidata().then(res =>{            //网络数据的获取 赋值
          // console.log(res);
          this.banners=res.data.banner.list
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods (type) {
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res =>{
          this.goods[type].list.push(...res.data.list)   //结构赋值
          this.goods[type].page +=1     //每拿一次页码就得加一
          this.$refs.scroll.finishPullUp()  //结束上拉加载更多 下次继续还能拉到下一页
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    right:0;
    z-index: 9;
  }
  .tab-control{
    position:sticky;
    z-index: 9;
    top: 44px;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>