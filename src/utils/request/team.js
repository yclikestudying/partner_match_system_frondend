import request from "@/request/request.js";
import {showFailToast, showSuccessToast} from "vant";
import useRegisterAndLoginStore from "@/store/registerAndLogin/index.js";
const registerAndLoginStore = useRegisterAndLoginStore()

// 当前登录用户的id
const currentUserId = registerAndLoginStore.userInfo.id

// 添加队伍
export const addTeam = async (formData) => {
    const res = await request.post('/team/add',formData)
    if (res.data.code === 40000) {
        showFailToast(res.data.description)
    } else {
        showSuccessToast(res.data.message)
    }
    return res.data.code
}

// 推荐队伍
export const recommendTeam = async () => {
    const userId = registerAndLoginStore.userInfo.id
    const res = await request.get('/team/recommend', {
        params: {
            userId: userId
        }
    })
    return res.data.data
}

// 已加入队伍
export const myJoin = async () => {
    const userId = registerAndLoginStore.userInfo.id
    const res = await request.get(`/userTeam/myJoin/${userId}`)
    return res.data.data
}

// 已创建队伍
export const myCreate = async () => {
    const userId = registerAndLoginStore.userInfo.id
    const res = await request.get(`/team/myCreate/${userId}`)
    return res.data.data
}

// 加入队伍
export const joinTeamByUser = async (joinTeamInfo) => {
    return await request.post('/userTeam/join', joinTeamInfo)
}

// 搜索框模糊查询队伍
export const selectTeam = async (searchText) => {
    return await request.get('/team/selectTeam', {
        params: {
            searchText: searchText
        }
    })
}

// 退出队伍
export const quitTeam = async (teamId, userId) => {
    return await request.get('/userTeam/quit', {
        params: {
            teamId: teamId,
            userId: userId
        }
    })

}

// 解散队伍
export const disbandTeam = async (teamId, userId) => {
    return await request.get('/team/disbandTeam', {
        params: {
            teamId: teamId,
            userId: userId
        }
    })
}

// 获取队伍成员信息
export const getTeamUserInfo = async (ids) => {
    const res = await request.post('/userTeam/getTeamUserInfo', ids)
    return res.data.data
}

// 在队伍中发送消息
export const sendMessageToTeam = async (fromUserId, teamId, message) => {
    await request.post('/team/sendMessageToTeam', {
        fromUserId: fromUserId,
        teamId: teamId,
        message: message
    })
}

// 获取队伍聊天记录
export const getTeamMessage = async (teamId, ids) => {
    const res = await request.post('/team/getTeamMessage', {
        teamId: teamId,
        ids: ids
    })
    return res.data.data
}

// 获取最后一条队伍聊天记录
export const getTeamLastMessage = async () => {
    const res = await request.get('/team/getTeamLastMessage', {
        params: {
            id: currentUserId
        }
    })
    return res.data.data
}