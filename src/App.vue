<template>
  <div id="app">
    <!-- <h1>Header</h1> -->
    <!-- 路由渲染 -->
    <router-view></router-view>
    <!-- <h1>Fotter</h1> -->
  </div>
</template>

<script>
// import IndexHeader from './components/IndexHeader.vue'
// import IndexClassify from './components/IndexClassify.vue'
// import IndexList from './components/IndexList.vue'
// import IndexFooter from './components/IndexFooter.vue'

export default {
  name: 'App',
  components: {
    // IndexHeader,
    // IndexClassify,
    // IndexList,
    // IndexFooter
  },
  data() {
    return {
      
    }
  },
}
</script>

<style>
#app {
    overflow-y: scroll;
    white-space: nowrap;
}
body {
  background-color: #f9fdff;
  padding: 8px;
}
*{
    margin: 0;
    padding: 0;
}
</style>
