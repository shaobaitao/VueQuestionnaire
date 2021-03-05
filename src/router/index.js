import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)
// import Home from  '@/views/Home'

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: "/",
            component: resolve => require(['@/views/Index'], resolve),
            meta: {
                title: '问卷首页'
            }
        }, {
            path: "/index",
            component: resolve => require(['@/views/Index'], resolve),
            meta: {
                title: '问卷首页'
            }
        }, {
            path: '/about',
            component: resolve => require(['@/views/About'], resolve),
            meta: {
                title: 'about页面'
            }
        }, {
            path: '/login',
            component: resolve => require(['@/views/Login'], resolve),
            meta: {
                title: '登录页面'
            }

        }, {
            path: '/home',
            component: resolve => require(['@/views/Home'], resolve),
            meta: {
                title: '问卷大厅'
            }
        }, {
            path: '/register',
            component: resolve => require(['@/views/Register'], resolve),
            meta: {
                title: '注册页面'
            }
        }, {
            path: '/questionnaire/:id',
            name: 'questionnaire',
            component: resolve => require(['@/views/questionnaire'], resolve),
            meta: {
                title: '问卷页面'
            }
        }, {
            path: '/design/:id',
            name: 'design',
            component: resolve => require(['@/views/Design'], resolve),
            meta: {
                title: '设计问卷'
            }
        }, {
            path: '/thanks',
            name: 'thanks',
            component: resolve => require(['@/views/Thanks'], resolve),
            meta: {
                title: '感谢页面'
            }
        }, {
            path: '/analysis/:id',
            name: 'analysis',
            component: resolve => require(['@/views/Analysis'], resolve),
            meta: {
                title: '数据分析'
            }
        }, {
            path: '/routeTest/:id',
            name: 'analysis',
            component: resolve => require(['@/components/routeTest'], resolve),
            props: true
        }


    ]
})
export default router