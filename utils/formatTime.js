export default function formatTime(time, format, repair = true) {
    const second = parseInt(time % 60)
    const minute = parseInt((time / 60) % 60)
    const hour = parseInt((time / (60 * 60)) % 24)
    const day = parseInt(time / (24 * 60 * 60))
    const timeObj = {
        day,
        hour: repair && hour < 10 ? `0${hour}` : hour,
        minute: repair && minute < 10 ? `0${minute}` : minute,
        second: repair && second < 10 ? `0${second}` : second
    }
    if (format == 'default') {
        let result = ''

        if (day > 0) {
            result += `${day}天`
        }
        if (hour > 0) {
            result += `${timeObj.hour}小时`
        }
        if (minute > 0) {
            result += `${timeObj.minute}分`
        }
        if (second > 0) {
            result += `${timeObj.second}秒`
        }
        return result
    }

    if (typeof format === 'string') {
        format = format
            .replace(/dd/g, day)
            .replace(/hh/g, timeObj.hour)
            .replace(/mm/g, timeObj.minute)
            .replace(/ss/g, timeObj.second)

        return format
    }

    if (typeof format === 'function') {
        return format(timeObj)
    }

    return timeObj
}