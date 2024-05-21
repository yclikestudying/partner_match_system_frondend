export const getStatus = (status) => {
    if (status === 1) {
        return "公开"
    }
    if (status === 2) {
        return "加密"
    }
}