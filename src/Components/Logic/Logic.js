
    export function disable(value){
        if(value === true){
            value = !value
        }
        else if(value === false){
            value = !value
        }
        else if(value === 15){
            value = NaN
        }
        else {
            value = undefined
        }
        return value
    }
    
    // showSave: (value) => {
    //     if(value === true){
    //         value = !value
    //     }
    //     else if(value === false){
    //         value = !value
    //     }
    //     return value
    // }