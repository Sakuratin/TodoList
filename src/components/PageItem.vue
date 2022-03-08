<template>
  <div
    class="Completed"
    :class="pageClass"
    :style="{ 'background-image': 'url(' + image_url + ')' }"
  >
    <!-- <img :src="cover" alt="" class="bgimg"> -->
    <!-- header -->
    <div class="com-back">
      <p class="back-txt" @click="back">&lt; 返回</p>
    </div>
    <!-- 对应的items值 -->
    <!-- slot便于将这部分分割开，后面引用时可以修改这部分的数据 -->
    <slot name="list">
      <div class="IndexItem">
            <ul class="Item-list">
              <li class="list-lis" v-for="(todo,index) in todos" :key="index"
              >
                <input
                  type="checkbox"
                  name=""
                  class="lis-check"
                  :checked="todo.done"
                  @change="ChangeDone(todo.id)"
                />
                {{todo.done}}
                <!-- <p class="lis-txt">1234567</p> -->
                <!-- <input type="text" class="lis-txt" placeholder="请输入一个计划" autofocus v-if="Showinput"> -->
                <input
                  type="text"
                  class="lis-txt"
                  placeholder="请输入一个计划"
                  v-model="todo.title"

                  @touchstart.prevent="touchStart(todo.id)"
                  @touchend.prevent="cleartime(todo.id)"
                />
                <!-- <img src="@/assets/重要-未变色.png" alt="" class="impimg"> -->
                <img
                  src="@/assets/重要-未变色.png"
                  alt=""
                  class="impimg"
                  v-if="!todo.important"
                  @click="SetImportant(todo.id)"
                />
                <img
                  src="@/assets/重要-变色.png"
                  class="impimg"
                  v-else
                  @click="unSetImportant(todo.id)"
                />
              </li>
            </ul>
      </div>
    </slot>
    <!-- footer添加节点 -->
    <slot name="footer">
      <div class="com-footer">
        <input
          type="text"
          class="Addtask"
          placeholder="新建一个任务"
          v-model="todoStr"
          @keyup.enter="AddTask"
        />
      </div>
    </slot>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "PageItem",
  // 接收父组件传入的数据
  props: ["image_url","todos", "pageClass", "typeset"],
  data() {
    return {
      todoStr: "",
      // todos: this.$store.state.todos
      // cover: require("@/assets/bg-Completed.jpg")
    };
  },
  methods: {
    AddTask() {
      // console.log(this.todoStr)
      if (this.todoStr != "") {
        if (this.$route.params.ClassData) {
          this.$store.commit("SaveDatasWithValue", {
            id: nanoid(),
            title: this.todoStr,
            done: false,
            important: false,
            remind: false,
            classifyname: this.$route.params.ClassData,
          });
          // this.todos.unshift({id:nanoid(),title:this.todoStr,done:false,important:false,remind:false, classifyname: this.$route.params.ClassData})
        } else {
          // this.$store.commit('SaveDatasWithValue',
          // {id:nanoid(),title:this.todoStr,...this.typeset})
          let data = {
            id: nanoid(),
            title: this.todoStr,
            done: false,
            important: false,
            remind: false,
          };
          data[this.$route.meta.prop] = true;
          this.$store.commit("SaveDatasWithValue", data);
          // console.log(this.$route.meta.prop)
          // switch(this.$route.name) {
          //     case 'Important': this.$store.commit('SaveDatasWithValue', {id:nanoid(),title: this.todoStr, important: true})
          // }
        }
      }
      this.todoStr = "";
      // this.todos = this.$store.getters
      // this.$store.getters.getImpor
      // this.$route.meta.getters
      // console.log(this.$store.getters[this.$route.meta.getters])
      this.todos = this.$store.getters[this.$route.meta.getters];
    },
    SetImportant(value) {
      this.$store.commit("ChangeImportantState", value);
      this.$store.commit("SaveDatas");
      this.todos = this.$store.getters[this.$route.meta.getters];
    },
    unSetImportant(value) {
      this.$store.commit("ChangeImportantState", value);
      this.$store.commit("SaveDatas");
      this.todos = this.$store.getters[this.$route.meta.getters];
    },
    ChangeDone(id) {
      this.$store.commit("ChangeDoneState", id);
      this.$store.commit("SaveDatas");
      this.todos = this.$store.getters[this.$route.meta.getters];
      console.log(this.todos)
    },
    // 返回上一级设置
    back() {
      this.$router.go(-1);
    },
        // 长按删除分类列表
    touchStart(id) {
      new Promise((resolve, reject) => {
        clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器    
        this.Loop = setTimeout(() => {
          // let  this = function's this
          if (confirm("是否删除?")) {
            alert("删除成功");
            resolve();
            this.$store.commit('deleteTodoById', id)
          } else {
            reject();
          }
        }, 1000);
      }).then(() => {
        console.log("finish setTimeout");
        this.$store.commit("SaveDatas");
        this.todos = this.$store.getters[this.$route.meta.getters];
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
/* 整个界面div和背景图片 */
.Completed,
.bgimg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* 返回字体box（header） */
.com-back {
  margin-top: 20px;
}
/* headertext */
.back-txt {
  /* color: white; */
  margin-left: 12px;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
}
/* item-ul box */
.IndexItem {
  /* background-color: blue; */
  width: 100%;
  height: 82%;
  position: fixed;
  /* margin-bottom: 100px; */
  overflow-y: scroll;
}
/* item-ul */
.Item-list {
  width: 100%;
  padding: 4px 0 4px 0;
}
/* li的修饰 */
.list-lis {
  /* width: 600px; */
  /* border: 1px solid black; */
  width: 94%;
  height: 40px;
  border-radius: 3px;
  /* margin-bottom: 10px; */
  background-color: white;
  margin: 10px auto;
  /* line-height: 26px; */
  border-left: 6px solid rgba(0, 128, 0, 0.529);
  box-shadow: 3px 3px 14px -1px rgb(17 18 17 / 29%);
}
li {
  list-style: none;
  position: relative;
  line-height: 45px;
}
/* checkbox的修饰 */
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
/* input文字的修饰 */
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
/* 右边收藏小图片的修饰 */
.impimg {
  display: inline-block;
  /* text-decoration: none; */
  position: absolute;
  width: 16px;
  height: 16px;
  /* border-radius: 10px; */
  right: 14px;
  top: 11px;
  /* background-color: rgba(0, 0, 0, 0.118); */
}
/* 最下方添加节点的box */
.com-footer {
  /* background-color: yellowgreen; */
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 6px;
  left: 0;
}
/* 添加节点的input */
.Addtask {
  display: block;
  width: 92%;
  height: 40px;
  border-radius: 3px;
  margin: auto;
  font-size: 16px;
  border-style: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.5);
  padding-left: 12px;
}
/* 完成状态li */
.complated .list-lis {
  width: 94%;
  height: 40px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.12);
  margin: 10px auto;
  border: none;
}
.complated .lis-txt {
  font-size: 16px;
  margin-left: 20px;
  display: inline-block;
  position: absolute;
  /* top: -2px; */
  top: 12px;
  width: 75%;
  /* 已完成 */
  color: #999;
  background-color: rgba(0, 0, 0, 0);
  text-decoration: line-through;
  font-style: oblique;
  border: none;
  border-style: none;
  /* outline: none; */
}
</style>