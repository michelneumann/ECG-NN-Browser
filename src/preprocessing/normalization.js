import nj from 'numjs';

// Normalizes input data to zero mean and standard derivation of one
export function zScore(data) {
    const dat = nj.array(data);
    const mean = nj.mean(dat);
    const std = nj.std(dat);

    const sub =  dat.subtract(mean);
    const div = sub.divide(std)
    
    return div.tolist();
}

export function minMaxScaling(data) {
    const dat = nj.array(data);
    const min = nj.min(data);
    const max = nj.max(data);

    const sub = dat.subtract(min);
    const div = sub.divide(max.subtract(min));

    return div.tolist();
}
