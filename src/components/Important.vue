<template>
    <div>
        <!-- pageitem是一个三个页面都在一起使用的文件 使用时需要先导入，在接收 -->
        <PageItem
         :image_url="require('@/assets/bg-important.jpg')"
         :typeset="typeset"
         :todos="todos"
         />
    </div>
    <!-- <div class="Completed">
        <img src="@/assets/bg-important.jpg" alt="" class="bgimg">
        <div class="com-back">
            <p class="back-txt">《 返回</p>
        </div>
        <div class="IndexItem">
            <ul class="Item-list">
                <li class="list-lis">
                    <input type="checkbox" name="" class="lis-check">
                    <input type="text" class="lis-txt" placeholder="请输入一个计划" v-for="todo in todos" :key="todo.id" v-model="todo.title">
                    <img src="@/assets/重要-未变色.png" alt="" class="impimg">
                </li>
            </ul>
        </div>
        <div class="com-footer">
            <input type="text" class="Addtask" placeholder="新建一个任务">
        </div>
    </div> -->
</template>

<script>

import PageItem from './PageItem.vue'
export default {
    name:'Important',
    components: {PageItem},
    data() {
        return {
            todos: this.$store.getters.getImportants,
            image_unrl: require("@/assets/bg-important.jpg"),
            typeset: {
                important: true,
                completed: false,
                remind: false
            }
        }
    },
    mounted() {
        // 页面加载时就更新标签为重要的数据
        this.todos = this.$store.getters.getImportants
        // console.log(this.$store.getters.getImportants)
    },
    
}
</script>

<style scoped>
/* 这里的代码不起作用，不需要管 */
.bgimg {
    width: 100%;
    height: 100%;
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
    box-shadow:3px 3px 14px -1px rgb(17 18 17 / 29%);
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
input[type=checkbox]{
    -webkit-appearance:none;
    background-color: rgba(0, 0, 0, 0.118);
}
input:checked::before{
    /* line-height: 26px; */
    -webkit-appearance:none;
    border-radius: 6px;
    content: '√';
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
.impimg {
    display: inline-block;
    /* text-decoration: none; */
    position: absolute;
    width: 16px;
    height: 16px;
    /* border-radius: 10px; */
    right: 12px;
    top: 11px;
    /* background-color: rgba(0, 0, 0, 0.118); */

}
</style>