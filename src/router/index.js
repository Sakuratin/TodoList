//引入VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入所有需要切换界面的组件
import Index from '../components/Index'
import Login from '../components/Login'
import Completed from '../components/Completed'
import Important from '../components/Important'
import Remind from '../components/Remind'
import OtherClassify from '../components/OtherClassify'

Vue.use(VueRouter)
//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
    routes: [
        {
            // 表示在path所设置的路径下，访问的是index界面
            path: '/',
            component: Index
        },
        {
            path: '/index',
            component: Index
        },
        
        {
            path: '/login',
            component: Login,
            // 取name是为了防止后面文件路径改名而发生报错，会自动匹配相应的含有name中名字的文件
            name: "login"
        },
        {
            path:'/Completed',
            name:'Completed',
            component:Completed,
            meta: {
                prop: 'done',
                getters: 'getDones'
            }
        },
        {
            path:'/Important',
            name:'Important',
            component:Important,
            meta: {
                prop: 'important',
                getters: 'getImportants'
            }
        },
        {
            path:'/Remind',
            name:'Remind',
            component:Remind,
            meta: {
                prop: 'remind',
                getters: 'getReminds'
            }
        },
        {
            path:'/OtherClassify/:ClassData',
            name:'OtherClassify',
            component:OtherClassify
        }
    ],
    mode: "history"
})
//暴露router
export default router