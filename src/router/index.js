import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)
// import Home from  '@/views/Home'
import About from  '@/views/About'
import questionnaire from "../views/questionnaire";
import Index from '../views/Index'
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import Design from "../views/Design";
import Thanks from "../views/Thanks";
import Analysis from "../views/Analysis";
const router =  new VueRouter({
    routes:[
        {
            path:"/",
            component:Index,
            meta: {
                title:'问卷首页'
            }
        }, {
            path:"/index",
            component:Index,
            meta: {
                title:'问卷首页'
            }
        }, {
            path: '/about',
            component:About,
            meta: {
                title:'about页面'
            }
        }, {
            path: '/login',
            component: Login,
            meta: {
                title:'登录页面'
            }

        }, {
            path: '/home',
            component: Home,
            meta: {
                title:'问卷大厅'
            }
        }, {
            path: '/register',
            component: Register,
            meta: {
                title:'注册页面'
            }
        }, {
            path: '/questionnaire/:id',
            name:'questionnaire',
            component: questionnaire,
            meta: {
                title:'问卷页面'
            }
        }, {
            path: '/design/:id',
            name:'design',
            component: Design,
            meta: {
                title:'设计问卷'
            }
        }, {
            path: '/thanks',
            name:'thanks',
            component: Thanks,
            meta: {
                title:'感谢页面'
            }
        }, {
            path: '/analysis/:id',
            name:'analysis',
            component: Analysis,
            meta: {
                title:'数据分析'
            }
        }

    ]
})
export default router