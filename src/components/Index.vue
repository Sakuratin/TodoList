<template>
<!-- 这个界面主主页界面，所有写好的组件部分都按照顺序引入进来使用 -->
    <div>
        <IndexHeader/>
        <IndexClassify
        :ShowAddClassify="ShowAddClassify"
         @ChangeShowAddClassify='ChangeShowAddClassify'
         :ShowSearchbox='ShowSearchbox'
         />
        <hr>
        <IndexList
         :SendShowAddInput="SendShowAddInput"
          @ChangeShowAddInput='ChangeShowAddInput'
          @SetImportant='SetImportant' 
          @unSetImportant='unSetImportant'
          :ShowSearchbox='ShowSearchbox'
          />
        <IndexFooter
         @ChangeShowAddInput='ChangeShowAddInput'
         @ChangeShowAddClassify='ChangeShowAddClassify'
         @ChangeShowSearchbox='ChangeShowSearchbox'
         />
    </div>
</template>

<script>
import IndexHeader from './IndexHeader.vue'
import IndexClassify from './IndexClassify.vue'
import IndexList from './IndexList.vue'
import IndexFooter from './IndexFooter.vue'

export default {
  // name不要写错了，路由和其它组件需要认定
  name: 'Index',
  // 凡是引用了都要在这里用components接收
  components: {
    IndexHeader,
    IndexClassify,
    IndexList,
    IndexFooter
  },
  data() {
    return {
      // 写一个SendShowAddInput变量，将变量引出到indexlist中去，主要用于点击事件将数据的显示隐藏
      SendShowAddInput:false,
      ShowAddClassify:false,
      ShowSearchbox:false
    }
  },
  methods: {
    // 改变SendShowAddInput的状态，切换数据的显示与隐藏
    ChangeShowAddInput() {
      console.log('@@@@');
      this.SendShowAddInput = !this.SendShowAddInput
    },
    ChangeShowAddClassify() {
      this.ShowAddClassify = !this.ShowAddClassify
    },
    ChangeShowSearchbox() {
      this.ShowSearchbox = !this.ShowSearchbox
    },
    // 设置重要属性
    SetImportant(value) {
      this.$store.commit('ChangeImportantState',value,true)
    },
    // 取消重要属性
    unSetImportant(value) {
      this.$store.commit('ChangeImportantState',value,false)
    },
    
  }
}
</script>

<style>
body {
  background-color: #f9fdff;
  padding: 8px;
}
*{
    margin: 0;
    padding: 0;
}

</style>
