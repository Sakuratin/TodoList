//引入Vue核心库
import Vue from 'vue'
//引vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
//准备actions对象—响应组件中用户的动作
const actions = {}
//准备mutations对家-修改state中的数据
// const mutations = {}
//准备state对象—保存具体的数据
// const state = {}
//创建并暴露store
export default new Vuex.Store({
    actions,
    state: {
        // 存放数据
        todos: JSON.parse(localStorage.getItem('todos')) || [],
        // [
        //     {id:'001',title:'这是要做的第一个项目',done:false,important:false,remind:false},
        //     {id:'002',title:'这是要做的第二个项目',done:true,important:true,remind:false},
        //     {id:'003',title:'这是要做的第三个项目',done:false,important:false,remind:true},
        //     {id:'004',title:'这是要做的第四个项目',done:false,important:false,remind:true, classifyname: 'NewClassify'},
        // ],
        classifies: JSON.parse(localStorage.getItem('classifies')) || []
    },
    // 修改数据
    mutations: {
        // 改变重要的状态，传入todos数据，id以及重要状态
        ChangeImportantState(state, id) {
            for (let i = 0; i < state.todos.length; i++) {
                // 遍历数组，如果点击（传出去的点击事件）的id号与遍历的id号相匹配，则改变important传入的值（true，false）
                if(state.todos[i].id == id)
                    state.todos[i].important = !state.todos[i].important
            }
        },
        // 改变完成状态，只传入两个参数，将done状态取反
        ChangeDoneState(state,id) {
            for (let i = 0; i < state.todos.length; i++) {
               
                if(state.todos[i].id == id) {
                    state.todos[i].done = !state.todos[i].done
                
                }
            }
        },
        // 使用lacalstorage存储数据（原本用watchs监视）
        SaveDatas(state) {
            console.log("saveDatas")
            localStorage.setItem('todos',JSON.stringify(state.todos))
            console.log("classi", state.classifies)
            localStorage.setItem('classifies',JSON.stringify(state.classifies))
        },
        SaveDatasWithValue(state, value) {
            console.log("saveDatas With Values")
            state.todos.unshift(value)
            localStorage.setItem('todos',JSON.stringify(state.todos))
            // localStorage.setItem('classifies',JSON.stringify(value))
        },
        deleteTodoById(state, id) {
            for(let i = 0;i<state.todos.length;i++) {
                if(state.todos[i].id == id) {
                    state.todos.splice(i,1)
                }
            }
        }
    },
    // 获取数据
    getters: {
        // state是传入的todos
        getImportants(state) {
            // 先准备一个空数组
            var ImportantGroup=[];
            for(let i = 0; i < state.todos.length;i++){
                // 如果遍历的数据有状态为重要的数据，则将数据加入空数组
                if(state.todos[i].important == true && state.todos[i].done != true) {
                    ImportantGroup.push(state.todos[i])
                }
            }
            // 返回数据，一定要返回
            return ImportantGroup
        },
        getReminds(state) {
            var RemindsGroup = [];
            for (let i = 0; i < state.todos.length; i++) {
                if(state.todos[i].remind == true && state.todos[i].done != true) {
                    RemindsGroup.push(state.todos[i])
                }
            }
            return RemindsGroup
        },
        getDones(state) {
            var DonesGroup = [];
            for (let i = 0; i < state.todos.length; i++) {
                if(state.todos[i].done == true) {
                    DonesGroup.push(state.todos[i])
                }
            }
            return DonesGroup
        },
        getDoneTodoTotal(state) {
            let n = 0;
            // 循环的条件每次都是最后符合条件的n覆盖前面的n？（n始终为1）
            for (let i = 0; i < state.todos.length; i++) {
                if (!state.todos[i].done) {
                    n++;
                }
            }
            console.log(n);
            return n
        },
        getClassifyTodos(state) {
            return function(classifyname) {
                let classifies = []

                for (let i = 0; i < state.todos.length; i++) {
                    if (state.todos[i].classifyname == classifyname) {
                        console.log("ok")
                        classifies.push(
                            state.todos[i]
                        )
                    }
                }
                return classifies
            }
        },
        // 判断是否存在这个任务
        getTitleHasExist(state) {
            return function(value) {
                for(let i = 0;i < state.todos.length;i++) {
                    if(state.todos[i].title == value){
                        // alert()
                        return true
                    }
                }
                return false
            }
        },
        // this.$store.getters.getTitleHasExist(value)
        // 搜索

        getSearchTodo(state) {
            return function(value) {
                var searchData=[];
                for(let i = 0; i < state.todos.length;i++){
                    // 如果遍历的数据有状态为重要的数据，则将数据加入空数组
                    if(state.todos[i].title.indexOf(value) != -1 && state.todos[i].done != true) {
                        searchData.push(state.todos[i])
                    }
                }
                return searchData
            }
        }
        // 报错
        // getSearchTodo(state) {
        //     return function(value) {
        //         var searchData=[];
        //         searchData = state.todos.filter((todo)=>{
        //             return todo.title.indexOf(value) !== -1
        //         })
        //     }
        // }
    }
})