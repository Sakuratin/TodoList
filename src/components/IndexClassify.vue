<template>
  <div class="">
    <!-- 搜索框样式 -->
    <div class="searchbox" v-if="ShowSearchbox">
      <input
        type="text"
        placeholder="请输入要查找的关键字！"
        class="searchinp"
        v-model="searchtxt"
        @keyup.enter="searchData"
      />
    </div>

    <!-- 添加一个分类列表的样式 -->
    <div class="divbox important" v-if="ShowAddClassify">
      <div class="imgbox imp-img">
        <img src="../assets/classify.png" alt="" />
      </div>
      <p>
        <input type="text" v-model="ClassData" @keyup.enter="SaveData" />
        <!-- 要跳转到哪个界面就写哪个界面 这是需要有点击事件的情况 -->
        <!-- <router-link class="router" :to="{name: 'OtherClassify', params: {ClassData: 1}}"></router-link> -->
      </p>
    </div>

    <!-- 搜索出来的结果列表 -->
    <div class="resultbox" v-if="ShowSearchbox">
      <ul class="Item-list">
        <li class="list-lis" v-for="todo in resultTodos" :key="todo.id">
          <!-- :checked="todo.done"表示读取done的状态，并切换相应的checked状态 -->
          <!-- @change="handleDone(todo.id)"需要改变done值的状态进行双向绑定，需要传入对应的点击的todo.id -->
          <!-- :checked="todo.done"和@change="handleDone(todo.id)"都可以用v-model='todo.done'代替，但是不推荐这样做，因为会改变props -->
          <input
            type="checkbox"
            name=""
            class="lis-check"
            :checked="todo.done"
            @change="ChangeDone(todo.id)"
          />
          <!-- <p class="lis-txt">1234567</p> -->
          <!-- <input type="text" class="lis-txt" placeholder="请输入一个计划" autofocus v-if="Showinput"> -->
          <!-- v-model双向绑定读取todos的数据 -->
          <input
            type="text"
            class="lis-txt"
            v-model="todo.title"
          />
          <!-- 设置点击事件并传入相应的id -->
          <img
            src="@/assets/重要-未变色.png"
            alt=""
            v-if="!todo.important"
            class="important"
            @click="SetImportant(todo.id)"
          />
          <img
            src="@/assets/重要-变色.png"
            v-else
            class="important"
            @click="unSetImportant(todo.id)"
          />
          <!-- <img src="@/assets/delete.png" class="delete" /> -->
        </li>
      </ul>
      <!-- 阻止冒泡事件：如果盒子没有被移动（就是说如果垃圾桶没有出现，则不显示垃圾桶，就不会有点击事件）就阻止了冒泡 -->
    </div>

    <IndexClassifyItem v-if="!ShowSearchbox" :upDateclassifies='upDateclassifies'/>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import IndexClassifyItem from "./IndexClassifyItem.vue";
export default {
  name: "IndexClassify",
  components: { IndexClassifyItem },
  props: ["ShowAddClassify", "ShowSearchbox"],
  data() {
    return {
      ClassData: "",
      searchtxt: "",
      resultTodos: [],
      classifies:this.$store.state.classifies
    };
  },
  methods: {
    SaveData() {
      if (this.ClassData != "") {
        this.$store.state.classifies.push({
          id: nanoid(),
          name: this.ClassData,
        });
        this.ClassData = ""
      }
      // 调用改变参数的对应方法 调用存储数据的方法
      this.$emit("ChangeShowAddClassify");
      this.$store.commit("SaveDatas");
    },
    // 查找数据
    searchData() {
      // console.log(this.$store.getters.getSearchTodo(this.searchtxt))
    //   this.resultTodos.push(
    //     ...this.$store.getters.getSearchTodo(this.searchtxt)
    //   );
        this.resultTodos = this.$store.getters.getSearchTodo(this.searchtxt)
        this.searchtxt = ''
    },

    // 点击事件--设置为重要，同时传入value参数，并将对应要接收的参数一并写入，用commit提交，引入ChangeImportantState函数，改变参数
    SetImportant(value) {
      this.$store.commit("ChangeImportantState", value);
      this.$store.commit("SaveDatas");
    },
    unSetImportant(value) {
      this.$store.commit("ChangeImportantState", value);
      this.$store.commit("SaveDatas");
    },
    // 传入相应的点击的todo id值
    ChangeDone(id) {
      this.$store.commit("ChangeDoneState", id);
      this.$store.commit("SaveDatas");
    },

    upDateclassifies() {
      this.classifies = this.$store.state.classifies
    }
  },
  // watch: {
  //     searchtxt: {
  //         immediate = true

  //     }
  // }
};
</script>

<style scoped>
/* 搜索框样式 */
.searchbox {
  width: 100%;
  height: 40px;
  /* background-color: red; */
}
.searchinp {
  border-style: none;
  outline: none;
  border-bottom: 1px solid #999;
  width: 86%;
  height: 30px;
  display: block;
  margin: auto;
  margin-top: 12px;
  padding-left: 8px;
}
input {
  /* border: none; */
  border-style: none;
  outline: none;
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



.remove {
  display: inline-block;
  position: absolute;
  top: 4px;
  right: 6px;
  width: 44px;
  height: 44px;
  /* display: none; */
}
.remove > img {
  width: 40px;
  height: 40px;
  margin: auto;
  z-index: -1;
}
.swiper-test {
  position: relative;
  transition: padding-right 0.5s;
}
.Item-list {
  width: 100%;
  padding: 4px 0 4px 0;
  /* text-align: center; */
}
.list-lis {
  /* width: 600px; */
  /* border: 1px solid black; */
  width: 94%;
  height: 40px;
  border-radius: 3px;
  margin-bottom: 10px;
  background-color: white;
  margin: auto;
  /* line-height: 26px; */
  border-left: 6px solid rgba(0, 128, 0, 0.529);
  box-shadow: 3px 3px 14px -1px rgb(17 18 17 / 29%);
}
li {
  list-style: none;
  position: relative;
  line-height: 45px;
}
.lis-check {
  margin-left: 10px;
  width: 18px;
  height: 18px;
  /* display: inline-block; */
  border-radius: 6px;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  background-color: rgba(0, 0, 0, 0.118);
}
input:checked::before {
  /* line-height: 26px; */
  -webkit-appearance: none;
  border-radius: 6px;
  content: "√";
  display: block;
  text-align: center;
  font-size: 16px;
  color: white;
  font-weight: 1000;
  width: 18px;
  height: 18px;
  background-color: rgb(66, 66, 233);
}
/* input[type=checkbox]::after {
    background-color: green;
} */
.lis-txt {
  font-size: 16px;
  margin-left: 20px;
  display: inline-block;
  position: absolute;
  /* top: -2px; */
  top: 12px;
  width: 75%;
  /* 已完成 */
  /* color: #999;
    text-decoration: line-through;
    font-style: oblique */
  /* border: none;
     */
  border-style: none;
  outline: none;
}
img {
  display: inline-block;
  /* text-decoration: none; */
  position: absolute;
  width: 16px;
  height: 16px;
  /* border-radius: 10px; */
  /* background-color: rgba(0, 0, 0, 0.118); */
}
/* .delete {
  right: 0px;
  top: 4px;
  width: 32px;
  height: 32px;
  display: none;
} */
.important {
  right: 14px;
  top: 11px;
}
</style>