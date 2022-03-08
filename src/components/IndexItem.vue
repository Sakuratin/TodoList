<template>
  <div class="IndexItem" v-if="!todo.done">
    <v-touch
      @swipeleft="swipeLeft"
      @swiperight="swipeRight"
      :swipe-options="{ direction: 'horizontal' }"
    >
      <div
        class="swiper-test"
        :style="{ paddingRight: swiperLeftValue + 'px' }"
      >
        <ul class="Item-list" v-if="!ShowSearchbox">
          <li class="list-lis">
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
              @keyup.enter="EditTodo(todo.id)"
              
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
        <div v-if="swiperLeftValue != 0" class="remove" @click="deleteTodo(todo.id)">
          <img src="@/assets/delete.png" />
        </div>
        <!-- 不能使用。stop阻止冒泡事件，因为事件要写在里层盒子上才起作用 -->
        <!-- <div class="remove" @click.stop="deleteTodo(todo.id)">
          <img src="@/assets/delete.png" />
        </div> -->
      </div>
    </v-touch>
  </div>
</template>

<script>
export default {
  name: "IndexItem",
  // 接收todo数据
  props: ["todo",'ShowSearchbox'],
  data() {
    return {
      // Showinput:false
      swiperLeftValue: 0,
      // Estr: "",
    };
  },
  methods: {
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
    // 向左向右移动
    swipeLeft() {
      console.log("swiper");
      this.swiperLeftValue = 50;
    },
    swipeRight() {
      this.swiperLeftValue = 0;
    },
    deleteTodo(id) {
      this.$store.state.todos = this.$store.state.todos.filter(
        (todo, index, todos) => {
          console.log(todo, index, todos);
          return todo.id !== id;
        }
      );
      this.$store.commit("SaveDatas");
      this.$emit("updateData");
    },
    // 编辑todo
    EditTodo(id) {
      console.log(id)
      // if (this.$store.getters.getTitleHasExist(this.todoStr)) {
      //   alert("请不要重复输入数据！");
      //   return;
      // }
      for (let i = 0; i < this.$store.state.todos.length; i++) {
        if(this.$store.state.todos[i].id == id) {
          this.$store.state.todos[i].title = this.todo.title
        }
      }
      this.$store.commit('SaveDatas')
    },
  },
};
</script>

<style scoped>
/* 设置删除图标大小 */
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
/* .IndexItem:hover .delete {
    display: block;
} */
</style>