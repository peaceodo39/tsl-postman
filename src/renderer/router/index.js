import Vue from 'vue'
import Router from 'vue-router'
import cache from '../logic/cache'
import store from '../store'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/kong',
            name: 'kong',
            component: () => import('@/components/kong')
        },
        {
            path: '/',
            component: () => import('@/components/software'),
            children: [
                {
                    path: 'setting',
                    name: 'setting',
                    component: () => import('@/components/software/setting')
                }, {
                    path: 'about',
                    name: 'about',
                    component: () => import('@/components/software/about')
                }, {
                    path: 'help',
                    name: 'help',
                    component: () => import('@/components/software/help')
                },
                {
                    path: '',
                    name: 'home',
                    as: "index",
                    component: () => import('@/components/index')

                },
            ]
        },
        {
            path: '/open/',
            name: 'open',
            component: () => import('@/components/open'),
            children: [
                {
                    path: '/',
                    name: "open_index",
                    component: () => import('@/components/content/index')
                },
                {
                    path: 'all_api',
                    name: "all_api",
                    component: () => import('@/components/list/all_api')
                },
                {
                    path: 'add_api',
                    name: 'add_api',
                    component: () => import('@/components/content/add_api'),
                    props: (route) => ({
                        dir: route.query.dir
                    })
                },
                {
                    path: 'editenv',
                    name: 'editenv',
                    component: () => import('@/components/content/edit_env'),
                    props: (route) => ({
                        dir: route.query.dir
                    })
                },
                {
                    path: 'add_test',
                    name: 'add_test',
                    component: () => import('@/components/content/add_test'),
                    props: (route) => ({
                        dir: route.query.dir
                    })
                },
                {
                    path: 'fuzhi_api',
                    name: 'fuzhi_api',
                    component: () => import('@/components/content/fuzhi_api'),
                    props: (route) => ({
                        dir: route.query.dir
                    })
                },
                {
                    path: 'add_group',
                    name: 'add_group',
                    component: () => import('@/components/content/add_group'),
                    props: (route) => ({
                        dir: route.query.dir
                    })
                },


                {
                    path: 'api/:apiid',
                    name: 'api',
                    component: () => import('@/components/content/api')
                },
                {
                    path: 'test',
                    name: 'test',
                    component: () => import('@/components/content/test'),
                    props: (route) => ({number: route.query.number})
                },
                {
                    path: 'api_ws/:apiid',
                    name: 'api_ws',
                    component: () => import('@/components/content/api_ws')
                },
                {
                    path: 'edit_api',
                    name: 'edit_api',
                    component: () => import('@/components/content/api/edit'),
                    props: (route) => ({
                        dir: route.query.dir,
                        e_name: route.query.e_name
                    })
                },
                {
                    path: 'edit_group',
                    name: 'edit_group',
                    component: () => import('@/components/content/edit_group'),
                    props: (route) => ({
                        dir: route.query.dir,
                        e_name: route.query.e_name
                    })
                },
                {
                    path: 'group_info',
                    name: 'group_info',
                    component: () => import('@/components/content/group_info'),
                    props: (route) => ({
                        dir: route.query.dir,
                        e_name: route.query.e_name
                    })
                },
            ]
        },
        {
            path: '/create/:index',
            name: 'create',
            component: () => import('@/components/create'),
            props: true
        },

        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.afterEach((to) => {
    // ...
    if (to.fullPath != '/' && to.fullPath != '/open' && to.name != 'create') {
        console.log('to', to)
        cache.set([store.state.now_open, 'now'], to.fullPath)
    }

})
export default router
