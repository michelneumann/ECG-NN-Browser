import nj from 'numjs';

// Locates local R-peaks in the signal based on thresholding
export function locatePeaks(data) {
    const copy = data.slice();
    // The thresholding metric to use, here std
    const thres = 1.5 * nj.std(copy);
    const clusters = [];
    // Flag indicating a new cluster containing a possible peak
    let cluster = false;

    for(let i = 0; i < copy.length; i++) {
        if(copy[i] >= thres) {
            if(!cluster) {
                cluster = true;
                clusters.push([]);
            }

            clusters[clusters.length - 1].push(i);
        }

        if(copy[i] < thres && cluster) {
            cluster = false;
        }
    }

    return zipValues(copy, clusters);
}

// Locates the maximum in a cluster of peaks over a threshold
function zipValues(data, clusters) {
    const result = [];

    for(const cluster of clusters) {
        let maximum = -Infinity;

        for(let i = 0; i < cluster.length; i++) {
            if(data[cluster[i]] > maximum) maximum = cluster[i];
        }

        result.push(maximum);
    }

    return result;
}