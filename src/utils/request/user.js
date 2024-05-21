import request from '@/request/request'
import {showFailToast, showSuccessToast} from "vant";
import router from "@/router/router.js";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";

//用户登录
export const userLogin = async (userAccount, userPassword) => {
    return await request.post('/user/login', {
        userAccount: userAccount,
        userPassword: userPassword,
    })
}
//用户注册
export const userRegister = async (userAccount, userPassword, checkPassword) => {
    return await request.post('/user/register', {
        userAccount: userAccount,
        userPassword: userPassword,
        checkPassword: checkPassword
    })
}
// 账号输入完获取该账号的头像
export const getAvatarUrl = async (userAccount) => {
    return await request.get('user/getAvatarUrl', {
        params: {
            userAccount: userAccount
        }
    })
}
//查询当前用户信息
export const getUserInfo = async (id) => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const res = await request.get(`/user/selectById/${id}`)
    registerAndLoginStore.userInfo = res.data.data
    return res.data
}
//用户修改头像
export const updateImg = async (file, id) => {
    let formData = new FormData()
    formData.append('multipartFile', file)
    const res = await request.post(`/user/updateImg/${id}`, formData)
    return res.data.data
}
//修改用户基本信息
export const updateBasicInfo = async (origin, value) => {
    if (value === '男') {
        value = 1
    }
    if (value === '女') {
        value = 0
    }
    const registerAndLoginStore = useRegisterAndLoginStore()
    const userId = registerAndLoginStore.userInfo.id
    const data = await request.post('/user/updateById', {
        id: userId,
        [origin]: value
    })
    if (data.data.code === -1) {
        showFailToast(data.data.description)
        return
    }

    const res = await getUserInfo(userId)
    if (res.code === 1) {
        showSuccessToast('修改成功')
        await router.push('/main/info')
    } else {
        showFailToast('修改失败')
    }
}
//用户提交修改的标签
export const updateTags = async (tags) => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const userId = registerAndLoginStore.userInfo.id
    await request.post('/user/updateTags', {
        id: userId,
        tags: tags
    })
    const res = await getUserInfo(userId)
    if (res.code === 1) {
        showSuccessToast('修改成功')
    } else {
        showFailToast('修改失败')
    }
}

//按标签搜索用户(模糊查询)
export const selectByTags = async (tags, id) => {
    return await request.post(`/user/selectByTags/${id}`, tags)
}
//获取推荐用户
export const recommend = async (tags, id) => {
    const res = await request.post(`/user/recommend/${id}`, tags)
    return res.data.data
}
//展示推荐用户详细信息
export const showUserInfo = async (id) => {
    const res = await request.get(`/user/selectById/${id}`)
    return res.data.data
}

// 添加好友
export const addFriend = async (fromUserId, toUserId) => {
    const res = await request.post('/user/addFriend', {
        fromUserId: fromUserId,
        toUserId: toUserId
    })
    if (res.data.code === 40000) {
        showFailToast(res.data.description)
    } else {
        showSuccessToast('好友请求已发送')
    }
}

// 获得好友申请
export const getFriendApplication = async () => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const id = registerAndLoginStore.userInfo.id
    const res = await request.get('/user/getFriendApplication', {
        params: {
            toUserId: id
        }
    })
    return res.data.data
}

// 回复好友请求
export const replyApplication = async (num, fromUserId) => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const id = registerAndLoginStore.userInfo.id
    await request.get('/user/replyApplication', {
        params: {
            num: num,
            fromUserId: fromUserId,
            toUserId: id
        }
    })
}

// 获取好友列表
export const getFriendList = async () => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const id = registerAndLoginStore.userInfo.id
    const res = await request.get('/user/getFriendList', {
        params: {
            toUserId: id
        }
    })
    return res.data.data
}

// 退出登录
export const userLogout = async () => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const id = registerAndLoginStore.userInfo.id
    await request.get('/user/logout', {
        params: {
            currentUserId: id
        }
    })
}

// 给好友发送消息
export const sendMessageToUser = async (toUserId, message) => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const fromUserId = registerAndLoginStore.userInfo.id
    await request.post('/user/sendMessageToUser', {
        fromUserId: fromUserId,
        toUserId: toUserId,
        message: message
    })
}

// 获取与好友的聊天记录
export const getUserMessage = async (toUserId) => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const fromUserId = registerAndLoginStore.userInfo.id
    const res = await request.post('/user/getUserMessage', {
        fromUserId: fromUserId,
        toUserId: toUserId
    })
    return res.data.data
}

// 获取与所有好友的最后一条聊天记录
export const getUserLastMessage = async () => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const currentUserId = registerAndLoginStore.userInfo.id
    return await request.get('/user/getUserLastMessage', {
        params: {
            currentUserId: currentUserId
        }
    })
}

// 删除好友
export const deleteUserByUserId = async (userId) => {
    const registerAndLoginStore = useRegisterAndLoginStore()
    const currentUserId = registerAndLoginStore.userInfo.id
    await request.get('/user/deleteUser', {
        params: {
            currentUserId: currentUserId,
            userId: userId
        }
    })
}