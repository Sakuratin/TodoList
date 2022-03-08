<template>
    <div>
        <!-- 将data中的变量名（pageclass传入pageotem中 imageurl和cover都是设置的活背景图，也可以写在data中（data中放置变量） -->
        <PageItem 
        :pageClass="pageClass"
        :image_url="require('@/assets/bg-Completed.jpg')"
        :cover="require('@/assets/bg-Completed.jpg')" 
        :todos="todos"
        :important="false" :completed="true" :remmind="false"
        >
            <!-- <template v-slot:list>
                
            </template> -->
            <!-- 这里template组件不占位置，里面的slot是在pageitem中将footer分割出来，单独在这个页面设置成其它样式 -->
            <template v-slot:footer>
                <div class="copyrightBox">
                    <p class="copyright">任务已经完成咯！好好休息一下吧O(∩_∩)O</p>
                </div>
            </template>
        </PageItem>
    </div>
    <!-- <div class="Completed">
        <img src="@/assets/bg-Completed.jpg" alt="" class="bgimg">
        <div class="com-back">
            <p class="back-txt">《 返回</p>
            <router-link to="../App"></router-link>
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
// 先导入要使用的文件，在接收
import PageItem from './PageItem.vue'

export default {
    name:'Completed',
    // 接收pageitem文件
    components: {PageItem},

    data() {
        return {
            todos:this.$store.getters.getDones,
            // 写一个变量并命名，将这个变量传递给相应的组件中 这段代码是为单独分离设置该页面的style做准备
            pageClass: "complated",
            // 这段写在标签里面也可以
            image_url: require("@/assets/bg-Completed.jpg"),
        }
    },
    mounted() {
        // 页面加载的时候就更新完成界面的todos
        this.todos = this.$store.getters.getDones
    },
   
}
</script>

<style scoped>
/* 这里只有completed界面有这个代码，是footer字代码 */
.copyrightBox {
    /* background-color: pink; */
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 6px;
    left: 0;
    text-align: center;
}
.copyright {
    font-size: 18px;
    padding-left: 12px;
    color: rgba(153, 153, 153, 0.5);
} 
</style>