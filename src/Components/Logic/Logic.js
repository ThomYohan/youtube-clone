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

export function videoDisplay(video){
    let user = ''
    if(video === undefined){
        user = ''
    } else if(video.channel_name){
        user = video.channel_name
    } else if(!video.first_name){
        user = 'Unkown'
    }
    else {
        user = `${video.first_name} ${video.last_name}`
    }
    return user
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

export function inputCheck(value) {
    if(value === '') {
        return ''
    } else if (typeof(value) === 'string') {
        return value
    } else if (value === undefined) {
        return undefined
    } else if (value === null) {
        return null
    }        
}


