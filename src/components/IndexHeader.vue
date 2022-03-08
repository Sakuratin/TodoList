<template>
    <!-- 头部（含背景图） -->
    <div class="header">
        <!-- 头部用户头像界面 -->
        <div class="header-user">
            <!-- 用户头像左侧文字介绍内容 -->
            <div class="text user-text">
                <p class="txt-big">Hello!欢迎使用</p>
                <p class="txt-middle">你还有 {{ total() }} 个任务待完成</p>
            </div>
            <!-- 用户头像右侧头像内容 -->
            <!-- <div class="user-img">
                <img src="../assets/用户.png" alt="" class="userimg">
            </div> -->
        </div>
        <!-- 头部下方提醒注意事项部分 -->
        <div class="header-remind">
            <div class="text remind-text">
                <p class="txt-big">今日提醒事项</p>
                <p class="txt-middle">8：00PM</p>
                <p class="txt-middle">晨会</p>
            </div>
            <div class="remind-img">
                <img src="../assets/铃铛.png" alt="" class="remindimg">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'IndexHeader',

    data() {
        return {
            // todos:this.$store.state.todos
        }
    },
    methods: {
        total() {
            // this.$store.commit('DoneTodoTotal',done)
            return this.$store.getters.getDoneTodoTotal
        }
    },
}
</script>

<style scoped>
/* 头部区域整体背景样式 */
.header {
    margin-top: 0;
    width: 100%;
    height: 166px;
    /* background-color: rgba(87, 87, 253, 0.267); */
    background-image: url("../assets/背景图-无覆盖.webp");
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
}
/* 头部区域第一排用户样式 */
.header-user {
    text-align: center;
    width: 100%;
    /* border: 1px solid red; */
    height: 60px;
    margin-top: 16px;
}
.text {
    float: left;
    text-align: left;
    color: white;
    margin-top: 6px;
    /* margin: auto; */
    width: 55%;
    /* background-color: wheat; */
    /* display: inline-block; */
    margin-left: 8px;
    /* margin-bottom: 4px; */
}
/* .user-text {
    
}
.remind-text {
    margin-left: 8px;
} */
.txt-big {
    font-size: 20px;
    /* color: rgba(0, 0, 0, 0.4); */
}
.txt-middle {
    font-size: 16px;
    /* color: rgba(0, 0, 0, 0.4); */
    /* color: rgba(255, 99, 71, 0.5); */
    color: red;
}
.user-img {
    float: right;
    /* background-color: wheat; */
    /* display: inline-block; */
    text-align: center;
    margin-right: 12px;
    width: 30px;
    height: 30px;
    margin-top: 8px;
    border-radius: 50px;
}
.userimg {
    width: 30px;
    height: 30px;
}
/* 头部下方注意提醒事项样式 */
.header-remind {
    margin: auto;
    background-color: rgba(255, 255, 255, 0.493);
    width: 90%;
    height: 74px;
    border-radius: 5px;
    margin-top: 6px;

}
.remind-img {
    float: right;
    width: 60px;
    height: 60px;
    /* background-color: tomato; */
    margin-right: 24px;
    margin-top: 7px;
}
.remindimg {
    width: 60px;
    height: 60px;
}
</style>