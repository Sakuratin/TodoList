<template>
    <div class="IndexFooter">
        <img class="leftimg" src="@/assets/search.png" alt=""
        @click="searchShow"
        >
        <img class="middleimg" src="@/assets/AddTask.png" alt="" 
        @click="AddTaskShow">
        <img class="rightimg" src="@/assets/AddClassify.png" alt=""
        @click="AddClassify"
        >
    </div>
</template>

<script>
// import IndexItemVue from './IndexItem.vue'
export default {
    name:'IndexFooter',
    // 接收到由父组件index传递过来的改变显示隐藏状态的变量
    props:[],
    data() {
        return {
            
        }
    },
    methods: {
        AddTaskShow() {
            // 改变显示input与否的状态
            // this.AddTask.unshift(<IndexItem/>)
            // console.log(this.SendShowAddInput)
            this.$emit('ChangeShowAddInput')
        },
        // 查找任务
        searchShow() {
            this.$emit('ChangeShowSearchbox')
        },
        // 添加分类
        AddClassify() {
            // var Nameclass = JSON.stringify(prompt('请输入要添加的分类名：'))
            // var Nameclass = prompt('请输入要添加的分类名：')
            // if (Nameclass.length > 7) {
            //     alert('字符长度不能超过七个！')
            // }else if (Nameclass == '') {
            //     alert('输入不能为空字符！')
            // }
            this.$emit('ChangeShowAddClassify')
        }
    },
}
</script>

<style scoped>
.IndexFooter {
    left: 0;
    position: fixed;
    background-color: white;
    bottom: 0px;
    width: 100%;
    /* background-color: violet; */
    height: 60px;
    border-top: 0.5px solid #999;
}
.leftimg {
    width: 40px;
    height: 40px;
    float: left;
    margin-left: 40px;
    margin-top: 6px;
}
.rightimg {
    /* display: inline-block; */
    width: 30px;
    height: 30px;
    margin-right: 40px;
    float: right;
    margin-top: 10px;
}
.middleimg {
    position: absolute;
    width: 60px;
    height: 60px;
    left: 50%;
    transform: translate(-50%, -20px);
}
</style>