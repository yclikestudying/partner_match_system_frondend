export const numberToGender = (num) => {
    if (num === 1) {
        return '男'
    }
    if (num === 0) {
        return '女'
    }
    return undefined
}

export const genderToNumber = (gender) => {
    if (gender === '男') {
        return 1
    }
    if (gender === '女') {
        return 0;
    }
    return undefined;
}