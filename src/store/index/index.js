import {defineStore} from "pinia";

const useIndexStore = defineStore('index', {
    state: () => ({
        // 默认主页显示高亮
        tabBar: 'index',
        // 选项卡的定位保存
        tab: '推荐用户'
    }),
    actions: {
        rememberTabBar(active) {
            this.tabBar = active
        },
        rememberTab(tab) {
            this.tab = tab
        }
    }
})

export default useIndexStore