import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner: false});

// 开启进度条
export const start = () => {
    NProgress.start()
}

// 结束进度条
export const end = () => {
    NProgress.done()
}