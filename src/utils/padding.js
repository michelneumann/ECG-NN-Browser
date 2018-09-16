// Uses "same" padding to expand an array to a specific length
export function pad(data, width, location = 'both') {
    let missing = width - data.length;
    let right = 0, left = 0;
   
    // Calulate missing values depending on pad location
    if(location == 'both') {
        left = right = missing >> 1;
        if(missing & 0x1 == 1) right += 1;
        if(missing < 0) return removeValues(data, left, right);
    } else if(location == 'left') {
        left = missing;
    } else if(location == 'right') {
        right = missing;
    }
    
    // Pad values for left and right
    for(let i = 0; i < right; i++) data.push(0.0);
    for(let j = 0; j < left; j++) data.unshift(0.0);

    return data;
}

function removeValues(data, left, right) {
    return data.slice(-left, data.length + right);
}