<template>
<!-- 这里是点击主页下方加号添加的li标签 -->
    <div class="paddingbottom">
        <!-- v-if确认显示与否 -->
        <li class="list-lis" v-if="SendShowAddInput">
            <input type="checkbox" name="" class="lis-check">
            <!-- <p class="lis-txt">1234567</p> -->
            <!-- <input type="text" class="lis-txt" placeholder="请输入一个计划" autofocus v-if="Showinput"> -->
            <!-- 当回车键按上时，执行saveItem -->
            <input type="text" class="lis-txt" placeholder="请输入一个计划"
            @keyup.enter='saveItem'
            v-model="todoStr">
        </li>
        <!-- 渲染，遍历todos -->
        <IndexItem v-for="todo in todos" :key="todo.id" :todo='todo' 
        @SetImportant='SetImportant'
        @unSetImportant='unSetImportant'
        @ChangeDone='ChangeDone'
        @updateData='updateData'
        :ShowSearchbox='ShowSearchbox'
        />
        
    </div>
</template>

<script>
import IndexItem from './IndexItem.vue'
// nanoid是一个库，使用npm i nanoid安装，会随机生成一串数据作为数据的id，避免重复
import {nanoid} from 'nanoid'
export default {
    name:'IndexList',
    components:{IndexItem},
    // 接收是否显示li的变量
    props:['SendShowAddInput','ShowSearchbox'],
    data() {
        return {
            // 接收todos数据
            todos: this.$store.state.todos,
            // 输入的内容
            // 双向绑定，先定义文字为空
            todoStr: ""
        }  
    },
    methods:{
        saveItem(){
            console.log(this.todoStr)
            // 判断是否已经包含该数据，如果有，则后面的代码都不执行
            if(this.$store.getters.getTitleHasExist(this.todoStr)) {
                alert("请不要重复输入数据！")
                return
            }

            // 判断在按下回车键时内容是否为空，不为空添加数据
            if (this.todoStr != '') {
                // 加入数据时，数组数据怎么书写，这里就怎么书写
                this.todos.unshift({id:nanoid(),title:this.todoStr,done:false,important:false,remind:false})
                this.todoStr = ''
            }
            // 添加完成后，引入ChangeShowAddInput方法，改变他需要显示的Boolean值（就是设置隐藏添加的li）
            this.$emit('ChangeShowAddInput')
            this.$store.commit('SaveDatas')
        },
        updateData() {
            console.log("updateData")
            this.todos = this.$store.state.todos
        },
        
        SetImportant(value) {
            this.$store.commit('ChangeImportantState',value)
            this.$store.commit('SaveDatas')
        },
        unSetImportant(value) {
            this.$store.commit('ChangeImportantState',value)
            this.$store.commit('SaveDatas')
        },
        // 添加一个设置改变done的双向绑定函数，数据在哪里函数就写在哪里,判断如果遍历的id等于我传进来（点击的id）则设置相应改变
        ChangeDone(id) {
            this.$store.commit('ChangeDoneState',id)
            this.$store.commit('SaveDatas')
        },
    }
}
</script>

<style scoped>
.paddingbottom {
    padding-bottom: 60px;
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
img {
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