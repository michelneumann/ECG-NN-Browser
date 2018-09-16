import { pad } from '../utils/padding';

export function sliceBeats(data, peaks) {
    const indices = calculateSliceIndices(data, peaks);
    const slices = [];

    for(let i = 0; i < indices.length; i++) {
        const padded = pad(data.slice(indices[i][0], indices[i][1]), 360);
        slices.push(padded);
    }

    return slices;
}

function calculateSliceIndices(data, peaks) {
    let results = [];
    let cursor = 0;
    let cr1, cr2;

    while(cursor < peaks.length) {
        // Create a "cardiac cycle" between two R-R peaks, choose next neighbors if not exist
        if(cursor == 0) {
            cr1 = (peaks[cursor] - ((peaks[cursor + 2] - peaks[cursor + 1]) >> 1))
            cr2 = (peaks[cursor] + peaks[cursor + 1]) >> 1
        } else if(cursor == peaks.length - 1) {
            cr1 = (peaks[cursor] - ((peaks[cursor] - peaks[cursor - 1]) >> 1))
            cr2 = (peaks[cursor] + ((peaks[cursor - 1] - peaks[cursor - 2]) >> 1))
        } else {
            cr1 = (peaks[cursor] - ((peaks[cursor] - peaks[cursor - 1]) >> 1))
            cr2 = (peaks[cursor] + peaks[cursor + 1]) >> 1
        }

        // Prevent out of bounds
        if(cr1 < 0) cr1 = 0
        if(cr2 >= data.length) cr2 = data.length - 1

        // Push slice indices as tuple
        results.push([cr1, cr2]);
        cursor += 1;
    }

    return results;
}