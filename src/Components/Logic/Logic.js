export function disable(value) {
    if (value === true) {
        value = !value
    }
    else if (value === false) {
        value = !value
    }
    else if (value === 15) {
        value = NaN
    }
    else {
        value = undefined
    }
    return value
}

export function getDuration(value){
    let strDuration = ``
    let minutes = 0
    let seconds = 0
    if(value){
        seconds = ('0' + (value % 60)).slice(-2)
        minutes = Math.floor(value / 60)
        strDuration = `${minutes}:${seconds}`
    }
    return strDuration
}
