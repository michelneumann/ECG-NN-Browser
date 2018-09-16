export function subsample(data, from, to) {
    let step = from / to;
    let result = [];

    for(let i = 0; i < data.length; i += step) {
        result.push(data[Math.round(i)]);
    }

    return result;
}