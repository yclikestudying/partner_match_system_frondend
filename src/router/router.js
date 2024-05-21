import { createRouter, createWebHistory } from "vue-router";
import {showNotify} from "vant";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
import {start, end} from '@/utils/nprogress/index'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/registerAndLogin',
            name: 'register',
            component: () => import('@/views/Register.vue')
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/views/main.vue'),
            children: [
                {
                    path: '/main/index',
                    name: 'index',
                    component: () => import('@/components/main/Index.vue')
                },
                {
                    path: '/main/team',
                    name: 'team',
                    component: () => import('@/components/main/Team.vue')
                },
                {
                    path: '/main/friend',
                    name: 'friend',
                    component: () => import('@/components/main/Friend.vue')
                },
                {
                    path: '/main/user',
                    name: 'user',
                    component: () => import('@/components/main/User.vue')
                },
                {
                    path: '/main/info',
                    name: 'info',
                    component: () => import('@/components/user/Info.vue')
                },
                {
                    path: '/main/message',
                    name: 'chat',
                    component: () => import('@/components/main/Message.vue')
                },
                {
                    path: '/main/editBasicInfo',
                    name: 'editBasicInfo',
                    component: () => import('@/components/user/EditBasicInfo.vue')
                },
                {
                    path: '/main/editTags',
                    name: '/editTags',
                    component: () => import('@/components/user/EditTags.vue')
                },
                {
                    path: '/main/addTeam',
                    name: '/addTeam',
                    component: () => import('@/components/team/AddTeam.vue')
                },
                {
                    path: '/main/joinedTeam',
                    name: '/joinedTeam',
                    component: () => import('@/components/team/JoinedTeam.vue')
                },
                {
                    path: '/main/createdTeam',
                    name: '/createdTeam',
                    component: () => import('@/components/team/CreatedTeam.vue')
                },
                {
                    path: '/main/showUserInfo',
                    name: 'showUserInfo',
                    component: () => import('@/components/index/ShowUserInfo.vue')
                },
                {
                    path: '/main/search',
                    name: 'search',
                    component: () => import('@/components/index/Search.vue'),
                },
                {
                    path: '/main/searchUserByTags',
                    name: 'searchUserByTags',
                    component: () => import('@/components/index/SearchUserByTags.vue')
                },
                {
                    path: '/main/teamInfo',
                    name: 'teamInfo',
                    component: () => import('@/components/team/TeamInfo.vue')
                },
            ]
        },
        {
            path: '/editImg',
            name: 'editImg',
            component: () => import('@/components/edit/EditImg.vue')
        },
        {
            path: '/userChat',
            name: 'userChat',
            component: () => import('@/components/user/UserChat.vue')
        },
        {
            path: '/teamChat',
            name: 'teamChat',
            component: () => import('@/components/team/TeamChat.vue')
        },
        {
            path: '/:pathMatch(.*)',
            component: () => import('@/components/notFound/NotFound.vue')
        }
    ]
})

/*导航守卫*/
router.beforeEach((to, from) => {
    // 开启进度条
    start()
    const registerAndLoginStore = useRegisterAndLoginStore()
    const token = registerAndLoginStore.token
    if (token === null) {
        if (to.path === '/login' || to.path === '/registerAndLogin') {
            return true
        } else {
            showNotify({
                type: 'danger',
                message: '你还未登录，请先登录!'
            })
            router.push('/login')
        }
    }
    return true
})
router.afterEach(() => {
    // 结束进度条
    end()
})

export default router