'use strict';

import { CSVReader } from './readers/CSVReader';
import { subsample } from './preprocessing/subsample';
import { zScore } from './preprocessing/normalization';
import { SignalFilter } from './preprocessing/filters';
import { plotECGCurve } from './visualization/plot';
import { locatePeaks } from './detection/peaks';
import { sliceBeats } from './detection/beats';
import { resolveKerasJS, resolveWebDNN } from './utils/mapping';
import * as Models from './models/index';
import * as WebDNN from 'webdnn';
import nj from 'numjs';

(async() => {
    const reader = new CSVReader('ventricular.csv');
    const filter = new SignalFilter();
    const sampleRate = 500 * 3;
    const tsampleRate = 360 * 3;
    const model = new Models.KerasJSModel('dense_ecg_net.bin');
    //const model = new Models.WebDNNModel('dense_ecg_net');

    // Init KerasJS model
    await model.init();
    await reader.init();

    // Start time measureing
    const start = Date.now();

    while(reader.canRead(sampleRate)) {
        const dat = reader.read(15000);
        const sub = subsample(dat, sampleRate, tsampleRate);

        // Apply signal filters to remove noise
        //const low = filter.lowpass(sub);
        //const hi = filter.highpass(sub);

        // Apply basline wander removal after Bsoul et al
        const med1 = filter.median(sub, 71);
        const med2 = filter.median(med1, 213);
        const sig1 = nj.array(sub);
        const sig2 = nj.array(med2);
        const baseline = sig1.subtract(sig2).tolist();

        // Apply zScore normalization
        const norm = zScore(baseline);

        const peaks = locatePeaks(norm);
        const slices = sliceBeats(norm, peaks);

        for(const slice of slices) {
            const response = await model.predict(slice);
            const beatClass = resolveKerasJS(response.dense);
            console.warn('Prediction result: %o', beatClass);
        }
    }

    // Print calculation speed
    console.warn('Processing time: %d ms', Date.now() - start);
})();