function formatComponent(component) {
    return component < 10 ? '0' + component : component;
}

// 获取完整的年月日时分秒
export const timestampToTime = (timestamp) => {
    const date = new Date(timestamp);
    // 获取当前日期的年月日等基本组成部分
    const year = date.getFullYear();
    const month = formatComponent(date.getMonth() + 1); // getMonth() 返回的月份是从开始的
    const day = formatComponent(date.getDate() - 1);
    // 由于北京时间比UTC时间快8小时，这里我们需要将小时数减去8
    const hour = formatComponent(date.getUTCHours());
    const minute = formatComponent(date.getUTCMinutes());
    // 返回格式化的日期时间字符串
    return `${year}-${month}-${day} ${hour}:${minute}`;
};

// 获取时分
export const getHourAndMinutes = (timestamp) => {
    const date = new Date(timestamp);
    const hour = formatComponent(date.getUTCHours());
    const minute = formatComponent(date.getUTCMinutes());
    // 返回格式化的日期时间字符串
    return `${hour}:${minute}`;
}
