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