<template>
  <div class="ClassifyItem">
    <!-- 重要部分 -->
    <div class="divbox important">
      <div class="imgbox imp-img">
        <img src="../assets/重要-未变色.png" alt="" />
      </div>
      <p>
        <!-- 要跳转到哪个界面就写哪个界面 这是需要有点击事件的情况 -->
        <router-link class="router" :to="{ name: 'Important' }"
          >重要事项</router-link
        >
      </p>
      <!-- <router-link to="/login">重要事项</router-link></p> -->
      <!-- <router-link to="/Important">Important</router-link> -->
    </div>
    <!-- 提醒部分 -->
    <div class="divbox remind">
      <div class="imgbox remind-img">
        <img src="../assets/日历.png" alt="" />
      </div>
      <p>
        <router-link class="router" :to="{ name: 'Remind' }"
          >提醒事项</router-link
        >
      </p>
    </div>
    <!-- 完成部分 -->
    <div class="divbox done">
      <div class="imgbox done-img">
        <img src="../assets/完成.png" alt="" />
      </div>
      <p>
        <router-link class="router" :to="{ name: 'Completed' }"
          >已完成事项</router-link
        >
      </p>
    </div>

    <!-- 添加部分 -->
    <div
      v-for="(classify, index) in classifies"
      :key="index"
      @touchstart.prevent="touchStart(index)"
      @touchend.prevent="cleartime(index)"
      class="divbox done"
    >
      <div class="imgbox done-img">
        <img src="../assets/classify.png" alt="" />
      </div>
      <p>
        <!-- /OtherClassify/{{classify.name}} -->
        <router-link
          class="router"
          :to="{
            name: 'OtherClassify',
            params: { ClassData: classify.name },
          }"
          >{{ classify.name }}</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexClassifyItem",
  data() {
    return {
      classifies: this.$store.state.classifies,
    };
  },
  methods: {
    //     // 长按删除分类列表
    touchStart(index) {
      // let that = this
      //   console.log(index);
      //   clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      //   this.Loop = setTimeout(
      //     function () {
      //         // let  this = function's this
      //       if(confirm('是否删除?')) {
      //           alert("删除成功")
      //           that.classifies.splice(index, 1);
      //             that.$store.commit('SaveDatas')

      //       }else{
      //           return
      //       }
      //     },
      //     1000
      //   );
      //   console.log()
      // this.$store.state.classifies = this
      //

      new Promise((resolve, reject) => {
        clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器    
        this.Loop = setTimeout(() => {
          // let  this = function's this
          if (confirm("是否删除?")) {
            alert("删除成功");
            resolve();
            this.classifies.splice(index, 1);
          } else {
            reject();
          }
        }, 1000);
      }).then(() => {
        console.log("finish setTimeout");
        this.$store.commit("SaveDatas");
      }).catch(() => {
          console.log("cancel")
      })
    },
    cleartime() {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    },
  },
};
</script>

<style scoped>

/* 整个classify的div布局 */
.ClassifyItem {
  margin: auto;
  margin-top: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.068);
  border-radius: 5px;
  /* padding-bottom: 6px; */
}
/* 每一个分类部分的布局 */
.divbox {
  float: left;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  /* background-color: violet; */
  text-align: left;
}
/* 每一个图片盒子的布局 */
.imgbox {
  float: left;
  margin-top: 7px;
  margin-left: 8px;
  text-align: center;
  width: 24px;
  height: 24px;
  /* background-color: tomato; */
}
img {
  width: 15px;
  height: 15px;
}
p {
  /* float: left; */
  margin-left: 44px;
  margin-top: 6px;
}
/* 设置router（a）标签 */
.router {
  text-decoration: none;
  color: black;
}
</style>